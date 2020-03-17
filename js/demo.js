//new Date() 20 46 15
//时间与每一列的结构一一对应   当前时间居中显示
//数字的显示  由opacity决定   通过设置class


function Index(dom,use24Hours){
	this.column = Array.from(dom);
	this.use24Hours = use24Hours;
	this.classList = ['visible','close','far','far','distance','distance']
	this.creatDom();
	this.start();
}
Index.prototype.start = function(){
	var self = this;
	setInterval(function(){
		var c = self.getClock();
		console.log(c);
		self.column.forEach(function(ele,index){
			var n = +c[index];
			var offset = n *86;
			$(ele).css({
				'transform':'translateY(calc(50vh - '+ offset +'px - 43px))'
			});
			Array.from(ele.children).forEach(function(ele2,index2){
				var className = self.getClass(n,index2);
				$(ele2).attr('class',className);
			})
		})
	},500);
};

Index.prototype.getClass = function(n,i){
	var className = this.classList.find(function(ele,index){
		return i - index === n || i + index === n;
	});
	return className || '';
};


//获得当前时间并处理时间格式   字符串时间
Index.prototype.getClock = function(){
	var d = new Date();
	return [this.use24Hours ? d.getHours() : d.getHours() % 12 || 12,d.getMinutes(),d.getSeconds()].reduce(function(p,n){
		// console.log(p,n)
		return p + ('0' + n).slice(-2);
	},'')
};

//动态生成dom结构

Index.prototype.creatDom = function (){
	for( var i=0 ; i<6; i++){
		var oDiv = '<div>'+ i + '</div>';
		$('.six').append(oDiv);
	}
	for( var i=0 ; i<10; i++){
		var iDiv = '<div>'+ i + '</div>';
		$('.ten').append(iDiv);
	}
};
new Index($('.column'),true);

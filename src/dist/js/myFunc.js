
/*
用ID获取标签
 */
function _$(id){
	return typeof id === "string" ? document.getElementById(id) : null;
}

/*
获取屏幕可视区域的高度
 */
function client(){
	if (window.innerHeight !== undefined) {
		return {
			"width" : window.innerWidth,
			"height" : window.innerHeight
		}
	}else if(document.compatMode === "CSS1Compat") {
		return {
			"width" : document.documentElement.clientWidth,
			"height" : document.documentElement.clientHeight
		}
	} else {
		return {
			"width" : document.body.clientWidth,
			"height" : document.body.clientHeight
		}
	}
}
/*
获取滚动的距离
 */
function scroll(){
	if (window.pageYOffset !== null) {
		return {
			"top" : window.pageYOffset,
			"left" : window.pageXOffset
		}
	} else if (document.compatMode === "CSS1Compat") {
		return {
			"top" : document.documentElement.scrollTop,
			"left" : document.documentElement.scrollLeft
		}
	} else {
		return {
			"top" : document.body.scrollTop,
			"left" : document.body.scrollLeft
		}
	}
}

/*
匀速动画函数
动画的基本原理：盒子的offsetLeft + 步长
 */
function constant(obj,target,step){
	//清除定时器
	clearInterval(obj.timer);

	//判断方向
	var dir = obj.offsetLeft < target ? step : -step;

	//设置定时器
	obj.timer = setInterval(function(){
		obj.style.left = obj.offsetLeft + dir + "px";
		if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)) {
			clearInterval(obj.timer);
			obj.style.left = target + "px";
		}
	},20)
}

/*
缓动动画函数
缓动动画的基本原理：盒子本身的位置 + 步长（不断变化的，由大到小）
步长：begin= begin + （end - begin）/ 缓动系数
 */
function buffer(obj,json,fn){
	//清除定时器
	clearInterval(obj.timer);
	//设置定时器
	var begin = 0, target = 0, speed = 0;
	obj.timer = setInterval(function(){
		//旗帜
		var flag = true;
		//json遍历
		for(var key in json){
			//获取初始值
			if ("opacity" === key) {  //透明度
				begin = Math.round(parseFloat(getCSSAttrValue(obj,key))*100) || 100;
				target = parseInt(parseFloat(json[key])*100);
			}else if ("scrollTop" === key) {
				begin = Math.ceil(obj.scrollTop);
				target = parseInt(json[key]);
			}else{  //其他情况
				begin = parseInt(getCSSAttrValue(obj,key)) || 0;
				target = parseInt(json[key]);
			}
			//求出步长
			speed = (target - begin)*0.2;
			//判断是否向上取整
			speed =(target > begin) ? Math.ceil(speed) : Math.floor(speed);
			//动起来
			if ("opacity" === key) {
				obj.style.opacity = (begin + speed) / 100;
				//ie
				obj.style.filter = 'alpha(opacity:'+(begin + speed)+')'
			}else if ("scrollTop" === key) {
				obj.scrollTop = begin + speed;
			}else{
				obj.style[key] = begin + speed + "px";
			}
			//判断
			if (begin !== target) {
				flag = false;
			}
		};
		//清除定时器
		if (flag) {
			clearInterval(obj.timer);

			//判断有没有回调函数
			if (fn) {
				fn();
			}
		}
	},20);
}

/*
获取CSS样式值
 */
function getCSSAttrValue(obj,attr){
	if (obj.currentStyle) {  //IE 和 opear
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj, null)[attr];
	}
}

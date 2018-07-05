
/*
用ID获取标签
 */
function $(id){
	return typeof id === "string" ? document.getElementById(id) : null;
}

/*
获取屏幕可视区域的宽度
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
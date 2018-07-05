

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
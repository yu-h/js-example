(function(){
    //1、调用选项卡
    tab();
})();


function tab(){
    var allLis;
    var doms;
    var lastOne = 0;

    //遍历监听
    for (var i = 0; i < allLis.length; i++){
        var li = allLis[i];
        (function(i){
            li.onclick = function (){
                //清除样式
                allLis[lastOne].className = "";
                doms[lastOne].style.display = "none";
                //设置样式
                this.className = "active";
                doms[i].style.display = "block";

                lastOne = i;
            }
        })(i)
    }
}
$(() => {
    // 1. 默认让第一个li和图片为current
    $(".left li")[0].style.background = "url(images/abg.gif) repeat-x";
    $(".middle li")[0].style.display = "block";
    console.log($(".left li"));
    // 2. 
    // 2. 鼠标移动事件
    $(".left li").mouseover(function() {
        console.log($(this).index());
        // 清空所有兄弟的classname和清空所有兄弟的display
        // $(".left li").css("background", "url(images/lili.jpg) repeat-x")
        // $(".middle li").hide();
        // 链式编程
        // 当前元素添加图片
        $(this).css("background", "url(images/abg.gif) repeat-x").siblings().css("background", "url(images/lili.jpg) repeat-x");
        // 对应的图片显示  $(this).index()获取索引号
        $(".middle li").eq($(this).index()).show().siblings().hide();
    });
})
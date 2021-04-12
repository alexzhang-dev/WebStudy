$(() => {
    // 当我们点击左侧，那么就不需要执行背景选择模块了
    // 节流阀/互斥锁
    let flag = true;
    // 1. 页面滚动到一定距离会出现或消失tools
    function toggleTool() {
        if ($(document).scrollTop() >= $(".recom-hd").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    };
    $(window).scroll(() => {
        toggleTool();
        // 3. 页面滚动到相应距离，左侧添加current
        $(".floor .w").each((index, element) => {
            if (flag) {
                // 如果被卷去的头部大于楼层原来的头部，那么就代表滚动到这个楼层了
                if ($(document).scrollTop() >= $(element).offset().top) {

                    $(".fixedtool li").eq(index).addClass("current").siblings().removeClass("current");
                }
            }
        });
    });
    // 2. 点击每一个链接进入相应的楼层，并且添加current
    $(".fixedtool li").click(function() {
        flag = false;
        $("body,html").animate({
            // 页面滑动到的距离 = 点击的索引号，找到相对应的楼层的scrollTop
            scrollTop: $(".floor .w").eq($(this).index()).offset().top,
        }, function() {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass("current");

    });
})
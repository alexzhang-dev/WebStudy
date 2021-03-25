window.addEventListener("load", function() {
    // 获取div
    var banner = document.querySelector(".focus");
    // 获取整个ul
    var banner_ul = banner.querySelector("ul");
    // 获取banner的宽度
    var banner_width = banner.offsetWidth;
    // ----------1.自动播放图片，因为手机端不需要考虑兼容问题----------
    // 所以我们可以大胆使用C3中的tranlate来移动图片
    // 统计定时器的次数，因为我们的图片是从第二张开始的
    var num = 0;
    // 定时器函数
    function timerFunction() {
        num++;
        // 添加过渡效果
        banner_ul.style.transition = "all .3s";
        // 我们使用translate来移动图片
        var translateX = -(num * banner_width);
        banner_ul.style.transform = "translateX(" + translateX + "px)";
    }
    var timer = setInterval(timerFunction, 2000);

    // ----------2.因为有过渡效果，所以我们要在过渡完成后再判断，transitionend事件判断过渡完成----------
    // 如果滚动到第三张，就让他回到第一张
    banner_ul.addEventListener("transitionend", function() {
        if (num >= this.children.length - 2) {
            // 我们需要去掉过渡效果，位置瞬间移动到原来的位置上
            num = 0;
            this.style.transition = "none";
            var translateX = -(num * banner_width);
            this.style.transform = "translateX(" + translateX + "px)";
        } else if (num < 0) {
            // 加一个判断，图片往前拉动也会有无缝滚动效果
            num = this.children.length - 2 - 1;
            var translateX = -(num * banner_width);
            this.style.transition = "none";
            this.style.transform = "translateX(" + translateX + "px)";
        }

        // ----------3. 让下面的小圆点随着图片同步----------
        var circle_list = banner.querySelector("ol");
        // 把带有current类名的选出来，移除掉current
        circle_list.querySelector(".current").classList.remove("current");
        // 因为移动端的小圆点不需要点击，所以不用给他点击事件
        circle_list.children[num].classList.add("current");
    });


    // ----------4. 添加一个触摸移动事件----------
    // 后面我们要用到startX和moveX，所以把他们定义为全局变量
    var startX = 0,
        moveX = 0;
    // 此变量判断用户按下后是否移动，如果移动才会进行下面的判断
    var flag = false;
    banner.addEventListener("touchstart", function(e) {
        // 手指进行banner，那么自动播放就要关闭了
        clearInterval(timer);
        // 首先获取banner的left
        var banner_left = banner.offsetLeft;
        // 触摸点移动，banner才会跟着移动
        // 触摸点初始距离
        startX = e.targetTouches[0].pageX;
        this.addEventListener("touchmove", function(e) {
            // 用最新的手指的坐标减去触摸点初始距离就是移动的距离
            moveX = e.targetTouches[0].pageX - startX;
            // 计算盒子的距离
            var translateX = -(num * banner_width) + moveX;
            // 手指拖动时，不需要动画效果，所以取消过渡
            banner_ul.style.transition = "none";
            banner_ul.style.transform = "translateX(" + translateX + "px)"
            flag = true;
            // 阻止滚动屏幕的默认行为
            e.preventDefault();
        });
    });
    // ----------5. 手指离开判断----------
    banner.addEventListener("touchend", function(e) {
        // 手指离开banner，自动播放打开
        timer = setInterval(timerFunction, 2000);
        // 手指离开banner，分几种情况
        // 1. 如果手指移动的距离小于某个数值，图片回到当前图片
        // 要用到绝对值，因为移动的距离可能是负值
        if (flag) {
            if (Math.abs(moveX) > 50) {
                // 2. 如果是往右滑，那么moveX就是正值，所以到上一张
                if (moveX > 0) {
                    num--;
                } else {
                    // 3. 如果是往左滑，那么moveX就是负值，所以到下一张
                    num++;
                }

            }
            var translateX = -(num * banner_width);
            banner_ul.style.transition = "all .3s";
            banner_ul.style.transform = "translateX(" + translateX + "px)"
        }

    });

    // ----------7. 回到顶部----------
    var goBack = document.querySelector(".goBack");
    var nav = document.querySelector(".local-nav");
    window.addEventListener("scroll", function() {
        // 如果页面滚动到了nav的下面，那么goBack按钮就显现出来
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = "block";
        } else {
            goBack.style.display = "none";
        }
    });
    goBack.addEventListener("click", function() {
        // 回到最上面
        window.scroll(0, 0);
    });
})
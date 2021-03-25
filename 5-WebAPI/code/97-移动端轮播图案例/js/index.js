window.addEventListener("load", function() {
    // 获取几个主要对象
    var banner = document.querySelector(".banner")
    var banner_ul = banner.querySelector("ul");
    var circle_ul = banner.querySelector("ol");
    // 获取banner的宽度，其实就是图片的宽度
    var banner_width = banner.offsetWidth;
    // 添加一个flag，判断用户是否在滑动
    var flag = false;

    // ----------1. 动态生成图片----------
    var dir_name = "images";
    var images_list = ["f1.jpg", "f2.jpg", "f3.jpg"];
    // 封装一个生成图片的函数
    function createImgInLiToUl(obj, src) {
        var img = document.createElement("img");
        img.src = src;
        var li = document.createElement("li");
        li.appendChild(img);
        obj.appendChild(li);
    }
    // 因为我们下面需要无缝切换，所以我们要在最前面和最后面添加一张图片
    createImgInLiToUl(banner_ul, dir_name + "/" + images_list[images_list.length - 1])
    for (var i = 0; i < images_list.length; i++) {
        // 生成图片
        createImgInLiToUl(banner_ul, dir_name + "/" + images_list[i]);


        // ----------2. 动态生成下面的小圆点----------
        var li = document.createElement("li");
        circle_ul.appendChild(li);

    }
    createImgInLiToUl(banner_ul, dir_name + "/" + images_list[0])

    // 默认让第一个小圆点是current
    circle_ul.children[0].className = "current";


    // ----------3. 自动播放图片----------
    // 定义一个全局变量，用于获取当前播放图片的index
    var index = 0;
    // 先写一个定时器函数
    function timerFunction() {
        // 表示该播放到下一张图片了
        index++;
        // 添加一个过渡效果
        banner_ul.style.transition = "all .3s";
        // 我们可以使用translate来代替left
        var translateX = -(index * banner_width);
        banner_ul.style.transform = "translate(" + translateX + "px)";
    }
    // 定时器
    var timer = setInterval(timerFunction, 3000);
    // transitionend事件，过渡结束会触发回调函数
    banner_ul.addEventListener("transitionend", function() {
        // 添加判断，如果移动到最后一张了，就瞬间跳到第一张，做无缝切换
        if (index >= circle_ul.children.length) {
            index = 0;
            // 因为是瞬间到的，所以不能让用户看到，所以先取消掉过渡
            banner_ul.style.transition = "none";
        } else if (index < 0) {
            // 如果移动到第一张了，再往前移动就到最后面
            index = circle_ul.children.length - 1;
            // 因为是瞬间到的，所以不能让用户看到，所以先取消掉过渡
            banner_ul.style.transition = "none";
        }
        var translateX = -(index * banner_width);
        banner_ul.style.transform = "translate(" + translateX + "px)";


        // -----------4. 让下面的小圆点和图片同步-----------
        // 因为不需要考虑兼容性问题，所以我们可以使用className来做这个功能
        // 先获取到当前current
        var current = circle_ul.querySelector(".current");
        current.classList.remove("current");
        // 添加一个过渡
        circle_ul.children[index].style.transition = "all .3s";
        // 让当前图片对应的index对应的小圆点class变成current
        circle_ul.children[index].classList.add("current");
    });


    // moveX：移动的距离，下面要用到
    var moveX;
    // -----------5. 触摸点进入banner，自动播放停止，反之开启-----------
    banner.addEventListener("touchstart", function(e) {
        clearInterval(timer);


        // -----------6. 可以拖动图片-----------
        // 获取触摸点的X坐标
        var startX = e.targetTouches[0].pageX;
        this.addEventListener("touchmove", function(e) {
            // 触摸点移动，触摸点的距离减去开始的距离就能获取移动的距离
            moveX = e.targetTouches[0].pageX - startX;
            // 移动的距离等于当前的距离加上移动的距离
            var translateX = -(index * banner_width) + moveX;
            banner_ul.style.transform = "translate(" + translateX + "px)";
            // 如果移动了，那么flag为true
            flag = true;
            // 阻止可以拖动屏幕的默认行为
            e.preventDefault();
        });
    });
    banner.addEventListener("touchend", function() {
        timer = setInterval(timerFunction, 3000);


        // -----------7. 图片拖动大于一定距离，图片切换达到上一张/下一张，反之图片回到当前-----------
        // 如果拖动距离大于50，如果是往左拖动，就是负值，就是下一张
        if (true) {
            if (Math.abs(moveX) > 50) {
                if (moveX < 0) {
                    index++;
                } else {
                    // 反之就是往右拖动，是正值，是往上一张拖动
                    index--;
                }
            }
            // 添加一个过渡效果
            banner_ul.style.transition = "all .3s";
            var translateX = -(index * banner_width);
            banner_ul.style.transform = "translate(" + translateX + "px)";
        }
    });

})
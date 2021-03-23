window.addEventListener("load", function() {
    // 获取对象，左箭头和右箭头和轮播图最大的div
    var left = document.querySelector(".arrow-l");
    var right = document.querySelector(".arrow-r");
    var focus = document.querySelector(".focus");


    focus.addEventListener("mouseenter", function() {
        // 1. 鼠标经过最大的div，那么左右箭头就会显现，反之隐藏
        left.style.display = "block";
        right.style.display = "block";
    });


    focus.addEventListener("mouseleave", function() {
        left.style.display = "none";
        right.style.display = "none";
    });


    // 获取整个banner的width
    var focus_width = focus.offsetWidth;
    // 获取每一张图片，作为数组显示
    var banner_img_ul = focus.querySelector("ul");
    // 2. 因为我们不知道图片有多少张，所以我们需要动态的生成小圆点
    var circle = focus.querySelector(".circle");
    // 下文中我们复制了一张第一张， 所以原来的： circle.children.length要 - 1
    for (var i = 0; i < banner_img_ul.children.length - 1; i++) {
        var li = document.createElement("li")
        circle.appendChild(li);
    }
    // 把circle里面的第一个圆圈设置一个current
    circle.children[0].className = "current";
    // 3. 小圆圈点击功能，点击哪个哪个就是current
    for (var i = 0; i < circle.children.length; i++) {
        // 记录当前小圆圈的索引，下面需要用到
        circle.children[i].setAttribute("data-index", i);


        circle.children[i].addEventListener("click", function() {
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = "";
            }
            this.className = "current";

            // 4. 图片也要同步切换，注意！！！切换图片其实是整个ul在动，不是li在动！
            // 当我们点击某个小圆圈时，就得到了这个圆圈的索引号
            var index = this.getAttribute("data-index");
            // ul的移动距离其实就是小圆圈的索引号乘以图片的宽度，注意是负值！
            animate(banner_img_ul, -(focus_width * index), );
        });

    }


    // 5. 点击左侧按钮和右侧按钮图片会更改
    // num作为次数
    var num = 0;
    left.addEventListener("click", function() {

    });


    right.addEventListener("click", function() {
        // 因为图片滚动到最后一张再滚动又会回到第一张，这是因为图片无缝滚动。
        // 无缝滚动原理：将第一张图片复制一份放到最后一张的后面
        // 当图片滚动到最后一张的时候，直接让他跳到第一张，这样看起来相当于是跳到了第一张
        // 其实是跳到了复制的第一张，又跳到了第一张
        if (num == banner_img_ul.children.length - 1) {
            banner_img_ul.style.left = 0;
            num = 0;
        }
        num++;
        // 点击一下，其实就是ul往右边移动了一个宽度*次数
        animate(banner_img_ul, -(num * focus_width), );
    });


})
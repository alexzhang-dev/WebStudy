window.addEventListener("load", function() {
    // 得到整个的div
    var focus = document.querySelector(".focus");
    // 得到所有的图片
    var banner_ul = focus.querySelector("ul");
    // 得到focus的宽度
    var focus_width = focus.offsetWidth;

    // ---------1. 获取左箭头右箭头，并添加事件----------
    var left_btn = document.querySelector(".arrow-l");
    var right_btn = document.querySelector(".arrow-r");

    focus.addEventListener("mouseenter", function() {
        left_btn.style.display = "block";
        right_btn.style.display = "block";
    });
    focus.addEventListener("mouseleave", function() {
        left_btn.style.display = "none";
        right_btn.style.display = "none";
    });

    // ---------2. 动态创建小圆点------------
    var circle = document.querySelector(".circle");
    // 下文中我们在最后一张里面添加了第一张，所以需要长度-1
    for (var i = 0; i < banner_ul.children.length - 1; i++) {
        var li = document.createElement("li");
        circle.appendChild(li);
    }
    // 给第一个添加默认current
    circle.children[0].className = "current";

    // ----------3. 点击每个小圆点可以切换图片----------
    for (var i = 0; i < circle.children.length; i++) {
        // 给每个小圆点一个下标值，我们接下来就需要用到这个了
        circle.children[i].setAttribute("data-index", i);
        circle.children[i].addEventListener("click", function() {
            // 先是可以点击每个小圆点
            // 排他思想，先清除所有，再单独添加
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = "";
            }
            this.className = "current";
            // 再是每个小圆点可以切换图片，就是移动banner_ul的left值，这里就用到下标值了
            animate(banner_ul, -(this.getAttribute("data-index") * focus_width));
            // 让num和data-index同步
            num = this.getAttribute("data-index");
        });
    }

    // ----------4. 右按钮可以让图片往右边移动----------
    // num这个值是用于计算点击的次数
    var num = 0;
    // 我们要让下面的小圆点同步，先排他
    right_btn.addEventListener("click", function() {
        // 做个判断，如果是最后一张了，那么就回到第一张
        // 我们需要无缝切换，原理就是在最后一张后面添加第一张，这样我们在移动的时候直接跳到第一张
        if (num == circle.children.length) {
            banner_ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(banner_ul, -(num * focus_width));
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = "";
        }
        // 我们注意到其实num对应着data-index呢
        // 因为最后一张后面还有一张第一张，所以需要我们加一个判断
        if (num == circle.children.length) {
            circle.children[0].className = "current";
        } else {
            circle.children[num].className = "current";
        }

    });

    // ----------5. 左按钮让图片往左移动----------
    left_btn.addEventListener("click", function() {
        // 做个判断，如果是最后一张了，那么就回到第一张
        // 我们需要无缝切换，原理就是在第一张的时候我们跳到复制的在最后面的第一张上面
        if (num == 0) {
            // 如果
            banner_ul.style.left = -(circle.children.length * focus_width) + "px";
            num = circle.children.length;
        }
        num--;
        animate(banner_ul, -(num * focus_width));
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = "";
        }
        // 我们注意到其实num对应着data-index呢
        // 因为最后一张后面还有一张第一张，所以需要我们加一个判断
        if (num == circle.children.length) {
            circle.children[0].className = "current";
        } else {
            circle.children[num].className = "current";
        }

    });

    // -----------6. 鼠标不进入focus，那么图片移动，反之图片不移动----------
    // 页面加载完成，先调用move函数
    var timer = setInterval(function() {
        // 自动调用事件
        right_btn.click();
    }, 3000)
    focus.addEventListener("mouseenter", function() {
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener("mouseleave", function() {
        timer = setInterval(function() {
            // 自动调用事件
            right_btn.click();
        }, 3000)
    });
})
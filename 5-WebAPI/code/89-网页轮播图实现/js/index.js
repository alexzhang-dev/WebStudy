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
    // num作为次数，因为我们后面要使用num和小圆点同步
    // 所以num的值使用小圆点的data-index的值+1
    var num = 0;

    right.addEventListener("click", function() {
        console.log(num);
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
        // 排他思想，先清除所有的className
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = "";
        }
        // 因此得知，num就相当于小圆点的data-index，所以我们取所有的小圆点
        // 因为我们使用无缝滚动，所以当到复制的第一张图片的时候，我们就把小圆点放给第一个
        if (num == banner_img_ul.children.length - 1) {
            circle.children[0].className = "current";
        } else {
            circle.children[num].className = "current";
        }
    });

    // 左边也是同理
    left.addEventListener("click", function() {
        console.log(num);
        if (num == 0) {
            banner_img_ul.style.left = (banner_img_ul.children.length - 1) * focus_width;
            num = banner_img_ul.children.length - 1;
        }
        // 因为是左边，所以是--
        num--;
        // 点击一下，其实就是ul往右边移动了一个宽度*次数
        animate(banner_img_ul, -(num * focus_width), );
        // 排他思想，先清除所有的className
        for (var i = 0; i < circle.children.length; i++) {
            circle.children[i].className = "";
        }
        if (num == banner_img_ul.children.length - 1) {
            circle.children[0].className = "current";
        } else {
            circle.children[num].className = "current";
        }
    });


    //6. 最后一步，让这个幻灯片在不移动的时候动起来，鼠标移动到focus的地方的时候停下来
    focus.addEventListener("mouseenter", function() {

    });
    setInterval(function() {
        animate(banner_img_ul, -(num + 1) * focus_width, function() {
            num++;
            if (num > banner_img_ul.length - 1) {
                num = 0;
                console.log(111);
            }
        });
    }, 3000);
})
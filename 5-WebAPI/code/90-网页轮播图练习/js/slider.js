window.addEventListener("load", function() {
    var banner = document.querySelector(".banner");
    // 获取banner的width
    var banner_width = banner.offsetWidth;
    // ----------1. 动态生成图片列表----------
    var images_dir_name = "images"
    var images_list = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
    // 获得图片所在的ul
    var banner_ul = banner.querySelector("ul");
    // 获得小方块所在的ol
    var ol = banner.querySelector("ol");
    for (var i = 0; i < images_list.length; i++) {
        // 创建图片
        var li = document.createElement("li");
        var img = document.createElement("img");
        // src="images/1.jpg"
        img.src = images_dir_name + "/" + images_list[i];
        li.appendChild(img);
        banner_ul.appendChild(li);
        // ----------2. 动态生成下面的小方块----------
        var ol_li = document.createElement("li");
        ol.appendChild(ol_li);
    }
    // 因为下面要无缝切换，所以我们要在最后一张后面再添加一张第一张图片
    var first_li = document.createElement("li");
    var img = document.createElement("img");
    img.src = images_dir_name + "/" + images_list[0];
    first_li.appendChild(img);
    banner_ul.appendChild(first_li);
    // 默认让第一个小方块是current
    ol.children[0].className = "current";

    // ----------3. 鼠标进入整个banner才会显示左右按钮----------
    // 获取左右按钮
    var left_btn = document.querySelector(".arrow_l");
    var right_btn = document.querySelector(".arrow_r");
    banner.addEventListener("mouseenter", function() {
        left_btn.style.display = "block";
        right_btn.style.display = "block";
    });
    // 鼠标离开左右按钮就会消失
    banner.addEventListener("mouseleave", function() {
        left_btn.style.display = "none";
        right_btn.style.display = "none";
    });

    // ----------4. 小方块点击哪个哪个就是current----------
    for (var i = 0; i < ol.children.length; i++) {
        // 给每个小方块添加data-index，下面要使用到
        ol.children[i].setAttribute("data-index", i);
        ol.children[i].addEventListener("click", function() {
            // 排他思想，先全部消失，然后单独添加className
            for (var j = 0; j < ol.children.length; j++) {
                ol.children[j].className = "";
            }
            this.className = "current";
            // ----------5. 点击小方块跳转到对应的图片----------
            // 其实移动的距离就是移动到哪张图片上，原理就是banner_ul往右边移动小方块*图片宽度
            // 因为是往左移动，所以是负值，这个别忘了
            animate(banner_ul, -(this.getAttribute("data-index") * banner_width));
            // 修复一下左右按钮的bug，bug的原因是因为num的值也就是点击的次数没有和当前的小方块的data-index同步
            num = this.getAttribute("data-index");
        });
    }

    // ----------5.右按钮点击一次，就是移动一张图片----------
    // 设定一个num全局变量，用于统计点击了多少次
    var num = 0;
    // 节流阀控制变量
    var flag = true;
    right_btn.addEventListener("click", function() {
        // 只有当动画执行完毕之后再再次执行，防止点击左右按钮图片过快过快的效果
        if (flag) {
            // 锁住动画
            flag = false;
            // 我们想做一个图片无缝滚动效果，也就是滚动到最后一张，再滚动就跳转到第一张
            // 其原理就是在最后一张后面再添加一张第一张，滚动到最后一张之后，再滚动就到了第一张
            // 其实这里的第一张是复制在最后面的第一张，我们再点击就让他跳转到最前面的第一张
            // 所以这里的判断条件不是到第4张，而是到第5张，因为num从0开始，所以length-1
            if (num == banner_ul.children.length - 1) {
                // 让他瞬间跳转到第一张，所以这里的left是0
                banner_ul.style.left = 0;
                // num也要初始化为0
                num = 0;
            }
            num++;
            // 从上面得知，这里的移动的距离就是点击的次数*图片的宽度
            animate(banner_ul, -(num * banner_width), function() {
                // 利用回调函数的特性，让节流阀在动画结束后打开
                flag = true;
            });
            // 我们让移动到复制的最后一张的时候，让这里的num变成0
            blockWithLeftAndRight(num == ol.children.length ? 0 : num);
        }
    });

    // ----------6. 左按钮点击一次，图片往左滚动----------
    left_btn.addEventListener("click", function() {
        // 左边也需要一个节流阀
        if (flag) {
            flag = false;
            // 这里我们也要做一个无缝滚动，只不过和上面的右按钮不同
            // 我们滚动到第一张图片的时候，再往前滚动，就让他之间跳到复制的第一张，再跳到最后一张
            // 就有一种一直往前滚动的效果
            if (num == 0) {
                // 所以移动到第4张图片，就是banner_ul.length-1*banner_width
                banner_ul.style.left = -(ol.children.length * banner_width) + "px";
                // num变成4
                num = ol.children.length;
            }
            num--;
            animate(banner_ul, -(num * banner_width), function() {
                flag = true;
            });
            blockWithLeftAndRight(num);
        }

    });

    // ----------7. 将下方的小圆点和左右按钮同步----------
    // 先排他，再单独设置
    function blockWithLeftAndRight(num) {
        for (var j = 0; j < ol.children.length; j++) {
            ol.children[j].className = "";
        }
        console.log(num);
        ol.children[num].className = "current";
    }

    // ----------8. 如果鼠标进入就停止自动播放，反之一直自动播放----------
    // 先搞个定时器，这里的自动播放原理其实就是每隔一定时间，就点击一次右按钮
    // 让页面一打开就开始执行定时器
    var timer = setInterval(function() {
        right_btn.click();
    }, 2000);
    // 这里的mouseenter和mouseleave可以写在上面，不过我为了好理解就不写上面了
    banner.addEventListener("mouseenter", function() {
        // 鼠标移动进来，定时器关闭
        clearInterval(timer);
        // 让timer的值变为空，防止出现多个定时器
        timer = null;
    });
    banner.addEventListener("mouseleave", function() {
        timer = setInterval(function() {
            right_btn.click();
        }, 2000);
    });
})
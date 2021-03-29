window.addEventListener("load", function() {
    var that;
    class Tab {
        constructor(id) {
            that = this;
            // 获取container
            this.container = document.querySelector(id);
            // 获取tab-title的父类和tab-content的父类
            this.tabTitleFather = this.container.querySelector(".tab-title ul");
            this.tabContentFather = this.container.querySelector(".tab-content");
            // 获取添加按钮
            this.addTabButton = this.container.querySelector(".add-tab");
            // 初始化
            this.init();
        }
        init() {
            // 获取tab-title和tab-content
            this.tabTitles = this.tabTitleFather.querySelectorAll("li");
            this.tabContents = this.tabContentFather.querySelectorAll("section");
            // 给元素绑定事件
            for (var i = 0; i < this.tabTitles.length; i++) {
                this.tabTitles[i].setAttribute("data-index", i);
                this.tabTitles[i].addEventListener("click", this.toogleTab);
                // 获取每个删除按钮并绑定删除事件
                this.tabTitles[i].querySelector(".close-tab").addEventListener("click", this.removeTab);
                // 获取title里面的content
                this.tabTitlesContent = this.tabTitles[i].querySelector(".title-content");
                // 给title和content添加双击修改事件
                this.tabTitlesContent.addEventListener("dblclick", this.editTab);
                this.tabContents[i].addEventListener("dblclick", this.editTab);
            }
            // 给添加按钮绑定事件
            this.addTabButton.addEventListener("click", this.addTab);
        }
        toogleTab() {
            // 参数1：需要切换的tab_title；参数2：需要切换的tab_content
            // 1. 切换tab
            // 先清空所有
            that.clearClass();
            // 再单独添加
            this.className = "current-title";
            that.tabContents[this.getAttribute("data-index")].className = "current-content";
        }
        addTab() {
            // 2. 添加tab
            // 我们要清除所有的class，因为下面我们指定了class了
            that.clearClass();
            // 创建title和content
            var title = '<li class="current-title" data-index=' + that.tabTitles.length + '><span class="title-content">New Tab</span><span class="close-tab">×</span></li>';
            var content = '<section class="current-content">Content' + Math.random() + '</section>';
            // insertAdjacentHTML()，可以将字符串添加到父元素中
            that.tabTitleFather.insertAdjacentHTML("beforeend", title);
            that.tabContentFather.insertAdjacentHTML("beforeend", content);
            // 添加完之后我们要重新初始化一下
            that.init();
        }
        removeTab(e) {
            // 3. 删除tab
            var index = this.parentNode.getAttribute("data-index");
            that.tabTitleFather.removeChild(that.tabTitles[index]);
            that.tabContentFather.removeChild(that.tabContents[index]);
            // data_index获取删除的是第几个选项卡
            var data_index = this.parentNode.getAttribute("data-index");
            // 删除这里出现逻辑，如果删除的选项卡不是当前的选项卡，则一切没问题
            // 如果删除的选项卡是当前的选项卡，如果选项卡不是第一个，删除之后current就变成删除的后一个，如果是第一个，就让他变成第一个
            if (this.parentNode.className == "current-title") {
                // 如果是选中的选项卡被删除的话
                if (data_index == that.tabTitles.length - 1) {
                    // 如果是最后一个被选中的选项卡
                    that.tabTitles[data_index - 1].className = "current-title";
                    that.tabContents[data_index - 1].className = "current-content";
                    // 删除后重新初始化
                    that.init();
                } else {
                    // 删除后重新初始化
                    that.init();
                    console.log(that.tabTitles[data_index]);
                    // 如果不是最后一个被选中的
                    that.tabTitles[data_index].className = "current-title";
                    that.tabContents[data_index].className = "current-content";
                }
            }
            // 阻止事件冒泡
            if (e && e.stopPropagation) {
                e.stopPropagation();
            } else {
                window.event.cancelBubble = true;
            }
            // 删除后重新初始化
            that.init();
        }
        editTab() {
            // 4. 修改tab
            // 双击获取原先的内容
            var old_text = this.innerHTML;
            // 双击禁止选中文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            // 双击后变为text
            this.innerHTML = "<input type=text />"
            var input = this.children[0];
            input.value = old_text;
            // 让文本框的文字处于选中状态
            input.select();
            // 我们离开文本框就把文本框的值给原来的地方
            function updateTitle() {
                input.parentNode.innerHTML = input.value;
            }
            input.onblur = function() {
                input.parentNode.innerHTML = input.value;
            };
            // 我们让敲回车键也可以实现这种效果
            input.addEventListener("keyup", function(e) {
                if (e.keyCode == 13) {
                    input.blur();
                }
            });
        }
        clearClass() {
            for (var i = 0; i < this.tabTitles.length; i++) {
                this.tabTitles[i].className = "";
                this.tabContents[i].className = "";
            }
        }
    }
    new Tab(".container");
})
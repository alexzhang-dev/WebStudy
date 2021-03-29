window.addEventListener("load", function() {
    var that;
    class BackTop {
        constructor(id) {
            this.container = document.querySelector(id);
            this.backTop = this.container.querySelector(".backTop");
            this.backTopOffsetTop = this.backTop.offsetTop;
            that = this;
            this.init();
        }
        init() {
            this.listenWindowScroll();
            this.backTop.addEventListener("click", this.backToTop);
            // this.backToTop();
        }
        getScrollTop() {
            return window.pageYOffset;
        }
        listenWindowScroll() {
            window.addEventListener("scroll", function() {
                if (that.getScrollTop() >= 500) {
                    that.backTop.style.display = "block";
                    that.backTop.style.position = "fixed";
                } else {
                    that.backTop.style.display = "none";
                }
            });
        }
        backToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }
    new BackTop(".container");
})
$(() => {
    function padZero(n) {
        if (n < 10) {
            return "0" + n;
        } else {
            return n;
        }
    }

    // 获取新闻列表的函数
    function getNewsList() {
        $.ajax({
            type: "GET",
            url: "http://www.liulongbin.top:3006/api/news",
            success: (resp) => {
                if (resp.status != 200) {
                    alert("获取新闻列表失败");
                    return;
                }
                template.defaults.imports.dateFormat = (regTime) => {
                    const date = new Date(regTime);
                    const y = date.getFullYear();
                    const m = date.getMonth() + 1;
                    const d = date.getDate();
                    const hh = date.getHours();
                    const mm = date.getMinutes();
                    const ss = date.getSeconds();
                    return `${y}-${padZero(m)}-${padZero(d)} ${padZero(hh)}:${padZero(mm)}:${padZero(ss)}`;
                }
                let htmlStr = template("tpl", resp);
                $("#news-list").html(htmlStr);
            }
        });
    }
    getNewsList();
});
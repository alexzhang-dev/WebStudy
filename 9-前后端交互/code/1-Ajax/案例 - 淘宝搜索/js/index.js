$(() => {
    // 1. 监听用户的keyup事件
    $(".ipt").on("keyup", function() {
        let search_kw = encodeURI($(this).val());
        // 2. 将当前的内容作为ajax的GET参数
        $.ajax({
            url: "https://suggest.taobao.com/sug?q=" + search_kw,
            dataType: "JSONP",
            success: function(resp) {
                let html = template("tpl-suggestList", resp);
                $("#suggest-list").show().html(html);
            }
        });
    });
})
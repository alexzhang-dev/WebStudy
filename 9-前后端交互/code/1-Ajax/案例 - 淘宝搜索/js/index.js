$(() => {
    // 5. 定义全局缓存对象
    const cacheObj = {};
    let timer = null;
    // 1. 监听用户的keyup事件
    $(".ipt").on("keyup", function() {
        let search_kw = $(this).val().trim();
        if (search_kw.length === 0) {
            return $("#suggest-list").hide();
        } else {
            // 5. 实现缓存
            if (cacheObj[search_kw]) {
                return rendarSuggestList(search_kw, cacheObj[search_kw]);
            }
            // 4. 实现防抖
            clearTimeout(timer);
            debounceSearch(search_kw);
        }
    });
    // 2. 封装获取数据函数
    function getSuggestList(search_kw) {
        $.ajax({
            url: "https://suggest.taobao.com/sug?q=" + search_kw,
            dataType: "JSONP",
            success: function(resp) {
                rendarSuggestList(search_kw, resp);
            }
        });
    }
    // 3. 封装渲染页面函数
    function rendarSuggestList(search_kw, respData) {

        if (respData.result.length <= 0) {
            $("#suggest-list").empty().hide();
        } else {
            let html = template("tpl-suggestList", respData);
            $("#suggest-list").show().html(html);
            // 5. 在渲染列表的时候，把关键字作为键，响应数据作为值
            cacheObj[search_kw] = respData;
        }
    }
    // 4. 封装防抖函数
    function debounceSearch(kw) {
        // 300毫秒内如果不触发时间那么就执行Ajax
        timer = setTimeout(() => {
            getSuggestList(kw);
        }, 500);
    }
})
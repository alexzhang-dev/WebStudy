$(() => {
    // 1. 全选功能
    //    (1). 点击上方和下方的全选按钮，所有的商品都可以被选中，反之不被选中
    $(".checkall").change(function() {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"))
    });
    //    (2). 选中所有的商品，上下两个全选按钮会被选中
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    })

    // 2. 增减商品功能
    //    (1). 点击+，商品数量加1
    $(".increment").click(function() {
        const itxt = $(this).siblings(".itxt");
        let p_num = itxt.val();
        p_num++;
        itxt.val(p_num);
        // 3. 修改商品价格小计功能
        // parents(selector) 获取指定的祖先元素
        let price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        // toFixed(2) 保留两位小数
        $(this).parents(".p-num").siblings(".p-sum").text(`￥${(price*p_num).toFixed(2)}`)
    });
    //    (2). 点击-，商品数量减1
    $(".decrement").click(function() {
        const itxt = $(this).siblings(".itxt");
        let p_num = itxt.val();
        if (p_num > 1) {
            p_num--;
            itxt.val(p_num)
        }
        let price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text(`￥${(price*p_num).toFixed(2)}`)
    });
    // 4. 用户修改文本框的值，小计计算
    $(".itxt").change(function() {
        let p_num = $(this).val();
        let price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text(`￥${(price*p_num).toFixed(2)}`);
        // 5. 文本框的值修改，购物车的总价改变
    });
})
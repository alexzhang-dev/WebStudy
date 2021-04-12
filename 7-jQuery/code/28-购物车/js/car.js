$(() => {
    // 1. 全选功能
    //    (1). 点击上方和下方的全选按钮，所有的商品都可以被选中，反之不被选中
    $(".checkall").change(function() {
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    //    (2). 选中所有的商品，上下两个全选按钮会被选中
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

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
        $(this).parents(".p-num").siblings(".p-sum").text(`￥${(price*p_num).toFixed(2)}`);
        getSum();
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
        $(this).parents(".p-num").siblings(".p-sum").text(`￥${(price*p_num).toFixed(2)}`);
        getSum();
    });
    // 4. 用户修改文本框的值，小计计算
    $(".itxt").change(function() {
        let p_num = $(this).val();
        let price = $(this).parents(".p-num").siblings(".p-price").text().substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text(`￥${(price*p_num).toFixed(2)}`);
        getSum();
    });
    // 5. 文本框的值修改，购物车的总价改变
    function getSum() {
        let count = 0; // 总件数
        let money = 0; // 总价格
        $(".itxt").each((index, ele) => {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each((index, ele) => {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text(`￥${money.toFixed(2)}`)
    }
    getSum();
    // 6. 删除商品功能
    //    (1)点击商品右侧按钮删除单个商品
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //    (2)删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    //    (3)清空购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum();
    });
    // 7. 选中商品可以添加背景
})
$(() => {
    // 点击事件封装函数
    function turnDoneOrToDO(mode, element, targetParentElement) {
        let checked = "";
        mode ? checked = `checked = "checked"` : checked = "";
        const li = `<li draggable="true"><input type="checkbox" id="todoStatus" ${checked}><p id="p-0" id="todoEdit">${$(element).siblings("#p-0").text()}</p><a href="javascript:;" id="todoRemove">-</a></li>`;
        targetParentElement.append(li);
        element.parent().remove();
        // 将内容储存到localStorage里面
        localStorage.setItem("todoList", $(element).siblings("#p-0").text());
        console.log(111);
    }
    // 点击文本框编辑封装函数
    function todoEdit(element) {
        if (flag) {
            element.html(`<input id="input-0" value="${element.text()}" />`);
            element.children().trigger("select");
            flag = false;
        }
    }
    // 文本框消失封装函数
    function editFinish(element) {
        element.parent().html(element.val());
        flag = true;
    }
    // 删除事件封装函数
    function todoRemove(element) {
        element.parents("li").remove();
    }
    $("#title").on("keyup", function(e) {
        if (e.keyCode === 13) {
            const li = `<li draggable="true"><input type="checkbox" id="todoStatus"><p id="p-0" id="todoEdit">${$(this).val()}</p><a href="javascript:;" id="todoRemove">-</a></li>`;
            $("#todolist").append(li);
            $(this).val("");
        }
    });
    // 给动态生成的li添加事件，使用on
    // 1. 这里添加todo点击后变成done
    $("#todolist").on("change", "li #todoStatus", function() {
        turnDoneOrToDO(true, $(this), $("#donelist"));
    });
    $("#donelist").on("change", "li #todoStatus", function() {
        turnDoneOrToDO(false, $(this), $("#todolist"));
    });
    let flag = true;
    // 2. 这里添加点击文本框可以编辑文字
    $("#todolist").on("click", "li #p-0", function() {
        todoEdit($(this));
    });
    $("#donelist").on("click", "li #p-0", function() {
        todoEdit($(this));
    });
    // 3. 文本框消失焦点
    $("#todolist").on("blur", "li #p-0 #input-0", function() {
        editFinish($(this));
    });
    $("#donelist").on("blur", "li #p-0 #input-0", function() {
        editFinish($(this));
    });
    // 4. 删除事件
    $("#todolist").on("click", "li #todoRemove", function() {
        todoRemove($(this));
    });
    $("#donelist").on("click", "li #todoRemove", function() {
        todoRemove($(this));
    });
});
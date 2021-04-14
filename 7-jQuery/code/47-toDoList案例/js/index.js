$(() => {
    // 获取唯一id
    function getToDoId() {
        !localStorage.getItem("todoID") ? localStorage.setItem("todoID", 0) : localStorage.setItem("todoID", parseInt(localStorage.getItem("todoID")) + 1);
        return localStorage.getItem("todoID");
    }

    // 获取在localStorage中的数据
    function getLocalStorageData(mode) {
        const datalist = localStorage.getItem(mode);
        if (datalist) {
            return JSON.parse(datalist);
        } else {
            return [];
        }
    }
    // 把数据储存到localStorage中
    /**
     * 
     * @param {string} mode : 可选"todolist"或"donelist"
     * @param {object} element : 当前todo的值的jQuery对象
     * @param {boolean} flag : true:文本框的值  false：text()
     * 
     * 
     */
    function setLocalStorageData(mode, element, flag) {
        let content = "";
        flag ? content = element.val() : content = element.text();
        clear();
        const data_list = getLocalStorageData(mode);
        const todoObj = {
            id: getToDoId(),
            content: content,
        };
        data_list.push(todoObj);
        localStorage.setItem(mode, JSON.stringify(data_list));
        loadData();
    }
    /**
     * 
     * @param {string} mode todolist or donelist
     */
    function loadData() {
        clear();
        const modes = ["todolist", "donelist"];
        modes.forEach((mode) => {
            let checked = "";
            const data_list = getLocalStorageData(mode);
            if (mode == "donelist") {
                checked = "checked='checked'";
                data_list ? $("#donecount").text(data_list.length) : $("#donecount").text(0)
            } else {
                data_list ? $("#todocount").text(data_list.length) : $("#todocount").text(0)
            }
            data_list.forEach((todoObj) => {
                const li = `<li draggable="true"><input type="checkbox" id="todoStatus" ${checked} ><p data-id="${todoObj.id}" id="todoEdit">${todoObj.content}</p><a href="javascript:;" id="todoRemove">-</a></li>`;
                $(`#${mode}`).prepend(li);
            });
        });
    }
    loadData();

    // 清空
    /**
     * 
     * @param {boolean} mode true：清空本地缓存加页面 false：清空页面
     */
    function clear(mode) {
        if (mode) {
            localStorage.removeItem("todolist");
            localStorage.removeItem("donelist");
            localStorage.removeItem("todoID");
            $("#todocount").text(0)
            $("#donecount").text(0)
        }
        $("#todolist").html("");
        $("#donelist").html("");
    }

    // 删除
    function remove(mode, element) {
        element.parents("li").remove();
        let id = element.siblings("#todoEdit").attr("data-id");
        const data_list = getLocalStorageData(mode);
        data_list.forEach((todoObj, index) => {
            if (todoObj.id === id) {
                data_list.splice(index, 1);
            }
        });
        localStorage.setItem(mode, JSON.stringify(data_list));
        loadData();
    }
    // 修改状态
    function changeStatus(mode, element) {
        let checked = "";
        let a_mode = "";
        if (mode == "todolist") {
            checked = "checked";
            a_mode = "donelist"
        } else {
            checked = "";
            a_mode = "todolist"
        }
        let id = element.siblings('#todoEdit').attr('data-id')
        const li = `<li draggable="true"><input type="checkbox" id="todoStatus" ${checked} ><p data-id="${id}" id="todoEdit">${element.siblings("#todoEdit").text()}</p><a href="javascript:;" id="todoRemove">-</a></li>`;
        $(`#${a_mode}`).append(li);
        remove(mode, element);
        setLocalStorageData(a_mode, element.siblings("#todoEdit"));
        loadData();
    }
    let flag = true; // 节流阀
    // 点击内容变成文本框并修改内容
    function edit(element) {
        if (flag) {
            element.html(`<input id="input-0" value="${element.text()}" />`);
            element.children().trigger("select");
            flag = false;
        }
    }
    // 消失焦点保存数据
    function editSave(mode, element) {
        const parent = element.parent();
        element.parent().html(element.val());
        const data_list = getLocalStorageData(mode);
        data_list.forEach((obj) => {
            if (obj.id === parent.attr("data-id")) {
                obj.content = element.val();
                console.log(obj.content);
            }
        });
        localStorage.setItem(mode, JSON.stringify(data_list));
        loadData();
        flag = true;
    }






    $("#title").on("keyup", function(e) {
        if ($(this).val() != "") {
            if (e.keyCode === 13) {
                setLocalStorageData("todolist", $(this), true);
                $(this).val("");
            }
        }
    });
    // 给动态生成的li添加事件，使用on
    // 1. 这里添加todo点击后变成done
    $("#todolist").on("change", "li #todoStatus", function() {
        changeStatus("todolist", $(this));
    });
    $("#donelist").on("change", "li #todoStatus", function() {
        changeStatus("donelist", $(this));
    });
    // 2. 这里添加点击文本框可以编辑文字
    $("#todolist").on("click", "li #todoEdit", function() {
        edit($(this));
    });
    $("#donelist").on("click", "li #todoEdit", function() {
        edit($(this));
    });
    // 3. 文本框消失焦点
    $("#todolist").on("blur", "li #todoEdit input", function() {
        editSave("todolist", $(this));
    });
    $("#donelist").on("blur", "li #todoEdit input", function() {
        editSave("donelist", $(this));
    });
    // 4. 删除事件
    $("#todolist").on("click", "li #todoRemove", function() {
        remove("todolist", $(this));
    });
    $("#donelist").on("click", "li #todoRemove", function() {
        remove("donelist", $(this));
    });
    // 5. 清空
    $("#todo-c").on("click", function() {
        clear(true);
    });
});
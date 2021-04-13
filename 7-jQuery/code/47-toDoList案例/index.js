$(() => {
    var todolist = [];
    var donelist = [];
    todolist.push(16513);
    console.log(todolist);
    // 渲染页面任务数量
    function loadCount() {
        if (localStorage.getItem("todolist")) {
            console.log("123456789");
            $("#todocount").text(localStorage.getItem("todolist").length);
        } else {
            $("#todocount").text(0);
        }
        if (localStorage.getItem("donelist")) {
            $("#donecount").text(localStorage.getItem("donelist").length);
        } else {
            $("#donecount").text(0);
        }
    }
    loadCount();
    // 渲染数据
    function loadData() {
        if (localStorage.getItem("todolist")) {
            console.log(localStorage.getItem("todolist"));
            todolist = localStorage.getItem("todolist");
            // todolist.forEach((index, todoObj) => {
            //     const li = `<li draggable="true"><input type="checkbox" id="status"><p id="p-${index}" id="todoEdit">${todoObj.content}</p><a href="javascript:;" id="deletToDo">-</a></li>`;
            //     $("#todolist").append(li);
            // });
        } else {
            todolist = [];
        }
        if (localStorage.getItem("donelist")) {
            donelist = localStorage.getItem("donelist");
            donelist.forEach((index, todoObj) => {
                const li = `<li draggable="true"><input type="checkbox" checked="checked" id="status"><p id="p-${index}" id="todoEdit">${todoObj.content}</p><a href="javascript:;" id="deletToDo">-</a></li>`;
                $("#donelist").append(li);
            });
        } else {
            donelist = [];
        }
    }
    loadData();
    $("#title").on("keyup", function(e) {
        if (e.keyCode === 13) {
            const todoObj = {
                content: $(this).val()
            };
            const todo_l = todolist.push(todoObj);
            console.log(todo_l);
            localStorage.setItem("todolist", todo_l);
            loadData();
        }
    });
})
var input = document.querySelector(".input");
var btn_plus = document.querySelector(".btn_plus");
var ul_list = document.querySelector(".ul_list");
var filter_select = document.querySelector(".filter_select");

// =========================================================
document.addEventListener("DOMContentLoaded", get_LocalStorage);

btn_plus.addEventListener("click", add_todo);
ul_list.addEventListener("click", delete_check);
filter_select.addEventListener("click", filter_todo);


function add_todo(e) {
    e.preventDefault();

    var div = document.createElement("div");
    div.classList.add("div_todo");

    var li = document.createElement("li");
    li.innerText = input.value;
    li.classList.add("li_item");
    div.appendChild(li);

    var complete_btn = document.createElement("button");
    complete_btn.innerHTML = '<i class="fas fa-check"></i>';
    complete_btn.classList.add("complete_btn");
    div.appendChild(complete_btn);

    var trash_btn = document.createElement("button");
    trash_btn.innerHTML = '<i class="fas fa-trash"></i>';
    trash_btn.classList.add("trash_btn");
    div.appendChild(trash_btn);

    ul_list.appendChild(div);

    // ===========================
    save_LocalStorage(input.value);

    input.value = "";
}

function delete_check(e) {
    var item = e.target;

    if (item.classList[0] === "trash_btn") {
        var parent = item.parentElement;
        parent.classList.add("fall_class");

        // ========================
        remove_LocalStorage(parent);

        parent.addEventListener("transitionend", function () {
            parent.remove();
        });
    }

    if (item.classList[0] === "complete_btn") {
        var parent = item.parentElement;
        parent.classList.toggle("completed_class");
    }
}



function filter_todo(e) {
    var child = ul_list.childNodes;
    child.forEach(function (todo) {

        switch (e.target.value) {

            case "all":
                todo.style.display = "flex";
                break;

            case "completed_opt":
                if (todo.classList.contains("completed_class")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted_opt":
                if (!todo.classList.contains("completed_class")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

        }

    });
}

// =================================
function save_LocalStorage(todo) {
    var save_todo

    if (localStorage.getItem("todo_storage") === null) {
        save_todo = [];
    } else {
        save_todo = JSON.parse(localStorage.getItem("todo_storage"))
    }
    save_todo.push(todo)
    localStorage.setItem("todo_storage", JSON.stringify(save_todo))
}

// ============================
function get_LocalStorage() {
    var get_todo

    if (localStorage.getItem("todo_storage") === null) {
        get_todo = [];
    } else {
        get_todo = JSON.parse(localStorage.getItem("todo_storage"))
    }

    get_todo.forEach(function (todo) {

        var div = document.createElement("div");
        div.classList.add("div_todo");

        var li = document.createElement("li");
        li.innerText = todo;
        li.classList.add("li_item");
        div.appendChild(li);

        var complete_btn = document.createElement("button");
        complete_btn.innerHTML = '<i class="fas fa-check"></i>';
        complete_btn.classList.add("complete_btn");
        div.appendChild(complete_btn);

        var trash_btn = document.createElement("button");
        trash_btn.innerHTML = '<i class="fas fa-trash"></i>';
        trash_btn.classList.add("trash_btn");
        div.appendChild(trash_btn);

        ul_list.appendChild(div);

    })
}


function remove_LocalStorage(todo) {
    var remove_todo;

    if (localStorage.getItem("todo_storage") === null) {
        remove_todo = [];
    } else {
        remove_todo = JSON.parse(localStorage.getItem("todo_storage"));
    }

    console.log(todo);

    var todo_index = todo.children[0].innerText;
    remove_todo.splice(remove_todo.indexOf(todo_index), 1);

    localStorage.setItem("todo_storage", JSON.stringify(remove_todo));
}

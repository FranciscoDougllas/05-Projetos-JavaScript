"use strict";

// Seleção de elementos
var todoForm = document.querySelector("#todo-form");
var todoInput = document.querySelector("#todo-input");
var todoList = document.querySelector("#todo-list");
var editForm = document.querySelector("#edit-form");
var editInput = document.querySelector("#edit-input");
var cancelEditBtn = document.querySelector("#cancel-edit-btn");
var searchInput = document.querySelector("#search-input");
var eraseBtn = document.querySelector("#erase-button");
var filterBtn = document.querySelector("#filter-select");
var oldInputValue; // Funções

var saveTodo = function saveTodo(text) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var save = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var todo = document.createElement("div");
  todo.classList.add("todo");
  var todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);
  var doneBtn = document.createElement("button");
  doneBtn.classList.add("finish-todo");
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);
  var editBtn = document.createElement("button");
  editBtn.classList.add("edit-todo");
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);
  var deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-todo");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn); // Utilizando dados da localStorage

  if (done) {
    todo.classList.add("done");
  }

  if (save) {
    saveTodoLocalStorage({
      text: text,
      done: 0
    });
  }

  todoList.appendChild(todo);
  todoInput.value = "";
};

var toggleForms = function toggleForms() {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

var updateTodo = function updateTodo(text) {
  var todos = document.querySelectorAll(".todo");
  todos.forEach(function (todo) {
    var todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text; // Utilizando dados da localStorage

      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

var getSearchedTodos = function getSearchedTodos(search) {
  var todos = document.querySelectorAll(".todo");
  todos.forEach(function (todo) {
    var todoTitle = todo.querySelector("h3").innerText.toLowerCase();
    todo.style.display = "flex";
    console.log(todoTitle);

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};

var filterTodos = function filterTodos(filterValue) {
  var todos = document.querySelectorAll(".todo");

  switch (filterValue) {
    case "all":
      todos.forEach(function (todo) {
        return todo.style.display = "flex";
      });
      break;

    case "done":
      todos.forEach(function (todo) {
        return todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none";
      });
      break;

    case "todo":
      todos.forEach(function (todo) {
        return !todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none";
      });
      break;

    default:
      break;
  }
}; // Eventos


todoForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});
document.addEventListener("click", function (e) {
  var targetEl = e.target;
  var parentEl = targetEl.closest("div");
  var todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("finish-todo")) {
    parentEl.classList.toggle("done");
    updateTodoStatusLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("remove-todo")) {
    parentEl.remove(); // Utilizando dados da localStorage

    removeTodoLocalStorage(todoTitle);
  }

  if (targetEl.classList.contains("edit-todo")) {
    toggleForms();
    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});
cancelEditBtn.addEventListener("click", function (e) {
  e.preventDefault();
  toggleForms();
});
editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});
searchInput.addEventListener("keyup", function (e) {
  var search = e.target.value;
  getSearchedTodos(search);
});
eraseBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchInput.value = "";
  searchInput.dispatchEvent(new Event("keyup"));
});
filterBtn.addEventListener("change", function (e) {
  var filterValue = e.target.value;
  filterTodos(filterValue);
}); // Local Storage

var getTodosLocalStorage = function getTodosLocalStorage() {
  var todos = JSON.parse(localStorage.getItem("todos")) || [];
  return todos;
};

var loadTodos = function loadTodos() {
  var todos = getTodosLocalStorage();
  todos.forEach(function (todo) {
    saveTodo(todo.text, todo.done, 0);
  });
};

var saveTodoLocalStorage = function saveTodoLocalStorage(todo) {
  var todos = getTodosLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

var removeTodoLocalStorage = function removeTodoLocalStorage(todoText) {
  var todos = getTodosLocalStorage();
  var filteredTodos = todos.filter(function (todo) {
    return todo.text != todoText;
  });
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

var updateTodoStatusLocalStorage = function updateTodoStatusLocalStorage(todoText) {
  var todos = getTodosLocalStorage();
  todos.map(function (todo) {
    return todo.text === todoText ? todo.done = !todo.done : null;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

var updateTodoLocalStorage = function updateTodoLocalStorage(todoOldText, todoNewText) {
  var todos = getTodosLocalStorage();
  todos.map(function (todo) {
    return todo.text === todoOldText ? todo.text = todoNewText : null;
  });
  localStorage.setItem("todos", JSON.stringify(todos));
};

loadTodos();
//Selecetors

const todoButton = document.querySelector("#todo-button");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const filterOption = document.querySelector("#filter-todo")
// EVENT LISTNERS

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)
document.addEventListener("DOMContentLoaded", getTodos)


// functions
function addTodo(event) {
  event.preventDefault(); //prevent from submit form

  //Todo div (creating a div for showing our todo's info)
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //creating a li
  const newTodo = document.createElement('li');
  newTodo.textContent = todoInput.value;
  newTodo.classList.add('todo-item');
  //todoList.appendChild('todoDiv')
  todoDiv.appendChild(newTodo)
  //ADD TODO TO LACALSTORAGE...the value in the input i added
  saveLocalTodos(todoInput.value)


  // CHECK MARKS BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-button")
  todoDiv.appendChild(completedButton)

  //DELETE BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button")
  todoDiv.appendChild(trashButton)

  todoList.appendChild(todoDiv)
  todoInput.value = "";
}

function deleteCheck(e) {

  const item = e.target
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement
    todo.classList.add("slide")
    //Remove todos from localstorage
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }

  if (item.classList[0] === "completed-button") {
    const todo = item.parentElement
    todo.classList.toggle("completed")

  }

}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex'
        break;
      case "complete":

        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        }
        else {
          todo.style.display = 'none'
        }
        break;
        
      case "incomplete":

        if (todo.classList.contains('completed')) {
          todo.style.display = 'none'
        }
        else {
          todo.style.display = 'flex'
        }
        break;

    }

  })
}

function saveLocalTodos(todo) {
  //chack if i have any thing in local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    // if local storage is empty then we create an empty array
    todos = [];//-->empty array
  }
  else {
    // else we fetch the array
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  // push a new todo to the array that is created or had already existed
  todos.push(todo);
  //Sending the array back to local storage after the update
  localStorage.setItem("todos", JSON.stringify(todos))
}


//SHOWING TODOS IN THE UI OR DATA FROM LOCAL STORAGE IS FETCHED AND SHOWED ON SCREEN
function getTodos(todo) {
  //chack if i have any thing in local storage
  let todos;
  if (localStorage.getItem('todos') === null) {
    // if local storage is empty then we create an empty array
    todos = [];//-->empty array
  }
  else {
    // else we fetch the array
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.forEach(function (todo) {
    //Todo div (creating a div for showing our todo's info)
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //    creating a li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    //    todoList.appendChild('todoDiv')
    todoDiv.appendChild(newTodo)

    // CHECK MARKS BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button")
    todoDiv.appendChild(completedButton)

    //DELETE BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button")
    todoDiv.appendChild(trashButton)

    todoList.appendChild(todoDiv)
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    // if local storage is empty then we create an empty array
    todos = [];//-->empty array
  }
  else {
    // else we fetch the array
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  //get the index of todo we want to remove from the array created or exited blah blah
  //what we are gonna need to do is access todo class then>its childrens wich are li complete and delete (buttons)
  //next what we want is the li so we are gonna select first 1st element or children at [0] 0th index
  const todoIndex = todo.children[0].innerHTML;
  //.splice remove an element from array(position of element yo want to remove,how many elements)
  todos.splice(todos.indexOf(todoIndex)/*what position you want to remove*/, 1/*how many elements*/)

  // now what we want to do is setback that updated array again to localstorage 
  localStorage.setItem("todos", JSON.stringify(todos))
}
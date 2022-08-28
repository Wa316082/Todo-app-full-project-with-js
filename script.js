
//Finding Elements

const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const tooButton = document.querySelector("#Button");
const todoLists = document.querySelector("#lists");
const messageElement = document.getElementById("message");




//shoow message function
const showMessage=(text,status)=>{
   messageElement.textContent=text;
   messageElement.classList.add(`bg-${status}`);
   setTimeout(()=>{
    messageElement.textContent="";
    messageElement.classList.remove(`bg-${status}`);
   },1000);
}

//creatde todo funtion

const createTodo = (todoId,todoValue)=>{
    const todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("list-style") ;
    todoElement.innerHTML=
    `
        <span>${todoValue} </span>
        <span>
        <button class ="btn" id="deleteButton">
        <i class="fa-solid fa-trash-can "></i>
        </button> 
        </span>
    `;
    const deleteButton = todoElement.querySelector("#deleteButton");
    deleteButton.addEventListener("click",deleteTodos);
    todoLists.appendChild(todoElement);



};


// delete todo functions

const deleteTodos =(event)=>{
   const selectedTodo = event.target.parentElement.parentElement.parentElement;
   console.log(selectedTodo);
   todoLists.removeChild(selectedTodo);
   showMessage("Todo is deleted","danger");
   let todos = getTodosFromLocalStorage();
   todos = todos.filter((todo)=> todo.todoId !== selectedTodo.id);

   localStorage.setItem("mytodos",JSON.stringify(todos));

};


//getTodosFromLocalStorage
const getTodosFromLocalStorage=()=>{
    return localStorage.getItem("mytodos")? JSON.parse
        (localStorage.getItem("mytodos")): [];
}

    

//add todo function

const addTodo = (event)=>{
    event.preventDefault();
    const todoValue = todoInput.value;

    // unique id
    
    const todoId = Date.now().toString();
    
    createTodo(todoId,todoValue);
    showMessage("todo is added","success");


    
    //adding value to local storege 
    
    const todos = getTodosFromLocalStorage();

    todos.push({todoId,todoValue});
    localStorage.setItem("mytodos",JSON.stringify(todos));

    todoInput.value="";

};
//load todos functions
const loadtodos= ()=>{
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId,todo.todoValue));
}

//Adding lestener

todoForm.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadtodos);

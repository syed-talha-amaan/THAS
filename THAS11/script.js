let todos=document.getElementById("todo-content")

function getTodos(){
    let todoList=localStorage.getItem("todos");
    todos.innerHTML=todoList;
}
function addTodo(event){
    if(event.code === "Enter"){
        let todo =document.getElementById("todo-input").value;
        if(todo){
        let list=`<li><span><i class="fa fa-trash"></i></span>${todo}</li>`
        document.getElementById("todo-content").innerHTML+=list;
        document.getElementById("todo-input").value="";
        }
        else{
            alert("Your ToDo cannot be Empty");
        }
        localStorage.setItem("todos", todos.innerHTML);
    }
}

document.querySelector("ul").addEventListener('click',function(event){
    event.target.classList.toggle('completed');
    localStorage.setItem("todos", todos.innerHTML);
});


document.querySelector("ul").addEventListener('click',function(event){
    if(event.target.tagName === 'l'){
        element.target.parentElement.parentElement.remove();
    }
    if(event.target.tagName === 'SPAN'){
        event.target.parentElement.remove();
    }
    localStorage.setItem("todos", todos.innerHTML);
});
document.querySelector("button").addEventListener('click',function(){
    localStorage.clear();
    localStorage.setItem(todos,todos.innerHTML);
    let todoList=localStorage.getItem("todos");
    todos.innerHTML=todoList;
});


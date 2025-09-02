window.onload=function(){
    loadTasks();

};
function addTask(){
    let taskInput=document.getElementById("taskInput");
    let tasktext=taskInput.value.trim();
    if(tasktext===""){
        alert("PLEASE ENTER A TASK!!!!");
        return;
    }
    let task = {
        text: tasktext,
        completed:false
    };
    saveTask(task);
    renderTask(task);
    taskInput.value="";
}
function renderTask(task){
    let li=document.createElement("li");
        let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked=task.completed;
    checkbox.addEventListener("change",function(){
        task.completed=checkbox.checked;
        li.classList.toggle("completed", task.completed);
        updateStorage();
    });
    li.appendChild(checkbox);
    let span=document.createElement("span");
    span.textContent=task.text;
    if(task.completed) {
        li.classList.add("completed");
    }
    li.appendChild(span);
span.addEventListener("click",function(){
    task.completed=!task.completed;
    li.classList.toggle("completed");
    updateStorage();
});
let editBtn=document.createElement("button");
editBtn.textContent="✏️";
editBtn.style.marginLeft="5px";
editBtn.addEventListener("click",function(e){
    e.stopPropagation();
    let newText=prompt("Edit your task:",task.text);
    if(newText!==null&&newText.trim()!=="") {
        task.text=newText.trim();
        span.textContent=task.text;
        updateStorage();
    }
});
let deleteBtn=document.createElement("button");
deleteBtn.textContent="🗑️"
deleteBtn.style.marginLeft="5px";
deleteBtn.addEventListener("click",function(e){
    e.stopPropagation();
    li.remove();
    deleteTask(task);
});
li.appendChild(editBtn);
li.appendChild(deleteBtn);
document.getElementById("taskList").appendChild(li);
}
function saveTask(task) {
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function loadTasks(){
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.forEach(task => renderTask(task));
}
function updateStorage() {
    let lis=document.querySelectorAll("#taskList li");
    let tasks=[];
    lis.forEach((li)=>{
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    }); 
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function deleteTask(taskToDelete) {
    let tasks=JSON.parse(localStorage.getItem("tasks"))||[];
    tasks=tasks.filter((task)=>task.text !== taskToDelete.text);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
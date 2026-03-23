let taskdata = [
    {
        "title": "انهاء الكتاب",
        "date": "10/10/2012",
        "isDone": false
    }

];
function getTasksFromStorage(){
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
    taskdata = retrievedTasks ?? [];
}
getTasksFromStorage();
function fillTaskesOnPage() {

    document.getElementById("tasks").innerHTML = "";
    let index = 0;
    let id = 0;
    for (let task of taskdata) {
        const content =
            `   
                        <div class="task ${task.isDone? "success-green":""}" id ="task${id}">
                            <div class="task-info">
                                <h2>${task.title}</h2>
                                <div>
                                    <i class="fa-solid fa-calendar"></i><span>${task.date}</span>
                                </div>
                            </div>
                            <div class="task-action">
                                <button class="circular" id="del-btn" onclick="deleteTask(${index})" style="background-color: #690000;"><i
                                    class="fa-solid fa-trash"></i></button>
                                    ${task.isDone? `
                                        
                                        <button class="circular" id="check-btn" onclick="doneTask(${index})" style="background-color: #f36b67;">
                                        <i class="fa-solid fa-calendar-xmark"></i>
                                    </button> 
                                        `
                                        :
                                        `
                                       <button class="circular" id="check-btn" onclick="doneTask(${index})" style="background-color: #008B16;">
                                        <i class="fa-solid fa-check"></i>
                                    </button> 
                                        `
                                    }
                                    
                                    <button class="circular" id="edit-btn" onclick="editTask(${index})" style="background-color: #4E59D8;">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </div>
                        </div>
        `
            ;
        document.getElementById("tasks").innerHTML += content;
        index++;
        id++;

    }
}
fillTaskesOnPage();
let btn = document.getElementById("add-btn");
console.log(btn);
let newTitle = "";
// ADD BUTTON
btn.addEventListener("click", () => {
    let now = new Date();
    let date = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' | ' + now.getHours() + ':' + now.getMinutes();
    console.log(date);
    newTitle = prompt("الرجاء ادخال عنوان المهمة🔥")
    taskdata.push({
        "title": newTitle,
        "date": date,
        "isDone": false
    })
    storeOnLocalStorage();
    fillTaskesOnPage();
});
function deleteTask(index) {
    let isConfirm = confirm(`هل انت متأكد من خذف مهمة "${taskdata[index].title}"`);
    if(isConfirm){
        let removeTask = document.getElementById(`task${index}`);
        removeTask.classList.add('removing')
        console.log(removeTask)
        setTimeout(()=>{
            taskdata.splice(index, 1);
            storeOnLocalStorage()
            fillTaskesOnPage();
    
        },400)
    }
}
function editTask(index){
    let task = taskdata[index];
    let ans = prompt("الرجاء تحديد العنوان الجديد للمهمة", `${task.title}`);
    if(ans !== null && ans !=="" ){
        taskdata[index].title = ans;
        storeOnLocalStorage();
    }
    fillTaskesOnPage();
}
function doneTask(index){
    taskdata[index].isDone = !taskdata[index].isDone;
    storeOnLocalStorage()
    fillTaskesOnPage()
}
function storeOnLocalStorage(){
    let taskString = JSON.stringify(taskdata);
    console.log(taskString)
    localStorage.setItem("tasks",taskString)
}

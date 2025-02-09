let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

async function updateTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];

        let taskItem = document.createElement("div");
        taskItem.className = "task-item";
        if (task.completed) {
            taskItem.classList.add("task-completed");
        }

        let title = document.createElement("h3");
        title.innerText = task.title;
        title.style.fontWeight = "bold"; // Make it bold
        title.style.wordWrap = "break-word"

        let description = document.createElement("p");
        description.innerText = task.description;

        let priority = document.createElement("p");
        priority.innerText = "Priority: " + task.priority;

        let completeBtn = document.createElement("button");
        completeBtn.innerText = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = async function () {
            markTaskDone(i);
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = async function () {
            removeTask(i);
        };

        taskItem.append(title, description, priority, completeBtn, deleteBtn);
        taskList.append(taskItem);
    }
}

async function addNewTask(event) {
    event.preventDefault();

    let title = document.getElementById("taskTitle").value;
    let description = document.getElementById("taskDescription").value;
    let priority = document.getElementById("taskPriority").value;

    if (title === "") {
        alert("Task title is required!");
        return;
    }

    let newTask = {
        title: title,
        description: description,
        priority: priority,
        completed: false
    };

    tasks[tasks.length] = newTask;
    await updateTasks();

    document.getElementById("taskForm").reset();
}

async function removeTask(index) {
    let newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (i !== index) {
            newTasks[newTasks.length] = tasks[i];
        }
    }
    tasks = newTasks;
    await updateTasks();
}

async function markTaskDone(index) {
    tasks[index].completed = !tasks[index].completed;
    await updateTasks();
}

document.getElementById("taskForm").addEventListener("submit", addNewTask);
updateTasks();

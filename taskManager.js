// Array to store tasks
let tasks = [];

// Function to load tasks from localStorage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function addTask(title, description, priority) {
    const task = {
        id: Date.now(), // Generate a unique ID
        title,
        description,
        priority,
        completed: false,
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    saveTasks();
    renderTasks();
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Function to render tasks on the page
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear previous tasks

    tasks.forEach((task) => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        if (task.completed) {
            taskItem.classList.add("task-completed");
        }

        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Add event listeners for the buttons
        taskItem.querySelector(".complete-btn").addEventListener("click", () => toggleTaskCompletion(task.id));
        taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

        taskList.appendChild(taskItem);
    });
}

// Event listener for the form submission
document.getElementById("taskForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();
    const priority = document.getElementById("taskPriority").value;

    if (!title) {
        alert("Task title is required!");
        return;
    }

    addTask(title, description, priority);

    // Clear form inputs
    document.getElementById("taskForm").reset();
});

// Load tasks on page load
loadTasks();

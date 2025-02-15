document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("task-input").value.trim();
    let taskDate = document.getElementById("task-date").value;
    let taskTime = document.getElementById("task-time").value;

    if (taskInput === "" || taskDate === "" || taskTime === "") {
        alert("Please fill in all fields.");
        return;
    }

    let taskList = document.getElementById("task-list");
    let li = document.createElement("li");

    li.innerHTML = `
        <span><strong>${taskInput}</strong> - ${taskDate} at ${taskTime}</span>
        <button onclick="toggleComplete(this)">✔</button>
        <button onclick="editTask(this)">✏</button>
        <button onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    saveTasks();

    // Clear input fields
    document.getElementById("task-input").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-time").value = "";
}

function toggleComplete(button) {
    let li = button.parentElement;
    li.classList.toggle("completed");
    saveTasks();
}

function editTask(button) {
    let li = button.parentElement;
    let taskDetails = li.querySelector("span").textContent.split(" - ");
    
    if (taskDetails.length < 2) return;

    let taskText = taskDetails[0].trim();
    let taskDateTime = taskDetails[1].split(" at ");
    let taskDate = taskDateTime[0].trim();
    let taskTime = taskDateTime.length > 1 ? taskDateTime[1].trim() : "";

    let newText = prompt("Edit task:", taskText);
    let newDate = prompt("Edit date (YYYY-MM-DD):", taskDate);
    let newTime = prompt("Edit time (HH:MM):", taskTime);

    if (newText && newDate && newTime) {
        li.querySelector("span").textContent = `${newText} - ${newDate} at ${newTime}`;
        saveTasks();
    }
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        tasks.push({ 
            text: li.querySelector("span").textContent, 
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("task-list");

    taskList.innerHTML = ""; // Clear existing tasks before loading

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleComplete(this)">✔</button>
            <button onclick="editTask(this)">✏</button>
            <button onclick="deleteTask(this)">❌</button>
        `;
        if (task.completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}

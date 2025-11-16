const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// لود کردن کارها از localStorage در شروع
window.onload = () => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach(task => addTaskToUI(task.text, task.completed));
};

// افزودن کار
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    addTaskToUI(text, false);
    saveTasks();
    taskInput.value = "";
});

// ساختن یک آیتم در UI
function addTaskToUI(text, completed) {
    const li = document.createElement("li");
    li.className = "task";
    if (completed) li.classList.add("completed");

    li.innerHTML = 
        <span class="task-text">${text}</span>
        <div>
            <button class="delete-btn">حذف</button>
        </div>
    ;

    // کلیک روی متن → تیک خوردن
    li.querySelector(".task-text").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    // حذف کردن
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// ذخیره کارها در localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll(".task").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
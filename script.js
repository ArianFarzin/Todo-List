const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

window.onload = () => {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((task) => addTaskToUI(task.text, task.completed));
};

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") return;

  addTaskToUI(text, false);
  saveTasks();
  taskInput.value = "";
});

function addTaskToUI(text, completed) {
  const li = document.createElement("li");
  li.className = "task";
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const div = document.createElement("div");

  const doneBtn = document.createElement("button");
  doneBtn.className = "done-btn";
  doneBtn.textContent = "✓";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";

  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(div);

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  doneBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  deleteBtn.addEventListener("click", () => {
    if (confirm("Do you want to delete this task?")) {
      li.remove();
      saveTasks();
    }
  });

  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task").forEach((li) => {
    tasks.push({
      text: li.querySelector(".task-text").innerText,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Select elements
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Add task function
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("⚠ Please enter a task!");
    return;
  }
  renderTask(taskText, false);
  input.value = "";
}

// Render task (create li + button)
function renderTask(taskText, isDone) {
  const li = document.createElement("li");
  li.innerText = taskText;

  if (isDone) {
    li.classList.add("done");
  }

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = isDone ? "✔️" : "❌";
  delBtn.classList.add("deleteBtn");

  // Mark done toggle
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    delBtn.innerText = li.classList.contains("done") ? "✔️" : "❌";
  });

  // Delete task
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toggling done
    li.remove();
  });

  // Append delete button inside list item
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Add button click
addBtn.addEventListener("click", addTask);

// Press Enter to add task
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

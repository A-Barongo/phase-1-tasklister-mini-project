document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");

  form.addEventListener("submit", handleTaskSubmission);

  function handleTaskSubmission(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    const taskInput = document.querySelector("#new-task-description");
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    
    const taskText = taskInput.value.trim();
    if (taskText === "") return; // Ignore empty inputs

    addTaskToList(taskText);
    taskInput.value = ""; // Clear input field
  }

  function addTaskToList(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.style.marginLeft = "10px";

    const editButton = createButton("Edit", () => editTask(taskItem));
    const deleteButton = createButton("Delete", () => taskItem.remove());
    
    taskItem.appendChild(dueDateInput);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  }

  function createButton(label, onClick) {
    const button = document.createElement("button");
    button.textContent = label;
    button.style.marginLeft = "10px";
    button.addEventListener("click", onClick);
    return button;
  }

  function editTask(taskItem) {
    const newTaskText = prompt("Edit your task:", taskItem.firstChild.textContent);
    if (newTaskText !== null) {
      taskItem.firstChild.textContent = newTaskText;
    }
  }

  // Future server communication function
  function sendDataToServer(data) {
    fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => console.log("Task saved:", result))
      .catch((error) => console.error("Error saving task:", error));
  }
});

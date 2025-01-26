// Function to add a task to the list
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
  
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }
  
    const taskList = document.getElementById("task-list");
  
    // Create a new list item for the task
    const li = document.createElement("li");
    const span = document.createElement("span");
    const removeButton = document.createElement("button");
  
    span.textContent = taskText;
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
  
    // Append the span and remove button to the list item
    li.appendChild(span);
    li.appendChild(removeButton);
  
    // Append the list item to the task list
    taskList.appendChild(li);
  
    // Clear the input field after adding the task
    taskInput.value = "";
  
    // Add event listener to the remove button
    removeButton.addEventListener("click", () => {
      li.remove(); // Remove the task from the list
    });
  }
  
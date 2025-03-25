import { tasks, availableIds, updateTasks } from "./submitTask";

const taskContainer = document.getElementById("main");

// Function for handling all footer btn clicks
export function handleButtonClicks() {
    taskContainer.addEventListener("click", (event) => {
        const btnContainer = event.target.closest(".btn-container");
        if (!btnContainer) return;

        const taskId = parseInt(btnContainer.getAttribute("data-task-id"));

        if (event.target.classList.contains("delete-btn")) {
            handleDeleteTask(taskId);
        } else if (event.target.classList.contains("edit-btn")) {
            handleEditTask(taskId);
        }
    });
}

// Delete Btn
function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter(task => {
        // Compare card id with deleteBtn id
        if (task.id === taskId) {
            availableIds.push(taskId);
            return false;
        }
        return true; //keep
    });

    updateTasks(updatedTasks);

    // Remove task from DOM
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.remove();
    }

    console.log(`Task with ID ${taskId} deleted.`);
    console.log("Remaining tasks:", updatedTasks);
    console.log("Available IDs:", availableIds);
}

// Edit Btn
function handleEditTask(taskId) {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (!taskToEdit) {
        console.error("Task cannot be found!");
        return;
    }
    console.log(`Editing Task with ID ${taskId}:`, taskToEdit);

    const taskModal = document.getElementById("add-task-modal");
    taskModal.showModal();
    
    // Populate modal fields with current form data
    document.getElementById("task-title").value = taskToEdit.title;
    document.getElementById("task-desc").value = taskToEdit.desc;
    document.getElementById("task-priority").value = taskToEdit.priority;
    document.getElementById("task-due-date").value = taskToEdit.dueDate.toISOString().split("T")[0];
    document.getElementById("task-project").value = taskToEdit.project;

    // Replace with button clone without any event listeners
    const saveTaskBtn = document.getElementById("submit-task");
    saveTaskBtn.replaceWith(saveTaskBtn.cloneNode(true));

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();

        // Update task data
        taskToEdit.title = document.getElementById("task-title").value;
        taskToEdit.desc = document.getElementById("task-desc").value;
        taskToEdit.priority = document.getElementById("task-priority").value;
        taskToEdit.dueDate = new Date(document.getElementById("task-due-date").value);
        taskToEdit.project = document.getElementById("task-project").value;

        updateTaskUI(taskId, taskToEdit);

        taskModal.close();
        console.log(`Task with ID ${taskId} updated successfully!`);
    });
}

// Helper function for Edit btn
function updateTaskUI(taskId, taskToEdit) {
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.querySelector(".card-title").textContent = taskToEdit.title;
        taskElement.querySelector(".card-desc").textContent = taskToEdit.desc;
        taskElement.querySelector(".card-priority").textContent = taskToEdit.priority;
        taskElement.querySelector(".card-duedate").textContent = "Due Date: " + taskToEdit.dueDate.toLocaleDateString();
        taskElement.querySelector(".card-project").textContent = taskToEdit.project;
    }
}

// Complete btn
const completeBtn = document.querySelector(".complete-btn");

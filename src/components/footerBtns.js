import { tasks, availableIds, updateTasks } from "./submitTask";
import { applyFallbackTitleIfEmpty } from "./taskCard";

export const completedTasks = [];
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
        } else if (event.target.classList.contains("complete-btn")) {
            handleCompletedTask(taskId);
        }
    });
}

function handleTaskUpdate(taskId, actionFn) {
    const updatedTasks = tasks.filter(task => {
        // Compare card id with btn id
        if (task.id === taskId) {
            if (actionFn) actionFn(task); // Custom action
            availableIds.push(taskId);
            return false;
        }
        return true; // Keep
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

// Delete Btn
function handleDeleteTask(taskId) {
    // Remove from completedTasks if it exists there
    const updatedCompletedTasks = completedTasks.filter(task => task.id !== taskId);
    completedTasks.length = 0;
    completedTasks.push(...updatedCompletedTasks);

    console.log("Updated completed tasks after deletion:", completedTasks);
    handleTaskUpdate(taskId, null);
}

// Complete btn
function handleCompletedTask(taskId) {
    const isAlreadyCompleted = completedTasks.some(task => task.id === taskId);

    if (!isAlreadyCompleted) {
        handleTaskUpdate(taskId, (task) => {
            completedTasks.push(task);
            console.log("Completed tasks:", completedTasks);
        });
    }
    
}

// Edit Btn
function handleEditTask(taskId) {
    const taskForm = document.getElementById("add-task-form");
    let taskToEdit = tasks.find(task => task.id === taskId);
    if (!taskToEdit) {
        taskToEdit = completedTasks.find(task => task.id === taskId);
    }
    
    if (!taskToEdit) {
        console.error("Task cannot be found!");
        return;
    }
    console.log(`Editing Task with ID ${taskId}:`, taskToEdit);

    const taskModal = document.getElementById("add-task-modal");
    taskModal.showModal();
    
    // Populate modal fields with current form data
    populateTaskModal(taskToEdit);
    attachSaveListener(taskId, taskToEdit, taskModal, taskForm);
}

// Helper functions for Edit btn
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

function populateTaskModal(task) {
    document.getElementById("task-title").value = task.title;
    document.getElementById("task-desc").value = task.desc;
    document.getElementById("task-priority").value = task.priority;
    document.getElementById("task-due-date").value = task.dueDate.toISOString().split("T")[0];
    document.getElementById("task-project").value = task.project;
}

function attachSaveListener(taskId, task, modal, form) {
    const saveTaskBtn = document.getElementById("submit-task");
    saveTaskBtn.textContent = "Edit Task";
    saveTaskBtn.replaceWith(saveTaskBtn.cloneNode(true));

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();

        // Update task data
        task.title = document.getElementById("task-title").value;
        task.desc = document.getElementById("task-desc").value;
        task.priority = document.getElementById("task-priority").value;
        task.dueDate = new Date(document.getElementById("task-due-date").value);
        task.project = document.getElementById("task-project").value;

        updateTaskUI(taskId, task);

        modal.close();
        form.reset();
        console.log(`Task with ID ${taskId} updated successfully!`);
    });
}
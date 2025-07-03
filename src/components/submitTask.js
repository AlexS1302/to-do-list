import { Task, createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";
import { addItemToLocalStorage, getItemFromLocalStorage } from "./localStorage";
import { parseJSON } from "date-fns";
import { completedTasks } from "./footerBtns";
import { renderProjectsFromLocalStorage } from "./projects";

let tasks = [];
let availableIds = [];

function renderLocalStorageItems() {
    let retrievedTasks = [];

    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);

        if (key === "projects") continue;

        const item = getItemFromLocalStorage(key)

        if (item) {
            const task = JSON.parse(item);
            Object.setPrototypeOf(task, Task.prototype);

            // Convert to date object because now it's just a string
            task.dueDate = parseJSON(task.dueDate); 

            // Check if the task is marked as completed
            if (task.completed === true) {
                const isTaskCompleted = completedTasks.some(completedTask => completedTask.id === task.id);
                
                if (!isTaskCompleted) {
                    completedTasks.push(task); // Add completed task
                }

            } else {
                retrievedTasks.push(task);
                // Add retrieved tasks to main tasks array
                tasks.push(task);
            }

        }
    }
    retrievedTasks.forEach((task) => cardConstruction(task))
}

renderLocalStorageItems();
renderProjectsFromLocalStorage();

export function submitTaskHandler() {
    const taskModal = document.getElementById("add-task-modal");
    const taskForm = document.getElementById("add-task-form");

    const newSaveTaskBtn = document.getElementById("submit-task");
    newSaveTaskBtn.textContent = "Add Task";
    newSaveTaskBtn.replaceWith(newSaveTaskBtn.cloneNode(true));

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();

        if (taskForm.checkValidity()) {
            // Generate unique ids
            let newId;
            if (availableIds.length > 0) {
                newId = availableIds.shift();
                console.log("Leftover ID taken:", newId);
                console.log("Leftover IDs: ", availableIds);
            } else {
                newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
                console.log("New ID generated:", newId);
            }

            // Generate user added tasks
            const task = createTask(); //no id
            task.id = newId;
            console.log("Task created:", task);

            tasks.push(task);

            cardConstruction(task);
            addItemToLocalStorage(`Task number: ${task.id}`, JSON.stringify(task));

            taskModal.close();
            taskForm.reset();
        } else {
            taskForm.reportValidity();
        }
    });
}

// Function to update tasks id in footerBtns.js bcs imports are read-only
export function updateTasks(newTasks) {
    tasks = newTasks;
}

// Live reference to tasks array
export function getTasks() {
    return tasks; 
}

export {tasks, availableIds};
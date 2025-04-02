import { Task, createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";
import { addItemToLocalStorage, getItemFromLocalStorage } from "./localStorage";
import { parseJSON } from "date-fns";
import { completedTasks } from "./footerBtns";

let tasks = [
    new Task(
        "Plan Dinner",
        "Decide between pasta or stir-fry. Check if there's enough basil for the pesto.",
        new Date("2025-04-25"),
        "Medium",
        "Meals",
        1
    ),
    new Task(
        "Evening Walk",
        "Take a stroll in the park. Listen to that new audiobook.",
        new Date("2025-03-30"),
        "Low",
        "General",
        2
    )
];

let availableIds = [];

function renderLocalStorageItems() {
    let retrievedTasks = [];

    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const item = getItemFromLocalStorage(key)

        if (item) {
            const task = JSON.parse(item);
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
                console.log(retrievedTasks);
                // Add retrieved tasks to main tasks array
                tasks.push(task);
            }

        }
    }
    
    retrievedTasks.forEach((task) => cardConstruction(task))
}

tasks.forEach((task) => cardConstruction(task)); // Render placeholders
renderLocalStorageItems();

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
            } else {
                newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
            }

            console.log("Remaining Id's: ", availableIds);

            // Generate user added tasks
            const task = createTask(); //no id
            task.id = newId;
            console.log("Task created:", task);

            tasks.push(task);
            console.log("All tasks:", tasks);

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
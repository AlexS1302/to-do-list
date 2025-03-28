import { Task, createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";

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

tasks.forEach((task) => cardConstruction(task)); // Render placeholders

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
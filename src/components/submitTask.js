import { Task, createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";

let tasks = [
    new Task(
        "Placeholder Task Title",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        new Date("2025-03-22"),
        "Medium",
        "Placeholder Project",
        1
    ),
    new Task(
        "Placeholder Task",
        "This is a placeholder",
        new Date("2025-03-22"),
        "Low",
        "Placeholder Project",
        2
    )
];

let availableIds = [];

tasks.forEach((task) => cardConstruction(task)); // Render placeholders

export function submitTaskHandler() {
    const taskModal = document.getElementById("add-task-modal");
    const taskForm = document.getElementById("add-task-form");

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

// Get tasks array
export function getTask() {
    return tasks;
}

export {tasks, availableIds};
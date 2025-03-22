import { createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";

let tasks = [];

export function submitTaskHandler() {
    const taskModal = document.getElementById("add-task-modal");

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();
        const task = createTask();
        console.log("Task created:", task);

        tasks.push(task);
        console.log("All tasks:", tasks);

        cardConstruction(task);

        taskModal.close();
        document.getElementById("add-task-form").reset();
    });
    
}

export function getTask() {
    return tasks;
}

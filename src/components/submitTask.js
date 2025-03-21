import { createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";

let task;

export function submitTaskHandler() {
    const taskModal = document.getElementById("add-task-modal");

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();
        task = createTask();
        console.log("Task created:", task);

        cardConstruction(task);

        taskModal.close();
        document.getElementById("add-task-form").reset();
    });
    
}

export function getTask() {
    return task;
}

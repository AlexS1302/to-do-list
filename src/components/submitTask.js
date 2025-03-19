import { createTask } from "./taskCreator";

let task;

export function submitTaskHandler() {
    const taskModal = document.getElementById("add-task-modal");

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();
        task = createTask();
        console.log("Task created:", task);

        taskModal.close();
    });
    
}



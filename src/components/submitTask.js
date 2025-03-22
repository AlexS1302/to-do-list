import { Task, createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";

let tasks = [
    new Task(
        "Placeholder Task Title",
        "This is a placeholder description",
        new Date("2025-03-22"),
        "Medium",
        "Placeholder Project"
    ),
    // new Task(
    //     "Placeholder Task",
    //     "This is a placeholder",
    //     new Date("2025-03-22"),
    //     "Medium",
    //     "Placeholder Project"
    // )
];

tasks.forEach((task) => cardConstruction(task)); // render placeholders

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

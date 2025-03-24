import { Task, createTask } from "./taskCreator";
import { cardConstruction } from "./taskCard";

let tasks = [
    new Task(
        "Placeholder Task Title",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        new Date("2025-03-22"),
        "Medium",
        "Placeholder Project"
    ),
    new Task(
        "Placeholder Task",
        "This is a placeholder",
        new Date("2025-03-22"),
        "Medium",
        "Placeholder Project"
    )
];

tasks.forEach((task) => cardConstruction(task)); // render placeholders

export function submitTaskHandler() {
    const taskModal = document.getElementById("add-task-modal");
    const taskForm = document.getElementById("add-task-form");

    document.getElementById("submit-task").addEventListener("click", (event) => {
        event.preventDefault();

        if (taskForm.checkValidity()) {
            const task = createTask();
            console.log("Task created:", task);

            tasks.push(task);
            console.log("All tasks:", tasks);

            cardConstruction(task);

            taskModal.close();
            document.getElementById("add-task-form").reset();
        } else {
            taskForm.reportValidity();
        }
    });
}

export function getTask() {
    return tasks;
}


// To be used in submitTaskHandler() in submitTask.js
export function cardConstruction(task) {
    // Verification
    if (!task) {
        console.error("No task available to display");
    }

    // Make card visible
    const cardTemplate = document.getElementById("card-template");
    cardTemplate.style.display = "block";

    let cardTitle = document.querySelector(".card-title");
    cardTitle.textContent = task.title;

    let cardDesc = document.querySelector(".card-desc");
    cardDesc.textContent = task.desc;

    let cardPriority = document.querySelector(".card-priority");
    cardPriority.textContent = task.priority;

    let cardDueDate = document.querySelector(".card-duedate");
    let dueDate = task.dueDate;
    cardDueDate.textContent = dueDate.toLocaleDateString();

    let cardProject = document.querySelector(".card-project");
    cardProject.textContent = task.project;

    console.log("Card template updated successfully!");
}




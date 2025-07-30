import { submitTaskHandler } from "./submitTask";

const closeModalBtns = document.querySelectorAll(".close-modal");

// Task Modal
export function displayTaskModal() {
    const taskForm = document.getElementById("add-task-form");
    const taskModal = document.getElementById("add-task-modal");
    const addTaskBtn = document.getElementById("add-task-btn");

    addTaskBtn.addEventListener("click", () => {
        submitTaskHandler(); // Remove event listeners when opening modal
        taskForm.reset();
        taskModal.showModal();
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            taskModal.close();
            taskForm.reset();
        });
    });
}

// Project Modal
export function displayProjectModal() {
    const projectForm = document.getElementById("add-project-form");
    const projectModal = document.getElementById("add-project-modal");
    const addProjectBtn = document.getElementById("add-project-btn");

    addProjectBtn.addEventListener("click", () => {
        projectForm.reset();

        const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
        const projectInput = document.getElementById("project-title");
        const submitButton = document.getElementById("submit-project")

        projectModal.showModal();

        if (savedProjects.length >= 11) {
            projectInput.disabled = true;
            projectInput.placeholder = "Project Limit Reached";
            submitButton.disabled = true;
        } else {
            projectInput.disabled = false;
            projectInput.placeholder = "Enter Project Title";
            submitButton.disabled = false;
        }
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            projectModal.close();
            projectForm.reset();
        });
    });

}

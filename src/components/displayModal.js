
const closeModalBtns = document.querySelectorAll(".close-modal");

// Task Modal
export function displayTaskModal() {
    const taskForm = document.getElementById("add-task-form");
    const taskModal = document.getElementById("add-task-modal");
    const addTaskBtn = document.getElementById("add-task-btn");
    const closeModalBtn = document.querySelector(".close-modal");

    addTaskBtn.addEventListener("click", () => {
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
        projectModal.showModal();
    });

    closeModalBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            projectModal.close();
            projectForm.reset();
        });
    });

}

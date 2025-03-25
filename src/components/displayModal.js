
// Modal
export function displayModal() {
    const taskForm = document.getElementById("add-task-form");
    const taskModal = document.getElementById("add-task-modal");
    const addTaskBtn = document.getElementById("add-task-btn");
    const closeModalBtn = document.getElementById("close-modal");

    addTaskBtn.addEventListener("click", () => {
        taskForm.reset();
        taskModal.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
        taskModal.close();
        taskForm.reset();
    });
}

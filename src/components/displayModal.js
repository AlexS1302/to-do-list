
// Modal
export function displayModal() {
    const taskModal = document.getElementById("add-task-modal");
    const addTaskBtn = document.getElementById("add-task-btn");
    const closeModalBtn = document.getElementById("close-modal");

    addTaskBtn.addEventListener("click", () => {
        taskModal.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
        taskModal.close();
    });
}

import { tasks, availableIds, updateTasks } from "./submitTask";

// Delete Btn
export function handleDeleteBtnClick() {
    const taskContainer = document.getElementById("main");

    taskContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            //Get id from deletebtn
            const taskId = parseInt(event.target.getAttribute("data-task-id"));

            const updatedTasks = tasks.filter(task => {
                // Compare card id with deleteBtn id
                if (task.id === taskId) {
                    availableIds.push(taskId);
                    return false;
                }
                return true; //keep
            });

            updateTasks(updatedTasks);

            // Remove task from DOM
            const taskElement = document.getElementById(`task-${taskId}`);
            if (taskElement) {
                taskElement.remove();
            }

            console.log(`Task with ID ${taskId} deleted.`);
            console.log("Remaining tasks:", updatedTasks);
            console.log("Available IDs:", availableIds);
        }

    });
}


// Others
const completeBtn = document.querySelector(".complete-btn");
const editBtn = document.querySelector(".edit-btn");
import { tasks, availableIds, updateTasks } from "./submitTask";

const taskContainer = document.getElementById("main");

// Function for handling all btn clicks
export function handleButtonClicks() {
    taskContainer.addEventListener("click", (event) => {
        const btnContainer = event.target.closest(".btn-container");
        if (!btnContainer) return;

        const taskId = parseInt(btnContainer.getAttribute("data-task-id"));

        if (event.target.classList.contains("delete-btn")) {
            handleDeleteTask(taskId);
        } else if (event.target.classList.contains("delete-btn")) {
            handleEditTask(taskId);
        }
    });
}


// Delete Btn
function handleDeleteTask(taskId) {
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

// Edit Btn
function handleEditTask(taskId) {
    
}




// Others
const completeBtn = document.querySelector(".complete-btn");

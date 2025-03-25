import { getTasks } from "./submitTask";
import { isThisWeek, isToday } from "date-fns";
import { cardConstruction } from "./taskCard";

const tasks = getTasks();
const taskContainer = document.querySelector("#main");

export function handleNavClicks() {
    document.querySelector("ul").addEventListener("click", (event) => {
        const clickedText = event.target.textContent;

        switch (clickedText) {
            case "All":
                console.log("All tasks selected");
                showAllTasks();
                break;
            case "Today":
                console.log("Today's tasks selected");
                showTodayTasks();
                break;
            case "This Week":
                console.log("This week's tasks selected");
                showThisWeekTasks();
                break;
            case "This Month":
                console.log("This month's tasks selected");
                break;
            case "Overdue":
                console.log("Overdue tasks selected");
                break;
            case "Completed":
                console.log("Completed tasks selected");
                break;
            default:
                console.log("Unknown action");
                break;
        }
    });
}


function showAllTasks() {
    taskContainer.innerHTML = "";

    tasks.forEach((task) => {
        cardConstruction(task);
    });
}

function showTodayTasks() {
    taskContainer.innerHTML = "";

    const filteredTasks = tasks.filter((task) => isToday(task.dueDate));
    console.log(filteredTasks);
    
    filteredTasks.forEach((filteredTask) => {
        cardConstruction(filteredTask);
    });
}

function showThisWeekTasks() {
    taskContainer.innerHTML = "";

    const filteredTasks = tasks.filter((task) => isThisWeek(task.dueDate));
    console.log(filteredTasks);
    
    filteredTasks.forEach((filteredTask) => {
        cardConstruction(filteredTask);
    });
}

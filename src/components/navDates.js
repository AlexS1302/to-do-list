import { isThisMonth, isThisWeek, isToday } from "date-fns";
import { cardConstruction } from "./taskCard";
import { completedTasks } from "./footerBtns";
import { tasks } from "./submitTask";

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
                showThisMonthTasks();
                break;
            case "Overdue":
                console.log("Overdue tasks selected");
                showOverdueTasks();
                break;
            case "Completed":
                showCompletedTasks();
                console.log("Completed tasks selected");
                break;
        }
    });
}

export function showAllTasks() {
    taskContainer.innerHTML = "";

    tasks.forEach((task) => {
        cardConstruction(task);
    });
}

function showTasks(dateCheckFn) {
    taskContainer.innerHTML = "";

    const filteredTasks = tasks.filter((task) => dateCheckFn(task.dueDate));
    
    filteredTasks.forEach((filteredTask) => {
        cardConstruction(filteredTask);
    });
}

function showTodayTasks() {
    showTasks(isToday);
}

function showThisWeekTasks() {
    showTasks(isThisWeek);
}

function showThisMonthTasks() {
    showTasks(isThisMonth);
}

function isOverdue(dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight so only date is being compared
    const taskDate = new Date(dueDate); // The time is set to midnight (default)
    return taskDate < today;
}

function showOverdueTasks() {
    showTasks(isOverdue);
}

function showCompletedTasks() {
    taskContainer.innerHTML = "";
    completedTasks.forEach((task) => {
        cardConstruction(task);
    })
}

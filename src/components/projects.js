import deleteIconSrc from '../icons/delete.svg'
import { tasks } from './submitTask';
import { cardConstruction } from './taskCard';
import { showAllTasks } from './navDates';
import { getItemFromLocalStorage } from './localStorage';

export let currentProjects = [];
export let matches = [];

export function updateProjectCards(newCards) {
    matches = newCards;
}

export function submitProjectHandler() {
    const submitProject = document.getElementById("submit-project");
    const projectList = document.getElementById("project-list");
    const projectForm = document.getElementById("add-project-form")
    const projectModal = document.getElementById("add-project-modal");
    const projectSelect = document.getElementById("task-project");

    submitProject.addEventListener("click", (event) => {
        event.preventDefault();

        if(projectForm.checkValidity()) {
            const projectTitle = document.getElementById("project-title").value;
            const projectTitles = projectTitle.trim().split(",");

            projectTitles.forEach((title) => {
                // For sidebar
                const listItem = document.createElement("li")
                const projectItem = document.createElement("a");

                projectItem.textContent = title;
                projectItem.setAttribute("href", "#");

                const deleteIcon = document.createElement("img");
                deleteIcon.classList.add("delete-project")
                deleteIcon.src = deleteIconSrc;
                deleteIcon.alt = "Delete Icon"

                projectItem.appendChild(deleteIcon);
                listItem.appendChild(projectItem);
                projectList.appendChild(listItem);

                // For options in add task modal
                const projectOption = document.createElement("option");
                projectOption.setAttribute("value", title);
                projectOption.textContent = title;
                projectSelect.appendChild(projectOption);
                
                currentProjects.push(projectOption.value);

                let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
                savedProjects.push(title);
                localStorage.setItem("projects", JSON.stringify(savedProjects));
            });

            projectModal.close();
            projectSelect.disabled = false;

        } else {
            projectForm.reportValidity();
        }
    });  
}

export function getTasksByProject() {
    const taskContainer = document.querySelector("#main");
    const projectSection = document.getElementById("projects");

    projectSection.addEventListener("click", (event) => {

        if (currentProjects.length === 0) {
            console.log("No projects available");
            return;
        }

        const projectItem = event.target.closest("a");
        if (projectItem) {
            matches = tasks.filter((task) => task.project === projectItem.textContent.trim());

            taskContainer.innerHTML = "";
            matches.forEach((match) => {
                cardConstruction(match);
            });
            
            return matches;
        } else {
            console.log("No match found!");
        }
    });
}

export function deleteProject() {
    const projectSection = document.getElementById("projects");
    const projectSelect = document.getElementById("task-project");

    if (!projectSection) return;

    projectSection.addEventListener("click", (event) => {
        const deleteIcon = event.target.closest(".delete-project");
        if (!deleteIcon) return;

        const projectItem = deleteIcon.closest("a");
        if (!projectItem) return;

        const listItem = projectItem.closest("li");
        if (!listItem) return;

        const projectTitle = projectItem.textContent.trim();
        const index = currentProjects.indexOf(projectTitle);

        if (index !== -1) {
            // Remove from array
            currentProjects.splice(index, 1); 

            // Remove from localStorage
            let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
            savedProjects = savedProjects.filter((project) => project !== projectTitle);
            localStorage.setItem("projects", JSON.stringify(savedProjects));

            projectItem.remove(); // Remove from DOM
            listItem.remove(); // Remove redundant li element 

            Array.from(projectSelect.options).forEach((option) => {
                if (option.value === projectItem.textContent.trim()) {
                    option.remove();
                }
            });

            // Update tasks with the changed project property in tasks array
            tasks.forEach((task) => {
                if (task.project === projectItem.textContent.trim()) {
                    task.project = "No project provided";
                }
            })

            // Update tasks with the changed project property in localStorage
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const item = localStorage.getItem(key);

                if (item) {
                    let task = JSON.parse(item);
                    if (task.project === projectTitle) {
                        task.project = "No project provided";
                        localStorage.setItem(key, JSON.stringify(task));
                        console.log(`Task "${task.id}" updated with fallback project property.`);
                    }
                }
            }

            if (currentProjects.length === 0) {
                projectSelect.disabled = true;
            }
            
            showAllTasks();

        } else {
            console.log("Project not found in array.");
        }
        
    });
}       

export function renderProjectsFromLocalStorage() {
    const projectList = document.getElementById("project-list");
    const projectSelect = document.getElementById("task-project");

    // Clear any existing projects to avoid duplicates during re-render
    projectList.innerHTML = "";
    projectSelect.innerHTML = "";

    const savedProjects = JSON.parse(getItemFromLocalStorage("projects")) || [];

    currentProjects = [...savedProjects];

    savedProjects.forEach((title) => {
        const listItem = document.createElement("li");
        const projectItem = document.createElement("a");
        projectItem.textContent = title;
        projectItem.setAttribute("href", "#");

        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("delete-project");
        deleteIcon.src = deleteIconSrc;
        deleteIcon.alt = "Delete Icon";

        projectItem.appendChild(deleteIcon);
        listItem.appendChild(projectItem);
        projectList.appendChild(listItem);

        const projectOption = document.createElement("option");
        projectOption.setAttribute("value", title);
        projectOption.textContent = title;
        projectSelect.appendChild(projectOption);
    });

    projectSelect.disabled = savedProjects.length === 0;

}
import deleteIconSrc from '../icons/delete.svg'
import { tasks } from './submitTask';
import { cardConstruction } from './taskCard';
import { showAllTasks } from './navDates';

export const currentProjects = []; // For project delete btn
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
                console.log("Current projects:", currentProjects);
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
        const projectItem = event.target.closest("a");
        if (projectItem) {
            matches = tasks.filter((task) => task.project === projectItem.textContent);
            console.log(`Tasks with "${projectItem.textContent}" project found: `, matches);

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
            currentProjects.splice(index, 1); // Remove from array
            projectItem.remove(); // Remove from DOM
            listItem.remove(); // Remove redundant li element 
            

            console.log(`Project "${projectTitle}" removed successfully!`);

            Array.from(projectSelect.options).forEach((option) => {
                if (option.value === projectItem.textContent.trim()) {
                    option.remove();
                }
            });

            tasks.forEach((task) => {
                if (task.project === projectItem.textContent.trim()) {
                    task.project = "No project provided";
                }
            });

            if (currentProjects.length === 0) {
                projectSelect.disabled = true;
            }
            
            showAllTasks();

        } else {
            console.log("Project not found in array.");
        }
        
    });
}       


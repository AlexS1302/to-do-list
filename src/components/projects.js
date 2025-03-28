import deleteIconSrc from '../icons/delete.svg'
import { tasks } from './submitTask';
import { cardConstruction } from './taskCard';

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
                projectItem.textContent = projectTitle;
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


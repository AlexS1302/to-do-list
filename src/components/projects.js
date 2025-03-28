import deleteIconSrc from '../icons/delete.svg'
import { getTasks } from './submitTask';
import { cardConstruction } from './taskCard';

let tasks = getTasks(); //local copy
let options = [];

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
                
                options.push(projectOption.value);
                console.log("Current projects:", options);
            });

            projectModal.close();

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
            const matches = tasks.filter((task) => task.project === projectItem.textContent);
            console.log("Project(s) found: ", matches);

            taskContainer.innerHTML = "";
            matches.forEach((match) => {
                cardConstruction(match);
            });

        } else {
            console.log("No match found!");
        }
    });
}


import deleteIconSrc from '../icons/delete.svg'

export function submitProjectHandler() {
    const submitProject = document.getElementById("submit-project");
    const projectList = document.getElementById("project-list");
    const projectForm = document.getElementById("add-project-form")
    const projectModal = document.getElementById("add-project-modal");

    submitProject.addEventListener("click", (event) => {
        event.preventDefault();

        if(projectForm.checkValidity()) {
            const projectTitle = document.getElementById("project-title").value;
            const projectTitles = projectTitle.trim().split(",");

            projectTitles.forEach((title) => {
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
            });

            projectModal.close();

        } else {
            projectForm.reportValidity();
        }
        
    });  
}


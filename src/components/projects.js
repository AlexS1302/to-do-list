
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
                const projectItem = document.createElement("li");
                projectItem.textContent = title;
                projectItem.textContent = projectTitle;
                projectList.appendChild(projectItem);
            });

            projectModal.close();

        } else {
            projectForm.reportValidity();
        }
        
    });  
}



export function cardConstruction(task) {
    if (!task) {
        console.error("No task available to display");
        return;
    }

    // Generate card
    const taskContainer = document.getElementById("main");

    const card = document.createElement("div");
    card.setAttribute("id", "card");
    taskContainer.appendChild(card);

    // Card header
    const cardHeader = document.createElement("div");
    cardHeader.setAttribute("id", "card-header");
    card.appendChild(cardHeader);

    // Card header children
    const cardProject = document.createElement("h4");
    cardProject.classList.add("card-project");
    cardProject.textContent = task.project;

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = task.title;

    const cardDesc = document.createElement("p");
    cardDesc.classList.add("card-desc");
    cardDesc.textContent = task.desc;

    cardHeader.appendChild(cardProject);
    cardHeader.appendChild(cardTitle);
    cardHeader.appendChild(cardDesc);

    // Card body
    const cardBody = document.createElement("div");
    cardBody.setAttribute("id", "card-body");
    card.appendChild(cardBody);

    //Card body children
    const cardNotesHeader = document.createElement("h4");
    cardNotesHeader.classList.add("card-notes-header");
    cardNotesHeader.textContent = "Notes:"

    const cardNotes = document.createElement("p");
    cardNotes.classList.add("card-notes");
    cardNotes.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

    const cardPriority = document.createElement("div");
    cardPriority.classList.add("card-priority");
    cardPriority.textContent = task.priority;

    cardBody.appendChild(cardNotesHeader);
    cardBody.appendChild(cardNotes);
    cardBody.appendChild(cardPriority);

    // Card footer
    const cardFooter = document.createElement("div");
    cardFooter.setAttribute("id", "card-footer");
    card.appendChild(cardFooter)

    // Line
    const line = document.createElement("hr");
    line.classList.add("line");
    cardFooter.appendChild(line);

    //Card footer children
    const cardDueDate = document.createElement("div");
    cardDueDate.classList.add("card-duedate");
    let dueDate = task.dueDate;
    cardDueDate.textContent = "Due Date: " + dueDate.toLocaleDateString();
    
    cardFooter.appendChild(cardDueDate);
    
    //Buttons
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.textContent = "Complete";

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";

    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(completeBtn);
    btnContainer.appendChild(editBtn);
    cardFooter.appendChild(btnContainer);

    console.log("Card template updated successfully!");
}




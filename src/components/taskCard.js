
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
    const cardNotesHeading = document.createElement("h4");
    cardNotesHeading.classList.add("card-notes-heading");

    const cardNotes = document.createElement("div");
    cardNotes.classList.add("card-notes");

    const cardPriority = document.createElement("div");
    cardPriority.classList.add("card-priority");
    cardPriority.textContent = task.priority;

    cardBody.appendChild(cardNotesHeading);
    cardBody.appendChild(cardNotes);
    cardBody.appendChild(cardPriority);

    // Line
    const line = document.createElement("hr");
    line.classList.add("line");
    card.appendChild(line);

    // Card footer
    const cardFooter = document.createElement("div");
    cardFooter.setAttribute("id", "card-footer");
    card.appendChild(cardFooter)

    //Card footer children
    const cardDueDate = document.createElement("div");
    cardDueDate.classList.add("card-duedate");
    let dueDate = task.dueDate;
    cardDueDate.textContent = dueDate.toLocaleDateString();
    
    cardFooter.appendChild(cardDueDate);
    
    //Buttons
    

    

    console.log("Card template updated successfully!");
}




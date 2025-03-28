
export function cardConstruction(task) {
    if (!task) {
        console.error("No task available to display");
        return;
    }

    // Generate card
    const taskContainer = document.getElementById("main");

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("id", `task-${task.id}`);
    taskContainer.appendChild(card);

    // Card header
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);

    // Card header children
    const cardProject = document.createElement("h4");
    cardProject.classList.add("card-project");
    cardProject.textContent = task.project;

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = task.title;

    cardHeader.appendChild(cardProject);
    cardHeader.appendChild(cardTitle);

    applyFallbackTitleIfEmpty('.card-project', 'No project provided');
    // Card body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    //Card body children
    const cardDescHeader = document.createElement("h3");
    cardDescHeader.classList.add("card-desc-header");
    cardDescHeader.textContent = "Description: ";
    cardBody.appendChild(cardDescHeader);

    const cardDesc = document.createElement("p");
    cardDesc.classList.add("card-desc");
    cardDesc.textContent = task.desc;
    cardBody.appendChild(cardDesc);

    applyFallbackTitleIfEmpty('.card-desc', 'No description provided.');
    
    // Card footer
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    card.appendChild(cardFooter)

    // Line
    const line = document.createElement("hr");
    line.classList.add("line");
    cardFooter.appendChild(line);

    //Card footer children
    const dateAndPriority = document.createElement("div");
    dateAndPriority.classList.add("date-and-priority");
    cardFooter.appendChild(dateAndPriority);

    const cardDueDate = document.createElement("div");
    cardDueDate.classList.add("card-duedate");
    let dueDate = task.dueDate;
    cardDueDate.textContent = "Due Date: " + dueDate.toLocaleDateString();
    
    const cardPriority = document.createElement("div");
    cardPriority.classList.add("card-priority");
    cardPriority.textContent = task.priority;
    
    dateAndPriority.appendChild(cardDueDate);
    dateAndPriority.appendChild(cardPriority);

    //Buttons
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");
    btnContainer.setAttribute("data-task-id", task.id);
    
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

    console.log("Card created successfully!");
    applyFallbackTitleIfEmpty();
}


function applyFallbackTitleIfEmpty(selector, fallbackText, fallbackClass = "") {
    const elements = document.querySelectorAll(selector);
    elements.forEach((e) => {
        if (!e.textContent.trim()) {
            e.textContent = fallbackText;
            if (fallbackClass) {
                e.classList.add(fallbackClass);   
            }
            console.log(`Fallback applied to element matching: ${selector}`);
        }
    });
}


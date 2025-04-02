class Task {
    constructor(title, desc, dueDate, priority, project, id = null, completed = false) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.id = id;
        this.completed = completed;
    }
}

function createTask() {
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;
    const dueDate = new Date(document.getElementById("task-due-date").value);
    const priority = document.getElementById("task-priority").value;
    const taskProject = document.getElementById("task-project").value;

    return new Task(title, desc, dueDate, priority, taskProject);
}

export {Task, createTask}

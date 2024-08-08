function renderDivTodo(task) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div class="task-cards">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivInprogress(task) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div class="task-cards">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivDone(task) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div class="task-cards">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivawaitingfeedback(task) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div class="task-cards">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}
function renderDivTodo(task, key) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div draggable="true" ondragstart="startDragging('${key}')" class="task-cards no-copy">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivInprogress(task, key) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div draggable="true" ondragstart="startDragging('${key}')" class="task-cards no-copy">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivDone(task, key) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div draggable="true" ondragstart="startDragging('${key}')" class="task-cards no-copy">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivawaitingfeedback(task, key) {
    if (task.category === "Technical Task") {
        typHTML = `<span class="technical-green">${task.category}</span>`;
    }
    if (task.category === "User Story") {
        typHTML = `<span class="user-story-blue">${task.category}</span>`;
    }
    return /*html*/`
    <div draggable="true" ondragstart="startDragging('${key}')" class="task-cards no-copy">
        ${typHTML}
        <div class="task-title">${task.task}</div>
        <div class="task-description">${task.description}</div>
        <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}
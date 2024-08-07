function renderDivTodo(task) {
    return /*html*/`
    <div class="task-cards">
        <div class="task-title">${task.task}</div>
    <div class="task-description">${task.description}</div>
    <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivInprogress(task) {
    return /*html*/`
    <div class="task-cards">
        <div class="task-title">${task.task}</div>
    <div class="task-description">${task.description}</div>
    <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivDone(task) {
    return /*html*/`
    <div class="task-cards">
        <div class="task-title">${task.task}</div>
    <div class="task-description">${task.description}</div>
    <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}

function renderDivawaitingfeedback(task) {
    return /*html*/`
    <div class="task-cards">
        <div class="task-title">${task.task}</div>
    <div class="task-description">${task.description}</div>
    <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
    </div>
    `
}
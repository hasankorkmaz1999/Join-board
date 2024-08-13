function addSingleTaskForm(taskData, key) {
   
    return /*html*/`
        <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
        <div  onclick="doNotClose(event)" class="single-task-content">
            <p class="taskCategoryHTML">${taskData.taskCategoryHTML}</p>
            <h2 class="taskTitleOverlay">${taskData.taskTitle}</h2>
            <p>${taskData.taskDescription}</p>
            <p>Due date: <span class="dueDate">${taskData.dueDate}</span></p>
            <p class="">Priority: <span class="taskPriority"> ${taskData.taskPriority} ${taskData.taskPriorityIcon} </span></p>
            <p class="AssignedTitle">Assigned To:</p>

            <div class="assignedTo-container">
                ${taskData.assignedToHTML} 
            </div>


            <p class="Subtasks">Subtasks</p>


            <div class="subtasks-container">
                ${taskData.subtasksHTML} 
            </div>


            <div class="editanddeletetask">
                <div onclick='deleteTask("${key}")' class="deletebuttontask">Delete</div>
                <div onclick='editTask("${key}")' class="editbuttontask">Edit</div>
            </div>

            <div id="edit-task-form-container"></div>
        </div>
    `;


}


function editTask(key) {
    // Holen der Task-Daten, wenn nötig
    const task = tasks[key];

    // Generiere das HTML für das Edit-Formular
    const editFormHTML = `
        <div  onclick="doNotClose(event)" class="edit-task-form">
            <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
          
            <label class="editTaskTitle" for="editTaskTitle">Title</label>
            <input class="editTaskTitle" type="text" id="editTaskTitle" value="${task.task}">

            <label for="editTaskDescription">Description:</label>
            <textarea id="editTaskDescription">${task.description}</textarea>

            <label for="editDueDate">Due Date:</label>
            <input type="date" id="editDueDate" value="${task.duedate}">

            <label for="editTaskPriority">Priority:</label>
            <select id="editTaskPriority">
                <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
            </select>

            <div class="edit-form-buttons">
                <button onclick='saveTaskEdits("${key}")'>Save</button>
                <button onclick='cancelTaskEdits("${key}")'>Cancel</button>
            </div>
        </div>
    `;

    // Ersetze den Inhalt des Overlays mit dem Edit-Formular
    document.querySelector('.single-task-content').outerHTML = editFormHTML;
}

function saveTaskEdits(key) {
    // Beispiel: Speichern der bearbeiteten Daten
    const editedTask = {
        task: document.getElementById('editTaskTitle').value,
        description: document.getElementById('editTaskDescription').value,
        duedate: document.getElementById('editDueDate').value,
        priority: document.getElementById('editTaskPriority').value
    };

    // Aktualisiere die Task-Daten in der Liste
    tasks[key] = { ...tasks[key], ...editedTask };

    // Optional: Aktualisierung des UI oder der Datenbank
    // updateTaskOnServer(key, tasks[key]);

    // Zeige wieder das Single Task Form an und aktualisiere den Inhalt
    document.getElementById('single-task-overlay').innerHTML = addSingleTaskForm(tasks[key], key);
}

function cancelTaskEdits(key) {
    // Bringe das ursprüngliche Single Task Form zurück, wenn der Benutzer die Bearbeitung abbricht
    document.getElementById('single-task-overlay').innerHTML = addSingleTaskForm(tasks[key], key);
}

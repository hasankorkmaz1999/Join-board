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

                <div class="avatarsinbig">
                ${taskData.assignedToFullHTML}
                </div>

                <div class="fullname">
                ${taskData.assignedToFullNameHTML}
                </div>


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

    // Generiere das HTML für die Subtasks
    let subtasksHTML = '';
    if (task.subtasks && task.subtasks.length > 0) {
        for (let i = 0; i < task.subtasks.length; i++) {
            let subtask = task.subtasks[i];
            subtasksHTML += `<div class="subtasklistedit">
                        <li class="subtaskedit">${subtask.title}</li>
                          <div class="editanddeletebuttonsub">
                        <img src="../../IMGicons/edit.svg" alt="edit" class="edit-btn">
                        <img src="../../IMGicons/delete.svg" alt="delete" class="delete-btn">
                        </div>
                        </div>`;
        }
    }

    // Generiere das HTML für das Edit-Formular
    const editFormHTML = `
        <div onclick="doNotClose(event)" class="edit-task-form">
            <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
          
            <label for="editTaskTitle">Title</label>
            <input class="editTaskTitle" type="text" id="editTaskTitle" value="${task.task}">

            <label for="editTaskDescription">Description</label>
            <textarea class="editTaskDescription" id="editTaskDescription">${task.description}</textarea>

            <label for="editDueDate">Due Date</label>
            <input class="editDueDate" type="date" id="editDueDate" value="${task.duedate}">

            <label for="editTaskPriority">Priority:</label>

            <div class="addTaskPriorityEdit">
                <div class="prioFlexEdit">
                    <form class="taskFormEdit" id="taskFormEdit">
                        <button type="button" onclick="setActive(this, 'urgent')" class="addTaskPrioButtonEdit prio-urgent">Urgent</button>
                        <button type="button" onclick="setActive(this, 'medium')" class="addTaskPrioButtonEdit prio-medium">Medium</button>
                        <button type="button" onclick="setActive(this, 'low')" class="addTaskPrioButtonEdit prio-low">Low</button>
                        <input type="hidden" id="priority" name="priority">
                    </form>
                </div>
            </div>

            <div class="addTaskAssignedTo">
                <label for="assignedto">Assigned to</label>
                <button id="AssignedToButton" type="button" onclick="showAssignedTo()" class="addTaskAssignedToButton down">Select</button>
                <div id="assignedto" class="assignedto-checkboxes d-non"></div>
            </div>

          <div class="addTaskSubtasksEdit">
    <label for="subtasks">Subtasks</label>
    <div class="subtask-input-container">
        <input class="inputsubtaskedit" type="text" id="subtaskedit" placeholder="Add new subtask" oninput="toggleIconVisibility()">
        <div class="icons-wrapper hidden">
            <img src="./IMGicons/close.svg" class="clear-subtask-icon" alt="X" onclick="clearSubtaskInput()">
            <div class="divideredit"></div>
            <img src="./IMGicons/contacticons/check.png" alt="Add Subtask" class="add-subtask-icon" onclick="addSubtaskFromInput()">
        </div>
    </div>
    <div id="subtaskList">${subtasksHTML}</div>
</div>


            <div class="Okbuttonposition">
                <button onclick='saveTaskEdits("${key}")' class="OKbutton">Ok</button>
            </div>
        </div>
    `;

    // Ersetze den Inhalt des Overlays mit dem Edit-Formular
    document.querySelector('.single-task-content').outerHTML = editFormHTML;
}

function toggleIconVisibility() {
    const subtaskInput = document.getElementById('subtaskedit');
    const iconsWrapper = document.querySelector('.icons-wrapper');

    if (subtaskInput.value.trim() !== '') {
        iconsWrapper.classList.remove('hidden');
    } else {
        iconsWrapper.classList.add('hidden');
    }
}

function clearSubtaskInput() {
    const subtaskInput = document.getElementById('subtaskedit');
    subtaskInput.value = ''; // Clear the input field
    toggleIconVisibility(); // Hide icons after clearing
}


function addSubtaskFromInput() {
    const subtaskInput = document.getElementById('subtaskedit');
    const subtaskTitle = subtaskInput.value.trim();
    
    if (subtaskTitle) {
        addSubtaskToList(subtaskTitle);
        subtaskInput.value = ''; // Clear the input field
        toggleIconVisibility(); // Hide the icon after adding the subtask
    }
}

function addSubtaskToList(title) {
    const subtaskList = document.getElementById("subtaskList");
    const listItem = document.createElement("div");

    listItem.className = "subtasklistedit";
    listItem.innerHTML = `<li class="subtaskedit">${title}</li>`;
    
    listItem.addEventListener('click', function() {
        this.classList.toggle('completed'); // Optional: Mark the subtask as completed on click
    });

    subtaskList.appendChild(listItem);
}

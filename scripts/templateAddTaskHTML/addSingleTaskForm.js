/**
 * Generates the HTML for displaying a single task in the overlay view.
 * 
 * @param {object} taskData - The data object containing task details.
 * @param {string} key - The key of the task.
 * @returns {string} The HTML string for the single task form.
 */
function addSingleTaskForm(taskData, key) {
    return /*html*/`
        <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
        <div onclick="doNotClose(event)" class="single-task-content">
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
               <p class="subtaskhtml">${taskData.subtasksHTML}</p> 
            </div>

            <div class="editanddeletetask">
                <div onclick='deleteTask("${key}")' class="deletebuttontask">Delete</div>
                <div onclick='editTask("${key}")' class="editbuttontask">Edit</div>
            </div>

            <div id="edit-task-form-container"></div>
        </div>
    `;
}

/**
 * Opens the edit task form for the specified task.
 * 
 * @param {string} key - The key of the task to edit.
 */
function editTask(key) {
    const task = tasks[key];
    openEditTaskIframe(task, key);
    closeSingleTaskOverlay();
}

/**
 * Opens an iframe for editing the task, passing the task data to the iframe.
 * 
 * @param {object} task - The task object containing details about the task.
 * @param {string} key - The key of the task.
 */
function openEditTaskIframe(task, key) {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');
    overlay.classList.add('slide-in-right');

    let iframe = document.createElement('iframe');
    iframe.src = `add_task_board.html?taskId=${key}`;

    let popupContent = document.getElementById('addtaskpopup');
    popupContent.innerHTML = '';
    popupContent.appendChild(iframe);
    document.body.style.overflow = 'hidden';

    iframe.onload = function() {
        iframe.contentWindow.postMessage({ taskData: task, taskKey: key}, '*');
    };
}

/**
 * Toggles the visibility of the subtask icons based on the input field's value.
 */
function toggleIconVisibility() {
    const subtaskInput = document.getElementById('subtaskedit');
    const iconsWrapper = document.querySelector('.icons-wrapper');

    if (subtaskInput.value.trim() !== '') {
        iconsWrapper.classList.remove('hidden');
    } else {
        iconsWrapper.classList.add('hidden');
    }
}

/**
 * Clears the subtask input field and hides the icons.
 */
function clearSubtaskInput() {
    const subtaskInput = document.getElementById('subtaskedit');
    subtaskInput.value = '';
    toggleIconVisibility();
}

/**
 * Adds a subtask to the list based on the input field's value.
 */
function addSubtaskFromInput() {
    const subtaskInput = document.getElementById('subtaskedit');
    const subtaskTitle = subtaskInput.value.trim();
    
    if (subtaskTitle) {
        addSubtaskToList(subtaskTitle);
        subtaskInput.value = '';
        toggleIconVisibility();
    }
}

/**
 * Adds a subtask to the DOM list.
 * 
 * @param {string} title - The title of the subtask to add.
 */
function addSubtaskToList(title) {
    const subtaskList = document.getElementById("subtaskList");
    const listItem = document.createElement("div");

    listItem.className = "subtasklistedit";
    listItem.innerHTML = `
        <li class="subtaskedit">${title}</li>
        <div class="editanddeletebuttonsub">
            <img src="../../IMGicons/edit.svg" alt="edit" class="edit-btn" onclick="editSubtask(this)">
            <img src="../../IMGicons/delete.svg" alt="delete" class="delete-btn" onclick="deleteSubtask(this)">
        </div>
    `;
    
    subtaskList.appendChild(listItem);
}

/**
 * Deletes a subtask from the DOM list.
 * 
 * @param {HTMLElement} deleteBtn - The delete button that was clicked.
 */
function deleteSubtask(deleteBtn) {
    const subtaskDiv = deleteBtn.closest('.subtasklistedit');
    subtaskDiv.remove();
}

/**
 * Allows editing of a subtask in the DOM list.
 * 
 * @param {HTMLElement} editBtn - The edit button that was clicked.
 */
function editSubtask(editBtn) {
    const subtaskDiv = editBtn.closest('.subtasklistedit');
    const subtaskLi = subtaskDiv.querySelector('.subtaskedit');
    
    const currentTitle = subtaskLi.textContent.trim();
    
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentTitle;
    inputField.className = 'edit-subtask-input';
    
    inputField.setSelectionRange(0, 0);

    subtaskDiv.replaceChild(inputField, subtaskLi);

    subtaskDiv.style.backgroundColor = 'transparent';
    subtaskDiv.onmouseover = function() {
        this.style.backgroundColor = 'transparent';
    };
    
    editBtn.src = "../../IMGicons/contacticons/check.png";
    editBtn.alt = "save";
    editBtn.classList.add('add-subtask-icon');
    
    editBtn.onclick = function() {
        saveSubtaskEdit(this, inputField);
        subtaskDiv.style.backgroundColor = '';
        subtaskDiv.onmouseover = null;
    };
}

/**
 * Saves the edited subtask and replaces the input field with the updated text.
 * 
 * @param {HTMLElement} saveBtn - The save button that was clicked.
 * @param {HTMLInputElement} inputField - The input field containing the new subtask title.
 */
function saveSubtaskEdit(saveBtn, inputField) {
    const subtaskDiv = saveBtn.closest('.subtasklistedit'); 
    const newTitle = inputField.value.trim();
    
    if (newTitle) {
        const updatedSubtaskLi = document.createElement('li');
        updatedSubtaskLi.className = 'subtaskedit';
        updatedSubtaskLi.textContent = newTitle;

        subtaskDiv.replaceChild(updatedSubtaskLi, inputField);
        
        saveBtn.src = "../../IMGicons/edit.svg";
        saveBtn.alt = "edit";
        saveBtn.classList.remove('add-subtask-icon');
        
        saveBtn.onclick = function() {
            editSubtask(this);
        };

        subtaskDiv.style.backgroundColor = '';
        subtaskDiv.onmouseover = null;
    }
}

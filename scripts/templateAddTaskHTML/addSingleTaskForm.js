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
    // Get the task data by key
    const task = tasks[key];

    // Open the iframe with the form
    openEditTaskIframe(task, key);
    closeSingleTaskOverlay();
}

function openEditTaskIframe(task, key) {
    // Open the iframe
    console.log(key);
    
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');
    overlay.classList.add('slide-in-right');

    let iframe = document.createElement('iframe');
    iframe.src = `add_task_board.html?taskId=${key}`; // Pass the task ID to the iframe via query params

    let popupContent = document.getElementById('addtaskpopup');
    popupContent.innerHTML = ''; // Clear previous content
    popupContent.appendChild(iframe);
    document.body.style.overflow = 'hidden';

    // Send the task data to the iframe once it's loaded
    iframe.onload = function() {
        iframe.contentWindow.postMessage({ taskData: task, taskKey: key}, '*');
    };
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
    listItem.innerHTML = `
        <li class="subtaskedit">${title}</li>
        <div class="editanddeletebuttonsub">
            <img src="../../IMGicons/edit.svg" alt="edit" class="edit-btn" onclick="editSubtask(this)">
            <img src="../../IMGicons/delete.svg" alt="delete" class="delete-btn" onclick="deleteSubtask(this)">
        </div>
    `;
    
    subtaskList.appendChild(listItem);
}


function deleteSubtask(deleteBtn) {
    const subtaskDiv = deleteBtn.closest('.subtasklistedit');
    subtaskDiv.remove();
}

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


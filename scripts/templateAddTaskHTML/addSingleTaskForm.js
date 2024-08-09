function addSingleTaskForm(taskData, key) {
   
    return /*html*/`
        <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
        <div  onclick="doNotClose(event)" class="single-task-content">
            <p class="taskCategoryHTML">${taskData.taskCategoryHTML}</p>
            <h2 class="taskTitleOverlay">${taskData.taskTitle}</h2>
            <p>${taskData.taskDescription}</p>
            <p>Due date: <span class="dueDate">${taskData.dueDate}</span></p>
            <p class="">Priority: <span class="taskPriority"> ${taskData.taskPriority} ${taskData.taskPriorityIcon} </span></p>
            <p class="nurtest">Assigned To:</p>
            <p class="Subtasks">Subtasks</p>
            <div class="editanddeletetask">
                <div onclick='deleteTask("${key}")' class="deletebuttontask">Delete</div>
                <div class="editbuttontask">Edit</div>
            </div>
        </div>
    `;
}

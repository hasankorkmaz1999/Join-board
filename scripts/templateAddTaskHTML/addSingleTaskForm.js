function addSingleTaskForm(taskData) {
    return /*html*/`
        <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
        <div class="single-task-content">
            <p class="taskCategoryHTML">${taskData.taskCategoryHTML}</p>
            <h2 class="taskTitleOverlay">${taskData.taskTitle}</h2>
            <p>${taskData.taskDescription}</p>
            <p class="">Due date: ${taskData.dueDate}</p>
            <p class="">Priority: ${taskData.taskPriority} ${taskData.taskPriorityIcon}</p>
            <p class="nurtest">Assigned To:</p>
            <p class="">Subtasks</p>
            <div class="editanddeletetask">
                <div class="deletebuttontask">Delete</div>
                <div class="editbuttontask">Edit</div>
            </div>
        </div>
    `;
}

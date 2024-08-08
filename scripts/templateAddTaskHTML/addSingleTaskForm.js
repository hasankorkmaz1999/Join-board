function addSingleTaskForm(taskTitle, taskDescription, taskPriority, taskCategoryHTML) {
    return /*html*/`
        <img onclick="closeSingleTaskOverlay()" class="closeXaddtask" src="./IMGicons/close.svg" alt="Icon Close">
        <div class="single-task-content">
            <p class="taskCategoryHTML">${taskCategoryHTML}</p>
            <h2 class="taskTitleOverlay">${taskTitle}</h2>
            <p>${taskDescription}</p>
            <p class="">Due date:</p>
            <p class="">Priority: ${taskPriority}</p>
            <p class="nurtest">Assigned To:</p>
            <p class="">Subtasks</p>
               <div class="editanddeletetask">
               <div class="deletebuttontask">Delete</div>
               <div class="editbuttontask">Edit</div>
               </div>
        </div>
    `;
}

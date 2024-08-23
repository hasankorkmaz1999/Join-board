function validateAndSanitizeFormBOARD() {
    return new Promise((resolve, reject) => {
        const taskTitle = document.getElementById("addTaskTitle");
        const taskTitleError = document.getElementById("taskTitleError");
        const duedateError = document.getElementById("duedateError");
        const description = document.getElementById("description");
        const date = document.getElementById("prioDate");

        let isValid = true;

        if (!taskTitle.value.trim()) {
            taskTitleError.classList.remove('d-non');
            taskTitleError.classList.add('addTaskerrorMessage');
            isValid = false;
        } else {
            taskTitleError.classList.remove('addTaskerrorMessage');
            taskTitleError.classList.add('d-none');
        }

        if (!date.value.trim()) {
            duedateError.classList.remove('d-non');
            duedateError.classList.add('addTaskerrorMessage');
            isValid = false;
        } else {
            duedateError.classList.remove('addTaskerrorMessage');
            duedateError.classList.add('d-non');
        }

        if (!isValid) {
            return reject(new Error("Validation failed"));
        }
        const sanitizeInput = (input) => {
            return input.replace(/[<>&"'\/\\(){}[\]=;:]/g, ' ');
        };
        const sanitizedValues = {
            taskTitle: sanitizeInput(taskTitle.value),
            description: sanitizeInput(description.value),
            date: date.value,
            subtasks: Array.from(document.querySelectorAll("#subtaskList li")).map(item => sanitizeInput(item.textContent.trim()))
        };
        resolve(sanitizedValues);
    });
}
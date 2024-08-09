function validateAndSanitizeForm() {
    return new Promise((resolve, reject) => {
        const taskTitle = document.getElementById("addTaskTitle");
        const taskTitleError = document.getElementById("taskTitleError");
        const description = document.getElementById("description");
        const date = document.getElementById("prioDate");
        const category = document.getElementById("category");
        const subtasks = document.getElementById("subtasks");

        let isValid = true;

        if (!taskTitle.value.trim()) {
            taskTitleError.classList.remove('d-non');
            taskTitleError.classList.add('addTaskerrorMessage');
            isValid = false;
        } else {
            taskTitleError.classList.remove('addTaskerrorMessage');
            taskTitleError.classList.add('d-none');
        }

        if (!date.value.trim() || !category.value || category.value === "null") {
            alert("Bitte füllen Sie alle erforderlichen Felder aus.");
            isValid = false;
        }

        if (!isValid) {
            return reject(new Error("Validation failed"));
        }
        // Symbole ersetzen, um XSS zu verhindern
        const sanitizeInput = (input) => {
            return input.replace(/[<>&"'\/\\(){}[\]=;:]/g, ' ');
        };
        const sanitizedValues = {
            taskTitle: sanitizeInput(taskTitle.value),
            description: sanitizeInput(description.value),
            date: date.value,
            category: category.value,
            subtasks: sanitizeInput(subtasks.value)
        };
        resolve(sanitizedValues);
    });
}
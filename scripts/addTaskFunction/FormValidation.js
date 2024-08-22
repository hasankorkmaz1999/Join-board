/**
 * Validates and sanitizes the form input fields. If validation fails, it rejects the promise with an error.
 * If validation passes, it sanitizes the input values to prevent XSS and resolves the promise with the sanitized values.
 *
 * @returns {Promise<Object>} A promise that resolves with the sanitized form values or rejects with a validation error.
 */


function validateAndSanitizeForm() {
    return new Promise((resolve, reject) => {
        const taskTitle = document.getElementById("addTaskTitle");
        const taskTitleError = document.getElementById("taskTitleError");
        const duedateError = document.getElementById("duedateError");
        const categoryError = document.getElementById("addTaskCategoryError");
        const description = document.getElementById("description");
        const date = document.getElementById("prioDate");
        const category = document.getElementById("category");

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

        if (!category.value || category.value === "null") {
            categoryError.classList.remove('d-non');
            categoryError.classList.add('addTaskerrorMessage');
            isValid = false;
        } else {
            categoryError.classList.remove('addTaskerrorMessage');
            categoryError.classList.add('d-non');
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
            subtasks: Array.from(document.querySelectorAll("#subtaskList li")).map(item => sanitizeInput(item.textContent.trim()))
        };
        resolve(sanitizedValues);
    });
}
function validateAndSanitizeForm() {
    return new Promise((resolve, reject) => {
        const taskTitle = document.getElementById("addTaskTitle");
        const description = document.getElementById("description");
        const date = document.getElementById("prioDate");
        const category = document.getElementById("category");
        const subtasks = document.getElementById("subtasks");

        // Überprüfen, ob die Pflichtfelder ausgefüllt sind
        if (!taskTitle.value.trim() || !date.value.trim() || !category.value || category.value === "null") {
            alert("Bitte füllen Sie alle erforderlichen Felder aus.");
            return reject(new Error("Validation failed"));
        }

        // Symbole ersetzen, um XSS zu verhindern
        const sanitizeInput = (input) => {
            return input.replace(/[<>&"'\/\\(){}[\]=;:]/g, ' ');
        };

        // Bereinigte Werte
        const sanitizedValues = {
            taskTitle: sanitizeInput(taskTitle.value),
            description: sanitizeInput(description.value),
            date: date.value,
            category: category.value,
            subtasks: sanitizeInput(subtasks.value)
        };

        // Validierung erfolgreich
        resolve(sanitizedValues);
    });
}
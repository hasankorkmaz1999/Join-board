///////////////////////////////////////////////////////
//      DO NOT ADD THIS SCRIPT TO ADDTASK.HTML!     //
/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Überprüfen, ob die Seite in einem iFrame geladen wird
    if (window.self === window.top) {
        // Die Seite wird nicht in einem iFrame geladen
        document.body.innerHTML = '<h1>Unfortunately the page cannot be opened like this</h1>';
        
        // Weiterleitung nach 5 Sekunden
        setTimeout(function() {
            window.location.href = 'index.html';  // Passe dies an den richtigen Pfad deiner Index-Seite an
        }, 5000);
    } else {
        // Der normale Ablauf, wenn die Seite in einem iFrame geladen wird
        let params = getQueryParams();
        if (params.progress !== null) {
            switch (params.progress) {
                case '0':
                    handleProgress0();
                    break;
                case '1':
                    handleProgress1();
                    break;
                case '2':
                    handleProgress2();
                    break;
                case '3':
                    handleProgress3();
                    break;
                default:
                    error('Invalid parameter. Please use a value between 0 and 3.');
            }
        } else {
            alert('No parameter specified.');
        }
    }
});

/* Hier checken wir den Parameter */

function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    return {
        progress: params.get('progress')
    };
}

function handleProgress0() {
    let button = document.getElementById('addTaskFlexButtons');
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(0)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `; 
    // Weitere Logik für Progress 0
}

function handleProgress1() {
    let title = document.getElementById('addTaskH1');
    let button = document.getElementById('addTaskFlexButtons');
    title.innerHTML = `Create Task in To-Do`;
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(1)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `; 
}

function handleProgress2() {
    let title = document.getElementById('addTaskH1');
    let button = document.getElementById('addTaskFlexButtons');
    title.innerHTML = `Create Task in Progress`;
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(2)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `; 
}

function handleProgress3() {
    let title = document.getElementById('addTaskH1');
    let button = document.getElementById('addTaskFlexButtons');
    title.innerHTML = `Create Task Awaiting Feedback`;
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(3)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `; 
}

function addTaskBoard(progress) {
    if (progress === 0) {
        startAddTask();
    }
    if (progress === 1) {
        startAddTask();
    }
    if (progress === 2) {
        startAddTaskInProgress();
    }
    if (progress === 3) {
        addTaskAwaitFeedback();
    } else {
        alert('Ungültiger Parameter! Bitte einen Wert zwischen 0 und 3 verwenden.');
    }
}

async function addTaskAwaitFeedback() {
        try {
            const sanitizedValues = await validateAndSanitizeForm();
            const task = sanitizedValues.taskTitle;
            const date = sanitizedValues.date;
            const priority = document.getElementById("priority").value;
            const category = sanitizedValues.category;
            const description = sanitizedValues.description;
    
            let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
            let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);
    
            // Sammeln der Subtasks aus der Liste
            const subtaskElements = document.querySelectorAll("#subtaskList li");
            const subtasks = Array.from(subtaskElements).map(item => ({
                itsdone: false,
                title: item.textContent
            }));
    
            let data = {
                task: task,
                date: date,
                priority: priority,
                category: category,
                assignedto: assignedTo.map(name => ({ name })),
                description: description,
                subtasks: subtasks,
                progress: "AwaitingFeedback",
                duedate: date,
            };
    
            let response = await fetch(addAPI + ".json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            await response.json();
            console.log("Task successfully added:", data);
            reloadPage();
            toastMessage("New task added successfully!");
    
        } catch (error) {
            console.error("Fehler bei der Validierung oder beim Hinzufügen der Aufgabe:", error);
            toastMessage("Error adding task. Please try again.");
        }
}

async function startAddTaskInProgress() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;
        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

        // Sammeln der Subtasks aus der Liste
        const subtaskElements = document.querySelectorAll("#subtaskList li");
        const subtasks = Array.from(subtaskElements).map(item => ({
            itsdone: false,
            title: item.textContent
        }));

        let data = {
            task: task,
            date: date,
            priority: priority,
            category: category,
            assignedto: assignedTo.map(name => ({ name })),
            description: description,
            subtasks: subtasks,
            progress: "inProgress",
            duedate: date,
        };

        let response = await fetch(addAPI + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        await response.json();
        console.log("Task successfully added:", data);
        reloadPage();
        toastMessage("New task added successfully!");

    } catch (error) {
        console.error("Fehler bei der Validierung oder beim Hinzufügen der Aufgabe:", error);
        toastMessage("Error adding task. Please try again.");
    }
}

async function startAddTask() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;
        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

        // Sammeln der Subtasks aus der Liste
        const subtaskElements = document.querySelectorAll("#subtaskList li");
        const subtasks = Array.from(subtaskElements).map(item => ({
            itsdone: false,
            title: item.textContent
        }));

        let data = {
            task: task,
            date: date,
            priority: priority,
            category: category,
            assignedto: assignedTo.map(name => ({ name })),
            description: description,
            subtasks: subtasks,
            progress: "todo",
            duedate: date,
        };

        let response = await fetch(addAPI + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        await response.json();
        console.log("Task successfully added:", data);
        reloadPage();
        toastMessage("New task added successfully!");

    } catch (error) {
        console.error("Fehler bei der Validierung oder beim Hinzufügen der Aufgabe:", error);
        toastMessage("Error adding task. Please try again.");
    }
}
///////////////////////////////////////////////////////
//      DO NOT ADD THIS SCRIPT TO ADDTASK.HTML!     //
/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Überprüfen, ob die Seite in einem iFrame geladen wird oder der Session Storage 'JoinDev' auf true gesetzt ist
    if (window.self === window.top && sessionStorage.getItem('JoinDev') !== 'true') {
        // Die Seite wird nicht in einem iFrame geladen und 'JoinDev' ist nicht true
        document.body.innerHTML = '<h1>Unfortunately the page cannot be opened like this</h1>';
        console.log("%cACCESS BLOCKED", `
            background: #ff0f0f;
            padding: .5rem 1rem;
            color: #fff;
            font-weight: bold;
            text-align: center;
            border-radius: 4px;
           `);
        
        
        setTimeout(function() {
            window.location.href = './index.html';
        }, 5000);
    } else {
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
                    console.log("%cInvalid parameter. Please use a value between 0 and 3.", `
                        background: #d23c22;
                        padding: .5rem 1rem;
                        color: #fff;
                        font-weight: bold;
                        text-align: center;
                        border-radius: 4px;
                       `);
            }
        } else {
            console.warn('Parameter progress is missing. Init Edit Task...');
        }
    }
});

function devon() {
    sessionStorage.setItem('JoinDev', 'true');
    console.log("JoinDev has been set to true in sessionStorage.");
}

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
        console.log("%cForm validation response error... More info under me ↓", `
            background: #ff9966;
            padding: .5rem 1rem;
            color: #fff;
            font-weight: bold;
            text-align: center;
            border-radius: 4px;
           `);
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
            triggerInit();
            triggerCloseAddTaskOverlay();
    
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
        triggerInit();
        triggerCloseAddTaskOverlay();

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
        triggerInit();
        triggerCloseAddTaskOverlay();

    } catch (error) {
        console.error("Error during validation or when adding the task:", error);
        toastMessage("Error adding task. Please try again.");
    }
}

function triggerInit() {
    // Ruft die init-Funktion im übergeordneten Fenster auf
    if (parent && parent.init) {
        parent.init();
    } else {
        console.error('init function not found in parent window');
    }
}

function triggerCloseAddTaskOverlay() {
    // Ruft die closeAddTaskOverlay-Funktion im übergeordneten Fenster auf
    if (parent && parent.closeAddTaskOverlay) {
        parent.closeAddTaskOverlay();
    } else {
        console.error('closeAddTaskOverlay function not found in parent window');
    }
}

window.addEventListener('message', function(event) {
    const taskData = event.data.taskData;
    let taskKey = event.data.taskKey;
    if (taskData) {

        document.getElementById('addTaskTitle').value = taskData.task;
        document.getElementById('description').value = taskData.description;
        document.getElementById('prioDate').value = taskData.duedate;
        
        let priorityButton = document.querySelector(`.addTaskPrioButtonEdit.prio-${taskData.priority.toLowerCase()}`);
        if (priorityButton) {
            priorityButton.click();
        }


        if (taskData.assignedto && taskData.assignedto.length > 0) {
            taskData.assignedto.forEach(person => {
                let checkbox = document.querySelector(`input[name="assignedto"][value="${person.name}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    checkbox.dispatchEvent(new Event('change')); 
                }
            });
        } else {
            console.log("No persons assigned to this task.");
        }


        let subtaskList = document.getElementById('subtaskList');
        subtaskList.innerHTML = ''; 
        taskData.subtasks.forEach(subtask => {
            addSubtaskToList(subtask.title, subtask.itsdone);
        });
        document.getElementById('addTaskH1').innerHTML = 'Edit Task (Beta)';
        document.getElementById('addTaskFlexButtons').innerHTML = generateEditButton(taskKey);
    }
});

function generateEditButton(taskKey) {
    if (taskKey === null || taskKey === undefined) {
        console.log("%cTask key is missing. Unable to generate edit button.", `
            background: #ff9966;
            padding: .5rem 1rem;
            color: #fff;
            font-weight: bold;
            text-align: center;
            border-radius: 4px;
           `);

           toastMessage("Error editing task. Please try again.");
    } else {
        return `
        <button id="createbutton" type="button" onclick="editTask('${taskKey}')" class="createbutton">
            <p class="create-mobile">Edit Task</p>
            <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
    </form>
`;   
    }
}

async function editTask(taskKey) {
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
            duedate: date,
        };

        let response = await fetch(addAPI + `/${taskKey}.json`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        await response.json();
        console.log("Task successfully edited:", data);
        reloadPage();
        toastMessage("Task edited successfully!");
        triggerInit();
        triggerCloseAddTaskOverlay();

    } catch (error) {
        console.error("Error validating or editing task:", error);
        toastMessage("Error editing task. Please try again.");
    }
}
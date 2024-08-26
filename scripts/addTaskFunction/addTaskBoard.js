///////////////////////////////////////////////////////
//      DO NOT ADD THIS SCRIPT TO ADDTASK.HTML!     //
/////////////////////////////////////////////////////

/**
 * Event listener for the DOM content loaded event. 
 * It checks if the page is loaded in a correct environment and initializes the task form based on URL parameters.
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.self === window.top && sessionStorage.getItem('JoinDev') !== 'true') {
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

/**
 * Enables developer mode by setting a session storage item.
 */
function devon() {
    sessionStorage.setItem('JoinDev', 'true');
}

/**
 * Retrieves the query parameters from the URL.
 * 
 * @returns {object} An object containing the query parameters.
 */
function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    return {
        progress: params.get('progress')
    };
}

/**
 * Initializes the add task board based on the provided progress parameter.
 * 
 * @param {string} progress - The progress status (e.g., "0", "1", "2", "3").
 */
function addTaskBoard(progress) {
    if (progress === 0) {
        startAddTask();
    } else if (progress === 1) {
        startAddTask();
    } else if (progress === 2) {
        startAddTaskInProgress();
    } else if (progress === 3) {
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

/**
 * Adds a new task with the "Awaiting Feedback" status to the board.
 */
async function addTaskAwaitFeedback() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;
        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        validateDate(date);

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

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
        reloadPage();
        toastMessage("New task added successfully!");
        triggerInit();
        triggerCloseAddTaskOverlay();

    } catch (error) {
        console.error("Error during validation or when adding the task:", error);
        toastMessage("Error adding task. Please try again.");
    }
}

/**
 * Adds a new task with the "In Progress" status to the board.
 */
async function startAddTaskInProgress() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;
        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        validateDate(date);

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

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
        reloadPage();
        toastMessage("New task added successfully!");
        triggerInit();
        triggerCloseAddTaskOverlay();

    } catch (error) {
        console.error("Fehler bei der Validierung oder beim Hinzufügen der Aufgabe:", error);
        toastMessage("Error adding task. Please try again.");
    }
}

/**
 * Adds a new task with the "To Do" status to the board.
 */
async function startAddTask() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;
        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        validateDate(date);

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

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
        reloadPage();
        toastMessage("New task added successfully!");
        triggerInit();
        triggerCloseAddTaskOverlay();

    } catch (error) {
        console.error("Error during validation or when adding the task:", error);
        toastMessage("Error adding task. Please try again.");
    }
}

/**
 * Triggers the `init` function in the parent window if it exists.
 */
function triggerInit() {
    if (parent && parent.init) {
        parent.init();
    } else {
        console.error('init function not found in parent window');
    }
}

/**
 * Triggers the `closeAddTaskOverlay` function in the parent window if it exists.
 */
function triggerCloseAddTaskOverlay() {
    if (parent && parent.closeAddTaskOverlay) {
        parent.closeAddTaskOverlay();
    } else {
        console.error('closeAddTaskOverlay function not found in parent window');
    }
}

/**
 * Handles the receipt of a message from the parent window, setting the task form fields based on the received data.
 * 
 * @param {MessageEvent} event - The message event containing task data.
 */
window.addEventListener('message', function(event) {
    const taskData = event.data.taskData;
    let taskKey = event.data.taskKey;
    if (taskData) {
        document.getElementById('addTaskTitle').value = taskData.task;
        document.getElementById('description').value = taskData.description;
        document.getElementById('prioDate').value = taskData.duedate;
        showAssignedTo(); // Make sure this function populates the checkboxes

        // Set the priority button
        let priorityButton = document.querySelector(`.addTaskPrioButtonEdit.prio-${taskData.priority.toLowerCase()}`);
        if (priorityButton) {
            priorityButton.click();
        }

        // Automatically select the checkboxes for assigned users
        setTimeout(() => {
            if (taskData.assignedto && taskData.assignedto.length > 0) {
                taskData.assignedto.forEach(person => {
                    let checkbox = document.querySelector(`input[name="assignedto"][value="${person.name}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                        checkbox.dispatchEvent(new Event('change'));
                    } else {
                        console.warn(`Checkbox for ${person.name} not found.`);
                    }
                });
            } else {
                console.log("No persons assigned to this task.");
            }
        }, 500)


        // Handle subtasks
        let subtaskList = document.getElementById('subtaskList');
        subtaskList.innerHTML = '';
        try {
            taskData.subtasks.forEach(subtask => {
                addSubtaskToList(subtask.title.trim(), subtask.itsdone);
            });
        } catch (error) {
            console.warn("No task available", error);
        }

        // Adjust the form to reflect editing state
        document.getElementById('addTaskCategory').innerHTML = "";
        document.getElementById('addTaskH1').innerHTML = 'Edit Task';
        document.getElementById('addTaskFlexButtons').innerHTML = generateEditButton(taskKey);
    }
});

/**
 * Generates the HTML for the edit button in the task form.
 * 
 * @param {string} taskKey - The key of the task to edit.
 * @returns {string} The HTML string for the edit button.
 */
function generateEditButton(taskKey) {
    if (!taskKey) {
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
    </form>`;
    }
}

/**
 * Edits an existing task with the provided data.
 * 
 * @param {string} taskKey - The key of the task to edit.
 */
async function editTask(taskKey) {
    try {
        const sanitizedValues = await validateAndSanitizeFormBOARD();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;
        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        validateDate(date);

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

        const subtaskElements = document.querySelectorAll("#subtaskList li");
        const subtasks = Array.from(subtaskElements).map(item => ({
            itsdone: false,
            title: item.textContent.trim()
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
        reloadPage();
        toastMessage("Task edited successfully!");
        triggerInit();
        triggerCloseAddTaskOverlay();

    } catch (error) {
        console.error("Error validating or editing task:", error);
        toastMessage("Error editing task. Please try again.");
    }
}

/**
 * Validates the selected due date to ensure it is in the present or future.
 * Displays an error message if the date is invalid.
 * 
 * @param {string} dateStr - The due date string in ISO format.
 * @returns {boolean} True if the date is valid; otherwise, false.
 */
function validateDate(dateStr) {
    let errorSpan = document.getElementById('duedateError');
    let selectedDate = new Date(dateStr);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        errorSpan.textContent = "Please select a valid date in the present or future";
        errorSpan.style.color = '#FF7A00';
        errorSpan.classList.remove('d-non');
        throw new Error("The selected date is in the past.");
    } else {
        errorSpan.classList.add('d-non');
        return true;
    }
}

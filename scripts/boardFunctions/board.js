let taskAPI = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
let contactAPI = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

let cureentDraggedElement;

window.onload = init;

let tasks = {};

/**
 * Initializes the board by rendering data, checking for access permissions, and initializing the header.
 */
function init() {
    renderData(taskAPI);
    forbiddenCourse();
    initHeader();
}

/**
 * Checks if the user has permission to access the board.
 * Redirects to the login page if no valid user ID or guest token is found.
 */
function forbiddenCourse() {
    try {
        let userID = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        let guestToken = sessionStorage.getItem("guestToken");
        if (userID === null && guestToken === null) {
            window.location.href = "./login.html?msg=login_required";
        } else if (guestToken !== null) {
          
        }
    } catch (error) {
        window.location.href = "./login.html?msg=error_localStorage";
    }
}

/**
 * Fetches and renders task data from the API.
 * Clears the existing task lists before rendering.
 * 
 * @param {string} URL - The API endpoint from which to fetch task data.
 */
async function renderData(URL) {
    document.getElementById("todo").innerHTML = ``;
    document.getElementById("inprogress").innerHTML = ``;
    document.getElementById("done").innerHTML = ``;
    document.getElementById("awaitingfeedback").innerHTML = ``;
    let data = await loadData(URL);
    if (data) {
        renderTaskData(data);
    }
}

/**
 * Disables the loading spinner once data has been loaded.
 */
function disableSpinner() {
    let element = document.getElementById("spinner");
    document.getElementById("laoding").classList.add("d-non");
    if (element === null) {
    } else {
        element.innerHTML = ``;
    }
}

/**
 * Renders the task data into the appropriate task lists based on progress.
 * 
 * @param {object} data - The task data object retrieved from the API.
 */
function renderTaskData(data) {
    tasks = data;
    let keys = Object.keys(data);
    let todoDIV = document.getElementById("todo");
    let inprogressDIV = document.getElementById("inprogress");
    let doneDIV = document.getElementById("done");
    let awaitingfeedbackDIV = document.getElementById("awaitingfeedback");

    clearTaskDivs(todoDIV, inprogressDIV, doneDIV, awaitingfeedbackDIV);

    let taskCounts = initializeTaskCounts();

    keys.forEach(key => {
        let task = data[key];
        updateTaskDivs(task, key, taskCounts);
    });

    displayNoTasksBanners(taskCounts, todoDIV, inprogressDIV, doneDIV, awaitingfeedbackDIV);

    disableSpinner();
}

/**
 * Clears the task lists in preparation for rendering new data.
 * 
 * @param {HTMLElement} todoDIV - The div element for "To Do" tasks.
 * @param {HTMLElement} inprogressDIV - The div element for "In Progress" tasks.
 * @param {HTMLElement} doneDIV - The div element for "Done" tasks.
 * @param {HTMLElement} awaitingfeedbackDIV - The div element for "Awaiting Feedback" tasks.
 */
function clearTaskDivs(todoDIV, inprogressDIV, doneDIV, awaitingfeedbackDIV) {
    todoDIV.innerHTML = "";
    inprogressDIV.innerHTML = "";
    doneDIV.innerHTML = "";
    awaitingfeedbackDIV.innerHTML = "";
}

/**
 * Initializes an object to count the number of tasks in each category.
 * 
 * @returns {object} An object with counters for each task category.
 */
function initializeTaskCounts() {
    return {
        todoTasksCount: 0,
        inProgressTasksCount: 0,
        awaitingFeedbackTasksCount: 0,
        doneTasksCount: 0
    };
}

/**
 * Updates the task divs with the appropriate tasks based on their progress.
 * 
 * @param {object} task - The task object containing details about the task.
 * @param {string} key - The key of the task.
 * @param {object} taskCounts - The object containing the task counts for each category.
 */
function updateTaskDivs(task, key, taskCounts) {
    let progress = task.progress;

    if (progress === "todo") {
        updateTaskDiv("todo", taskCounts, renderDivTodo, task, key);
    } else if (progress === "inProgress") {
        updateTaskDiv("inProgress", taskCounts, renderDivInprogress, task, key);
    } else if (progress === "done") {
        updateTaskDiv("done", taskCounts, renderDivDone, task, key);
    } else if (progress === "AwaitingFeedback") {
        updateTaskDiv("AwaitingFeedback", taskCounts, renderDivawaitingfeedback, task, key);
    }
}

/**
 * Updates the task list div based on the progress type and increments the task count.
 * 
 * @param {string} progressType - The progress type of the task (e.g., "todo", "inProgress").
 * @param {object} taskCounts - The object containing the task counts for each category.
 * @param {function} renderFunction - The function used to render the task card.
 * @param {object} task - The task object containing details about the task.
 * @param {string} key - The key of the task.
 */
function updateTaskDiv(progressType, taskCounts, renderFunction, task, key) {
    let divID = getDivID(progressType);
    document.getElementById(divID).innerHTML += renderFunction(task, key);
    incrementTaskCount(taskCounts, progressType);
}

/**
 * Returns the div ID corresponding to the task's progress type.
 * 
 * @param {string} progressType - The progress type of the task.
 * @returns {string} The ID of the div element where the task should be rendered.
 */
function getDivID(progressType) {
    return {
        todo: "todo",
        inProgress: "inprogress",
        done: "done",
        AwaitingFeedback: "awaitingfeedback"
    }[progressType];
}

/**
 * Increments the task count for the specified progress type.
 * 
 * @param {object} taskCounts - The object containing the task counts for each category.
 * @param {string} progressType - The progress type of the task (e.g., "todo", "inProgress").
 */
function incrementTaskCount(taskCounts, progressType) {
    if (progressType === "todo") {
        taskCounts.todoTasksCount++;
    } else if (progressType === "inProgress") {
        taskCounts.inProgressTasksCount++;
    } else if (progressType === "AwaitingFeedback") {
        taskCounts.awaitingFeedbackTasksCount++;
    } else if (progressType === "done") {
        taskCounts.doneTasksCount++;
    }
}

/**
 * Displays banners indicating no tasks if there are no tasks in a particular category.
 * 
 * @param {object} taskCounts - The object containing the task counts for each category.
 * @param {HTMLElement} todoDIV - The div element for "To Do" tasks.
 * @param {HTMLElement} inprogressDIV - The div element for "In Progress" tasks.
 * @param {HTMLElement} doneDIV - The div element for "Done" tasks.
 * @param {HTMLElement} awaitingfeedbackDIV - The div element for "Awaiting Feedback" tasks.
 */
function displayNoTasksBanners(taskCounts, todoDIV, inprogressDIV, doneDIV, awaitingfeedbackDIV) {
    if (taskCounts.todoTasksCount === 0) {
        todoDIV.innerHTML = '<div class="no-tasks-banner">No tasks To Do</div>';
    }

    if (taskCounts.inProgressTasksCount === 0) {
        inprogressDIV.innerHTML = '<div class="no-tasks-banner">No tasks in Progress</div>';
    }

    if (taskCounts.awaitingFeedbackTasksCount === 0) {
        awaitingfeedbackDIV.innerHTML = '<div class="no-tasks-banner">No tasks awaiting Feedback</div>';
    }

    if (taskCounts.doneTasksCount === 0) {
        doneDIV.innerHTML = '<div class="no-tasks-banner">No tasks done</div>';
    }
}

/**
 * Sets the ID of the currently dragged task element.
 * 
 * @param {string} id - The ID of the task being dragged.
 */
function startDragging(id) {
    cureentDraggedElement = id;
}

/**
 * Allows the drop action on the drop target.
 * 
 * @param {Event} event - The drag event.
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Shows the drop indicator on the drop target.
 * 
 * @param {Event} event - The drag event.
 */
function showDropIndicator(event) {
    let target = event.currentTarget;
    if (!target.querySelector(".drop-indicator")) {
        let dropIndicator = document.createElement("div");
        dropIndicator.classList.add("drop-indicator");
        target.appendChild(dropIndicator);
    }
}

/**
 * Hides the drop indicator on the drop target.
 * 
 * @param {Event} event - The drag event.
 */
function hideDropIndicator(event) {
    let target = event.currentTarget;
    let dropIndicator = target.querySelector(".drop-indicator");
    if (dropIndicator) {
        dropIndicator.remove();
    }
}

/**
 * Moves a task to a new category.
 * 
 * @param {string} category - The new category to which the task should be moved.
 */
function moveTo(category) {
    let data = { progress: category };
    updateData(taskAPI, cureentDraggedElement, data);
}

/**
 * Updates the task data on the server using a PATCH request.
 * 
 * @param {string} URL - The API endpoint for the task data.
 * @param {string} id - The ID of the task to update.
 * @param {object} data - The updated task data.
 */
function updateData(URL, id, data) {
    fetch(`${URL}/${id}.json`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(() => {
        toastMessage("Task moved successfully!");
        setTimeout(() => { init(); }, 100);
    });
}

/**
 * Closes the task overlay.
 */
function closeOverlay() {
    let overlay = document.getElementById("overlayforaddtask");
    let popupContent = document.getElementById("addtaskpopup");
    popupContent.innerHTML = "";

    overlay.classList.add("slide-out-right");
    setTimeout(() => {
        overlay.classList.add("d-none");
        overlay.classList.remove("slide-in-right");
        overlay.classList.remove("slide-out-right");
    }, 500);
}

/**
 * Opens the add task overlay with a specific progress state.
 * 
 * @param {string} progress - The initial progress state for the new task.
 */
function openAddTaskOverlay(progress) {
    let overlay = document.getElementById("overlayforaddtask");
    overlay.classList.remove("d-none");
    overlay.classList.add("slide-in-right");

    let iframe = document.createElement("iframe");
    iframe.src = `add_task_board.html?progress=${progress}`;

    let popupContent = document.getElementById("addtaskpopup");
    popupContent.innerHTML = "";
    popupContent.appendChild(iframe);
    document.body.style.overflow = "hidden";
}

/**
 * Closes the add task overlay.
 */
function closeAddTaskOverlay() {
    let overlay = document.getElementById("overlayforaddtask");
    overlay.classList.remove("slide-in-right");
    overlay.classList.add("slide-out-right");
    setTimeout(() => {
        overlay.classList.add("d-none");
        overlay.classList.remove("slide-in-right");
        overlay.classList.remove("slide-out-right");
        document.body.style.overflow = "auto";
    }, 500);
}

/**
 * Prevents the overlay from closing when clicking inside the task content area.
 * 
 * @param {Event} event - The click event.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Opens the overlay for a single task with its details.
 * 
 * @param {object} taskData - The data object containing task details.
 * @param {string} key - The key of the task.
 */
function openSingleTaskOverlay(taskData, key) {
    let overlay = document.getElementById("overlayforsingletask");
    overlay.classList.remove("d-none");
    overlay.classList.add("slide-in-right");

    let popupContent = document.getElementsByClassName("singletaskpopup")[0];

    let htmlContent = addSingleTaskForm(taskData, key);
    popupContent.innerHTML = htmlContent;
    document.body.style.overflow = "hidden";
    overlay.setAttribute('data-current-key', key);
}

/**
 * Closes the overlay for a single task and updates the task card if needed.
 */
function closeSingleTaskOverlay() {
    let overlay = document.getElementById("overlayforsingletask");
    let key = overlay.getAttribute('data-current-key');

    overlay.classList.remove("slide-in-right");
    overlay.classList.add("slide-out-right");

    setTimeout(() => {
        overlay.classList.add("d-none");
        overlay.classList.remove("slide-in-right");
        let popupContent = document.getElementsByClassName("singletaskpopup")[0];
        popupContent.innerHTML = "";
        document.body.style.overflow = "auto";
        let task = tasks[key];
        let categoryClass = task.category === "Technical Task" ? "technical-green" : "user-story-blue";

        let taskCardElement = document.getElementById(`task-card-${key}`);
        if (taskCardElement) {
            taskCardElement.outerHTML = renderTaskCard(task, key, categoryClass, svgIcons);
        }
    }, 500);
}

/**
 * Deletes a task from the server and refreshes the page if successful.
 * 
 * @param {string} taskKey - The key of the task to delete.
 */
async function deleteTask(taskKey) {
    const deleteAPI = `https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes/${taskKey}.json`;

    try {
        const response = await fetch(deleteAPI, { method: "DELETE" });

        if (response.ok) {
            closeSingleTaskOverlay();
            location.reload();
        } else {
        }
    } catch (error) {
    }
}

/**
 * Initializes the search functionality by adding an input event listener.
 */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".inputfieldfindtask").addEventListener("input", findTask);
});

/**
 * Retrieves the current search input value and converts it to lowercase.
 * 
 * @returns {string} The search input value in lowercase.
 */
function getSearchInput() {
    return document.querySelector(".inputfieldfindtask").value.toLowerCase();
}

/**
 * Clears the task list divs in preparation for rendering search results.
 */
function clearTaskDivs() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("inprogress").innerHTML = "";
    document.getElementById("done").innerHTML = "";
    document.getElementById("awaitingfeedback").innerHTML = "";
}

/**
 * Checks if a task matches the current search input.
 * 
 * @param {object} task - The task object containing details about the task.
 * @param {string} searchInput - The current search input.
 * @returns {boolean} True if the task matches the search input, otherwise false.
 */
function taskMatchesSearch(task, searchInput) {
    let taskTitle = task.task.toLowerCase();
    let taskDescription = task.description.toLowerCase();
    return taskTitle.includes(searchInput) || taskDescription.includes(searchInput);
}

/**
 * Renders a task in the appropriate category based on its progress.
 * 
 * @param {string} progress - The progress type of the task.
 * @param {object} task - The task object containing details about the task.
 * @param {string} key - The key of the task.
 */
function renderTaskByProgress(progress, task, key) {
    if (progress === "todo") {
        document.getElementById("todo").innerHTML += renderDivTodo(task, key);
    } else if (progress === "inProgress") {
        document.getElementById("inprogress").innerHTML += renderDivInprogress(task, key);
    } else if (progress === "done") {
        document.getElementById("done").innerHTML += renderDivDone(task, key);
    } else if (progress === "AwaitingFeedback") {
        document.getElementById("awaitingfeedback").innerHTML += renderDivawaitingfeedback(task, key);
    }
}

/**
 * Displays a message indicating no tasks were found.
 */
function displayNoTasksFoundMessage() {
    document.getElementById("inprogress").innerHTML = '<div class="no-tasksfound-banner">No tasks found</div>';
}

/**
 * Searches for tasks matching the current search input and renders them.
 * Displays a message if no tasks match the search input.
 */
function findTask() {
    let searchInput = getSearchInput();

    clearTaskDivs();

    let keys = Object.keys(tasks);
    let tasksFound = false;

    keys.forEach(key => {
        let task = tasks[key];
        if (taskMatchesSearch(task, searchInput)) {
            tasksFound = true;
            renderTaskByProgress(task.progress, task, key);
        }
    });

    if (!tasksFound) {
        displayNoTasksFoundMessage();
    }

    if (searchInput === "") {
        renderData(taskAPI);
    }
}

/**
 * Moves a task to the "To Do" category.
 * 
 * @param {string} key - The key of the task to move.
 */
async function pushInToDo(event, key) {
    event.stopPropagation();
    let data = { progress: "todo" };
    updateData(taskAPI, key, data);
}

/**
 * Moves a task to the "In Progress" category.
 * 
 * @param {string} key - The key of the task to move.
 */
async function pushInProgress(event, key) {
    event.stopPropagation();
    let data = { progress: "inProgress" };
    updateData(taskAPI, key, data);
}

/**
 * Moves a task to the "Awaiting Feedback" category.
 * 
 * @param {string} key - The key of the task to move.
 */
async function pushInAwaitFeedback(event, key) {
    event.stopPropagation();
    let data = { progress: "AwaitingFeedback" };
    updateData(taskAPI, key, data);
}

/**
 * Moves a task to the "Done" category.
 * 
 * @param {string} key - The key of the task to move.
 */
async function pushInDone(event, key) {
    event.stopPropagation();
    let data = { progress: "done" };
    updateData(taskAPI, key, data);
}

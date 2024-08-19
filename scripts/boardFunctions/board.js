
let taskAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
let contactAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";
let cureentDraggedElement;

window.onload = init;

let tasks = {}; 

function init() {
    renderData(taskAPI);
}

async function renderData(URL) {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inprogress').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
    document.getElementById('awaitingfeedback').innerHTML = ``;
    let data = await loadData(URL);
    console.log(data);
    if (data) {
        renderTaskData(data);
    }
}

function disableSpinner() {
    let element = document.getElementById('spinner');
    document.getElementById('laoding').classList.add('d-non');
    if (element === null) {
        console.error("Spinner not found!");
        
    } else {
        element.innerHTML = ``;
    }
}

function renderTaskData(data) {
    tasks = data;
    let keys = Object.keys(data);
    let todoDIV = document.getElementById('todo');
    let inprogressDIV = document.getElementById('inprogress');
    let doneDIV = document.getElementById('done');
    let awaitingfeedbackDIV = document.getElementById('awaitingfeedback');

    // Setze die innerHTML für jede Kategorie zurück
    todoDIV.innerHTML = '';
    inprogressDIV.innerHTML = '';
    doneDIV.innerHTML = '';
    awaitingfeedbackDIV.innerHTML = '';

    let todoTasksCount = 0; // Zähler für die "To Do"-Tasks

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let task = data[key];
        let progress = task.progress;

        if (progress === "todo") {
            todoDIV.innerHTML += renderDivTodo(task, key);
            todoTasksCount++; // Zähle die "To Do"-Tasks
        }
        if (progress === "inProgress") {
            inprogressDIV.innerHTML += renderDivInprogress(task, key);
        }
        if (progress === "done") {
            doneDIV.innerHTML += renderDivDone(task, key);
        }
        if (progress === "AwaitingFeedback") {
            awaitingfeedbackDIV.innerHTML += renderDivawaitingfeedback(task, key);
        }
    }

    // Wenn keine "To Do"-Tasks vorhanden sind, zeige den Banner an
    if (todoTasksCount === 0) {
        todoDIV.innerHTML = '<div class="no-tasks-banner">No tasks To do</div>';
    }

    disableSpinner();
}


function startDragging(id) {
    cureentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

function moveTo(category) {
    let data = {
        progress: category
    }
    updateData(taskAPI, cureentDraggedElement, data);
}

function updateData(URL, id, data) {
    fetch(`${URL}/${id}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    toastMessage("Task moved successfully!");
    setTimeout(() => {
        init();
    }, 100);
}

function closeOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    let popupContent = document.getElementById('addtaskpopup');
    popupContent.innerHTML = '';

    overlay.classList.add('slide-out-right');
    setTimeout(() => {
        overlay.classList.add('d-none');
        overlay.classList.remove('slide-in-right');
        overlay.classList.remove('slide-out-right');
    }, 500);
}

// Funktion zum Öffnen des Add Task Overlays und Laden des HTML-Inhalts
function openAddTaskOverlay(progress) {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');
    overlay.classList.add('slide-in-right');

    // Beispiel für den HTML-Inhalt, der normalerweise in der add_task_board.html-Datei steht
    let htmlContent = `
    <div id="addTaskContainer" class="addTaskContainer">
        <div class="addTaskFlexHeader">
            <h1 class="addTaskH1">Add Task</h1>
        </div>

        <div class="addTaskFlexContainer">
            <div class="contentFlex">
            <div id="addTaskLeftForm" class="addTaskLeftForm">
                <form id="addTaskForm" method="post">
                    <div class="addTaskTitle">
                        <div class="flexhelper">
                            <label for="addTaskTitle">Title</label>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="inputAddTaskTitle">
                            <input type="text" id="addTaskTitle" name="addTaskTitle addTaskInput" placeholder="Enter a title" required>
                        </div>    
                        <span id="taskTitleError" class="d-non">Please enter a title.</span>
                    </div>
    
                    <div class="addTaskDescription">
                        <label for="description">Description</label>
                        <textarea id="description" name="description" placeholder="Enter a description" ></textarea>
                    </div>
    
                    <div id="addTaskAssignedTo" class="addTaskAssignedTo">
                        <label for="assignedto">Assigned to</label>
                            <button id="AssignedToButton" type="button" onclick="showAssignedTo()" class="addTaskAssignedToButton down">Select <img src="./IMGicons/arrow_drop_down.svg" alt="arrow_drop_down"></button>
                        <div id="assignedto" class="assignedto-checkboxes d-non">
                        <!-- Hier werden die Checkboxen dynamisch hinzugefügt -->
                        </div>
                    </div>
               
                <div id="selectedInitials" class="initials-container"></div>
            </div>

            <div class="vertical-line"></div>
    
            <div id="addTaskRightForm" class="addTaskRightForm">
                <form method="post">
                    <div class="addTaskDate">
                        <div class="flexhelper">
                            <label for="prioDate">Due date</label>
                            <span class="asterisk">*</span>
                        </div>    
                        <div class="addTaskDateInner">
                            <!-- <input type="date" id="prioDate" name="prioDate" pattern="\d{2}-\d{2}-\d{4}"> -->
                            <input type="date" id="prioDate" name="prioDate" required>
                        </div>    
                        <span id="duedateError" class="d-non">Please enter a date</span>
                    </div>
                    
    
                    <div class="addTaskPriority">
                        <label for="category">Prio</label>
                        <div class="prioFlex">
                            
                                <button type="button" onclick="setActive(this, 'urgent')" class="addTaskPrioButton prio-urgent">Urgent
                                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_209288_4288)">
                                        <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"/>
                                        <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_209288_4288">
                                        <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button type="button" onclick="setActive(this, 'medium')" class="addTaskPrioButton prio-medium active-medium">Medium <!-- Ja der button muss Aktiv sein ;) -->
                                    <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800"/>
                                        <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800"/>
                                    </svg>
                                </button>
                                <button type="button" onclick="setActive(this, 'low')" class="addTaskPrioButton prio-low">Low
                                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
                                        <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229"/>
                                        </svg>                                        
                                </button>
                                <input type="hidden" id="priority" name="priority">
                            </form>
                            
                        </div>
                    </div>
    
                    <div class="addTaskCategory">
                        <label for="category">Category<span class="asterisk">*</span></label>
                        <select id="category" name="category">
                            <option value="null">Select task Category</option>
                            <option value="Technical Task">Technical Task</option>
                            <option value="User Story">User Story</option>
                        </select>
                        <span id="addTaskCategoryError" class="d-non">Please enter a category</span>
                    </div>
    
                    <div class="addTaskSubtasks">
                        <label for="subtasks">Subtasks</label>
                        <input type="text" id="subtasks" name="subtasks" placeholder="Enter subtasks">
                     
                        <ul  id="subtaskList"></ul>
                        
                    </div>
                </form>
            </div>
        </div>
        <div id="addTaskButtons" class="addTaskRightButtons">
            <div class="flex-asterisk">
                <span class="asterisk">*</span><p class="required">This field is required</p>
            </div>
            <div id="addTaskFlexButtons" class="addTaskFlexButtons">
                <button onclick="clearValue()" id="clearbutton" type="button" class="cancelbutton">Clear X</button>
                <button id="createbutton" type="button" onclick="addTask()" class="createbutton">
                    <p class="create-mobile">Create Task</p>
                    <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
            </div>
        </div>
    </div>
    `;

    let popupContent = document.getElementById('addtaskpopup');
    popupContent.innerHTML = ''; // Leere den bisherigen Inhalt
    popupContent.innerHTML = htmlContent; // Füge den HTML-Inhalt direkt ein
    document.body.style.overflow = 'hidden';
}

// Funktion zum Schließen des Overlays
function closeAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('slide-in-right');
    overlay.classList.add('slide-out-right');
    setTimeout(() => {
        overlay.classList.add('d-none');
        overlay.classList.remove('slide-in-right');
        overlay.classList.remove('slide-out-right');
        document.body.style.overflow = 'auto';
    }, 500);
    
}

// Funktion um auf das Overlay klicken zu können ohne das es sich schließt
function doNotClose(event) {
    event.stopPropagation();
  }


// Funktion zum öffnen einer Task im Board

function openSingleTaskOverlay(taskData, key) {
    let overlay = document.getElementById('overlayforsingletask');
    overlay.classList.remove('d-none');
    overlay.classList.add('slide-in-right');
    
    let popupContent = document.getElementsByClassName('singletaskpopup')[0];
    
    let htmlContent = addSingleTaskForm(taskData, key);
    popupContent.innerHTML = htmlContent;
    document.body.style.overflow = 'hidden';
}



function closeSingleTaskOverlay() {
    let overlay = document.getElementById('overlayforsingletask');
    overlay.classList.remove('slide-in-right');
    overlay.classList.add('slide-out-right');
    setTimeout(() => {
        overlay.classList.add('d-none');
        overlay.classList.remove('slide-in-right');
        let popupContent = document.getElementsByClassName('singletaskpopup')[0];
        popupContent.innerHTML = '';
        document.body.style.overflow = 'auto';
    }, 500);
}



async function deleteTask(taskKey) {
   
    const deleteAPI = `https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes/${taskKey}.json`;

    try {
        const response = await fetch(deleteAPI, {
            method: "DELETE"
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log(`Task with key ${taskKey} deleted successfully`);
            closeSingleTaskOverlay();
            location.reload(); 
        } else {
            console.error("Error deleting task:", response.statusText);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


// Funktion zum Suchen von Tasks


document.addEventListener('DOMContentLoaded', () => {
    // Event-Listener für Echtzeitsuche
    document.querySelector('.inputfieldfindtask').addEventListener('input', findTask);
});

function findTask() {
    let searchInput = document.querySelector('.inputfieldfindtask').value.toLowerCase();
    
    // Leere die Spalten
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inprogress').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    document.getElementById('awaitingfeedback').innerHTML = '';

    let keys = Object.keys(tasks);
    let tasksFound = false; 

    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let task = tasks[key];
        let taskTitle = task.task.toLowerCase(); 
        let taskDescription = task.description.toLowerCase(); 

        // Überprüfe, ob der Titel oder die Beschreibung den Suchbegriff enthalten
        if (taskTitle.includes(searchInput) || taskDescription.includes(searchInput)) {
            tasksFound = true;
            let progress = task.progress;

            // Render die passenden Aufgaben in der entsprechenden Spalte
            if (progress === "todo") {
                document.getElementById('todo').innerHTML += renderDivTodo(task, key);
            }
            if (progress === "inProgress") {
                document.getElementById('inprogress').innerHTML += renderDivInprogress(task, key);
            }
            if (progress === "done") {
                document.getElementById('done').innerHTML += renderDivDone(task, key);
            }
            if (progress === "AwaitingFeedback") {
                document.getElementById('awaitingfeedback').innerHTML += renderDivawaitingfeedback(task, key);
            }
        }
    }

    // Zeige eine Nachricht an, wenn keine Aufgaben gefunden wurden
    if (!tasksFound) {
        document.getElementById('inprogress').innerHTML = '<div class="no-tasksfound-banner">No tasks found</div>';
    }

    // Wenn das Eingabefeld leer ist, lade die ursprünglichen Daten neu
    if (searchInput === '') {
        renderData(taskAPI); 
    }
}

function openMobileMenu(key) {
    alert(key); // das geht jetzt
}
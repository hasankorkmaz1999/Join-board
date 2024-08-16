
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
function openAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');
    overlay.classList.add('slide-in-right');

    // Erstelle ein iframe-Element
    let iframe = document.createElement('iframe');
    iframe.src = 'add_task_board.html'; // Setze die Quelle auf deine HTML-Seite
    iframe.style.width = '100%'; // Setze die Breite des iframes
    iframe.style.height = '100%'; // Setze die Höhe des iframes
    iframe.style.border = 'none'; // Entferne den Rahmen

    // Füge das iframe dem Overlay hinzu
    let popupContent = document.getElementById('addtaskpopup');
    popupContent.innerHTML = ''; // Leere den bisherigen Inhalt
    popupContent.appendChild(iframe);
}

// Funktion zum Schließen des Overlays
function closeAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.add('slide-out-right');
    setTimeout(() => {
        overlay.classList.add('d-none');
        overlay.classList.remove('slide-in-right');
        overlay.classList.remove('slide-out-right');
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
}



function closeSingleTaskOverlay() {
    let overlay = document.getElementById('overlayforsingletask');
    overlay.classList.add('d-none');
    let popupContent = document.getElementsByClassName('singletaskpopup')[0];
    popupContent.innerHTML = '';
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


function findTask() {
    let searchInput = document.querySelector('.inputfieldfindtask').value.toLowerCase();
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

        
        if (taskTitle.includes(searchInput) || taskDescription.includes(searchInput)) {
            tasksFound = true;
            let progress = task.progress;
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

    if (!tasksFound) {
        document.getElementById('inprogress').innerHTML = '<div class="no-tasksfound-banner">No tasks found</div>';
    }

    if (searchInput === '') {
        renderData(taskAPI); 
    }
}


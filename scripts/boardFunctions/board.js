let taskAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
let contactAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(taskAPI);
}

async function renderData(URL) {
    let data = await loadData(URL);
    console.log(data);
    let content = document.getElementById('renderData');
    if (data) {
        renderTaskData(data, content);
    }
}

function disableSpinner() {
    let element = document.getElementById('spinner');
    if (element === null) {
        console.error("Spinner not found!");
        
    } else {
        element.innerHTML = ``;
    }
}

function renderTaskData(data, content) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let task = data[key];
        let progress = task.progress;
        let todoDIV = document.getElementById('todo');
        let inprogressDIV = document.getElementById('inprogress');
        let doneDIV = document.getElementById('done');
        let awaitingfeedbackDIV = document.getElementById('awaitingfeedback');
        if (progress === "todo") {
            todoDIV.innerHTML += renderDivTodo(task);
        }
        if (progress === "inprogress") {
            inprogressDIV.innerHTML += renderDivInprogress(task);
        }
        if (progress === "done") {
            doneDIV.innerHTML += renderDivDone(task);
        }
        if (progress === "awaitingfeedback") {
            awaitingfeedbackDIV.innerHTML += renderDivawaitingfeedback(task);
        }
    }
    disableSpinner();
}

function renderDiv(task) {
 return /*html*/`
    <div class="task-title">${task.title}</div>
    <div class="task-description">${task.description}</div>
    <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
 `
}



// Funktion zum Öffnen des Add Task Overlays und Laden des HTML-Inhalts
function openAddTaskOverlay() {
    // Zeige das Overlay an
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');

    // Container für den dynamisch geladenen Inhalt
    let popupContent = document.getElementsByClassName('addtaskpopup')[0];

    // Rufe die addTaskForm Funktion auf, um den HTML-Inhalt zu erhalten
    let htmlContent = addTaskForm();

    // Füge den HTML-Inhalt in das popupContent Div ein
    popupContent.innerHTML = htmlContent;
}

// Funktion zum Schließen des Overlays
function closeAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.add('d-none');

    // Entfernt den dynamisch eingefügten Inhalt
    let popupContent = document.getElementsByClassName('addtaskpopup')[0];
    popupContent.innerHTML = '';
}

// Funktion um auf das Overlay klicken zu können ohne das es sich schließt

function doNotClose(event) {
    event.stopPropagation();
  }
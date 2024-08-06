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
        let taskDiv = document.getElementById('renderData');
        taskDiv.innerHTML += renderDiv(task);
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

// Funktion zum öffnen des Add Task Overlays

function openAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');
    overlay.classList.add('slide-in-right');
    
    // Container, in den der addTaskContainer eingefügt werden soll
    let popupContent = document.querySelector('.addtaskpopup');

    // Der Inhalt, der eingefügt werden soll
    let addTaskContent = document.getElementById('addTaskContainer');
    
    if (addTaskContent) {
        popupContent.innerHTML = ''; // Vorherigen Inhalt entfernen, falls vorhanden
        popupContent.appendChild(addTaskContent.cloneNode(true)); // Inhalt einfügen
    }
}

function closeAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.add('d-none');
    overlay.classList.remove('slide-in-right');
    overlay.classList.add('slide-out-right');
    
    // Den Inhalt des Popups leeren oder anderweitig behandeln, falls nötig
    let popupContent = document.querySelector('.addtaskpopup');
    popupContent.innerHTML = ''; // Entfernt den dynamisch eingefügten Inhalt
}

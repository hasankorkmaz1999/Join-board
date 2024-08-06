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



// Funktion zum Öffnen des Add Task Overlays und Laden des HTML-Inhalts
function openAddTaskOverlay() {
    // Zeige das Overlay an
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.remove('d-none');

    // Container für den dynamisch geladenen Inhalt
    let popupContent = document.getElementsByClassName('addtaskpopup')[0];

    // AJAX Request, um den Inhalt aus addtask.html zu laden
    fetch('add_task.html')
        .then(response => response.text())
        .then(html => {
            // Erstelle ein temporäres DOM-Element, um den HTML-Text zu parsen
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;

            // Suche nach dem addTaskContainer und füge ihn ein
            let addTaskContent = tempDiv.getElementsByTagName('div');
            for (let i = 0; i < addTaskContent.length; i++) {
                if (addTaskContent[i].id === 'addTaskContainer') {
                    popupContent.innerHTML = ''; // Vorherigen Inhalt entfernen
                    popupContent.appendChild(addTaskContent[i]); // Inhalt einfügen
                    break;
                }
            }
        })
        .catch(error => {
            console.error('Error loading add task content:', error);
        });
}

// Funktion zum Schließen des Overlays
function closeAddTaskOverlay() {
    let overlay = document.getElementById('overlayforaddtask');
    overlay.classList.add('d-none');

    // Entfernt den dynamisch eingefügten Inhalt
    let popupContent = document.getElementsByClassName('addtaskpopup')[0];
    popupContent.innerHTML = '';
}

const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(assignedtoAPI);
    addCheckboxEventListeners();
/*     displayInitials(); */
}

  /* Auswahlbutton in addTask: Low, Medium, Urgent */
  function setActive(button, priority) {

    let buttons = document.querySelectorAll('.addTaskPrioButton');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
    });

    button.classList.add(`active-${priority}`);

    let priorityInput = document.getElementById('priority');
    priorityInput.value = priority;
    }

// Ich habe es vorher mit einer Bibliothek versucht namens Flatpickr. Es hat leider nicht funktioniert. 
// Flatpickr-Initialisierung wurde entfernt und stattdessen native Date-Picker-Validierung hinzugefügt.
document.addEventListener('DOMContentLoaded', function() {
    // Bereits vorhandener Code zur Verarbeitung der zugewiesenen Personen das doppelt vergeben war (siehe Zeile 49)
    let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
    let assignedto = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);
    console.log(assignedto);
});

function validateDate(dateStr) {
    let errorSpan = document.getElementById('duedateError');
    let selectedDate = new Date(dateStr);
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Setzt die Zeit auf 00:00, um nur das Datum zu vergleichen

    if (selectedDate < today) {
        errorSpan.textContent = "Bitte wählen Sie ein gültiges Datum.";
        errorSpan.style.color = '#FF7A00'; // Setzt die Farbe des Textes auf orange
        errorSpan.classList.remove('d-non');
        throw new Error("Das ausgewählte Datum liegt in der Vergangenheit.");
    } else {
        errorSpan.classList.add('d-non');
        return true;
    }
}

    // document.addEventListener('DOMContentLoaded', function() {
    //     let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
    //     let assignedto = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);
    //     console.log(assignedto);
    //     });

function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 3600);
}

async function renderData(URL) {
    try {
        let data = await loadData(URL);
        console.log(data);
        let content = document.getElementById('assignedto');
        if (data) {
            getAssignedTo(data, content);
        }
    } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
    }
}

async function loadData(URL) {
    try {
        let response = await fetch(URL + ".json");
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht in Ordnung');
        }
        return await response.json();
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
        throw error;
    }
}

/* !!!!Hier werden die farbe generiert!!!! */

function getAvatarColor(id) {
    if (!avatarColorsMap[id]) {
        avatarColorsMap[id] = avatarColors();
    }
    return avatarColorsMap[id];
}


const avatarColorsMap = {};


function avatarColors() {
    const colors = [
        '#FF7A00', '#FF5EB3', '#6E52FF', '#00BEE8', '#C3FF2B', '#FF4646'
    ];
    let colorIndex = (lastColorIndex + 1) % colors.length;
    lastColorIndex = colorIndex;
    return colors[colorIndex];
}
    let lastColorIndex = -1;

/* !!!!Farbe generator ende!!!! */

// Initialen (Avatare unter assignedTo)
function getInitials(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

function displayInitials(divID) {

    let color = getAvatarColor(divID);
    let initialsContainer = document.getElementById('selectedInitials');
    initialsContainer.innerHTML = '';

    let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
    assignedToCheckboxes.forEach(checkbox => {
        let initials = getInitials(checkbox.value);
        initialsContainer.innerHTML += `
        <span style="background-color: ${color}" class="initial-circle">${initials}</span>
        `;
    });
}


function addCheckboxEventListenersForStyling() {
    let checkboxes = document.querySelectorAll('input[name="assignedto"]');
    if (checkboxes.length === 0) {
        return;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            const parentLabel = checkbox.closest('.assignedto-item');
            if (!parentLabel) {
                console.error('Kein Eltern-Element mit der Klasse "assignedto-item" gefunden.');
                return;
            }

            if (checkbox.checked) {
                parentLabel.style.backgroundColor = '#2A3647';
                parentLabel.style.color = 'white';
            } else {
                parentLabel.style.backgroundColor = '';
                parentLabel.style.color = '';
            }
        });
    });
}

function addCheckboxEventListeners() {
    let checkboxes = document.querySelectorAll('input[name="assignedto"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const parentDiv = checkbox.closest('.assignedto-item');
            if (!parentDiv) {
                console.error('Kein Eltern-Element mit der Klasse "assignedto-item" gefunden.');
                return;
            }

            const divID = parentDiv.firstElementChild.id; 
            displayInitials(divID);
        });
    });
}

async function getAssignedTo(data, content) {
    let key = Object.keys(data);
    for (let i = 0; i < key.length; i++) {
        let assignedTo = data[key[i]];
        content.innerHTML += renderContacts(assignedTo, key[i]);
    }
    addCheckboxEventListeners();
    addCheckboxEventListenersForStyling() // Needed, Finger weg!
}
// End: Initialen


// Render Contacts so optimiert, dass man die initialien einsehen kann bei Assigned to
function renderContacts(assignedTo, key) {
    let initials = assignedTo.name.split(' ').map(name => name[0]).join('');
    const color = getAvatarColor(key);
    return /*html*/`
        <label for="${key}" class="assignedto-item">
            <div id="avatar" class="avatar" style="background-color: ${color};">
                ${initials}
            </div>
            <span>${assignedTo.name}</span>
            <input type="checkbox" class="assignedCheckbox" id="${key}" name="assignedto" value="${assignedTo.name}">
        </label>
    `;
}


async function addTask() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;

        // Validierung des Datums

        validateDate(date);

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
        forward("../board.html");
        toastMessage("New task added successfully!");

    } catch (error) {
        console.warn("Error during validation or when adding the task (Are all mandatory fields filled in?):", error);
        toastMessage("Error adding task. Please try again.");
    }

}

document.getElementById("subtasks").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const subtaskInput = event.target;
        const subtaskTitle = subtaskInput.value.trim();
        
        if (subtaskTitle) {
            addSubtaskToList(subtaskTitle);
            subtaskInput.value = '';
        }
    }
});

function addSubtaskToList(title) {
    const subtaskList = document.getElementById("subtaskList");
    const listItem = document.createElement("li");
    listItem.innerHTML =  /*html*/`
    <div class="subtaskcontainer">
        <span class="subtask-title">${title}</span>
        <input type="text" class="edit-input" value="${title}" style="display:none;"></input>
        <div class="editanddeletebuttonsub">
        <img src="../../IMGicons/edit.svg" alt="edit" class="edit-btn">
        <img src="../../IMGicons/delete.svg" alt="delete" class="delete-btn">
        </div>
    </div>   
    `

    // Event Listener für den Edit Button
    listItem.querySelector(".edit-btn").addEventListener("click", function() {
        const titleSpan = listItem.querySelector(".subtask-title");
        const editInput = listItem.querySelector(".edit-input");
        if (editInput.style.display === "none") {
            editInput.style.display = "inline-block";
            titleSpan.style.display = "none";
            this.textContent = "Save";
        } else {
            titleSpan.textContent = editInput.value;
            editInput.style.display = "none";
            titleSpan.style.display = "inline-block";
            this.textContent = "Edit";
        }
    });

    // Event Listener für den Delete Button
    listItem.querySelector(".delete-btn").addEventListener("click", function() {
        subtaskList.removeChild(listItem);
    });

    subtaskList.appendChild(listItem);
}

function showAssignedTo() {
    let assignedto = document.getElementById('assignedto');
    let arrowrInButton = document.getElementById('AssignedToButton');
    let assignedToItems = document.querySelectorAll('.assignedto-item');

    if (assignedto.classList.contains('d-flex')) {
        assignedto.classList.remove('d-flex');
        assignedto.classList.add('d-non');
        arrowrInButton.classList.add('down');
        arrowrInButton.classList.remove('up');
        
        // Entferne die .active Klasse von allen .assignedto-item Elementen / Ich war hier. Gruß Tay! :-)
        // assignedToItems.forEach(item => {
        //     item.classList.remove('active');
        // });
    } else {
        assignedto.classList.remove('d-non');
        assignedto.classList.add('d-flex');
        arrowrInButton.classList.add('up');
        arrowrInButton.classList.remove('down');
        
        // Füge einen Event-Listener für Klicks auf jedes .assignedto-item Element hinzu
        assignedToItems.forEach(item => {
            item.addEventListener('click', function() {
                // Entferne die .active Klasse von allen .assignedto-item Elementen
                assignedToItems.forEach(innerItem => {
                    innerItem.classList.remove('active');
                });
                
                // Füge die .active Klasse nur dem angeklickten Element hinzu
                this.classList.add('active');
            });
        });
    }
}


// Funktion zum Zurücksetzen des Formulars
document.addEventListener('DOMContentLoaded', function() { 
    function clearAddTaskForm() {
        let form = document.getElementById('addTaskForm');
        if (form) {
            form.reset(); 
        } else {
            console.error("Formular nicht gefunden!");
        }
    }
try {
    document.getElementById('clearbutton').addEventListener('click', function(event) {
        event.preventDefault(); 
        clearAddTaskForm();
    });
} catch (error) {
    console.log("%cIframe detected therefore the function clearbutton is not possible", `
        background: #99cc33;
        padding: .5rem 1rem;
        color: #fff;
        font-weight: bold;
        text-align: center;
        border-radius: 4px;
       `);
    
}

});


function clearValue() {
    document.getElementById('addTaskTitle').value = '';
    document.getElementById('description').value = '';
    document.getElementById('prioDate').value = '';
    document.getElementById('category').selectedIndex = 0;
    document.getElementById('subtaskList').innerHTML = ``;
}
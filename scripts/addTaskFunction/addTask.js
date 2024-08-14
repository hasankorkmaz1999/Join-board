const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(assignedtoAPI);
}

  /* Auswahlbutton in addTask: Low, Medium, Urgent
        *******************************************************/
  function setActive(button, priority) {

    let buttons = document.querySelectorAll('.addTaskPrioButton');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
    });

    button.classList.add(`active-${priority}`);

    let priorityInput = document.getElementById('priority');
    priorityInput.value = priority;
    }

    document.addEventListener('DOMContentLoaded', function() {
        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedto = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);
        console.log(assignedto);
        });

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
        <span style="${divID}" class="initial-circle">${initials}</span>
        `;
    });
}

function addCheckboxEventListeners() {
    let checkboxes = document.querySelectorAll('input[name="assignedto"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const parentDiv = event.target.closest('.assignedto-item');
            const divID = parentDiv.firstElementChild.attributes[1].nodeValue;
            displayInitials(divID);
        });
    });
}

/* firstElementChild.attributes[1].nodeValue */

window.onload = async function() {
    await init();
    displayInitials();
};

async function getAssignedTo(data, content) {
    let key = Object.keys(data);
    for (let i = 0; i < key.length; i++) {
        let assignedTo = data[key[i]];
        content.innerHTML += renderContacts(assignedTo, key[i]);
    }
    addCheckboxEventListeners();
}
// End: Initialen


// Render Contacts so optimiert, dass man die initialien einsehen kann bei Assigned to
function renderContacts(assignedTo, key) {
    let initials = assignedTo.name.split(' ').map(name => name[0]).join('');
    const color = getAvatarColor(key);
    return /*html*/`
        <div class="assignedto-item">
            <div id="avatar" class="avatar" style="background-color: ${color};">
                ${initials}
            </div>
            <input type="checkbox" class="assignedCheckbox" id="${key}" name="assignedto" value="${assignedTo.name}">
            <label for="${key}">${assignedTo.name}</label>
        </div>
    `;
}


async function addTask() {
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



/* Auswahlbutton in addTask: Low, Medium, Urgent test
*******************************************************/
function setActive(button, priority) {

let buttons = document.querySelectorAll('.addTaskPrioButton');
buttons.forEach(btn => {
    btn.classList.remove('active-urgent', 'active-medium', 'active-low');
});

button.classList.add(`active-${priority}`);

let priorityInput = document.getElementById('priority');
priorityInput.value = priority;
}




document.addEventListener('DOMContentLoaded', function() {
let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
let assignedto = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);
console.log(assignedto);
});


function showAssignedTo() {
    let assignedto = document.getElementById('assignedto');
    let arrowrInButton = document.getElementById('AssignedToButton');
    let assignedToItems = document.querySelectorAll('.assignedto-item');

    if (assignedto.classList.contains('d-flex')) {
        assignedto.classList.remove('d-flex');
        assignedto.classList.add('d-non');
        arrowrInButton.classList.add('down');
        arrowrInButton.classList.remove('up');
        
        // Entferne die .active Klasse von allen .assignedto-item Elementen
        assignedToItems.forEach(item => {
            item.classList.remove('active');
        });
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

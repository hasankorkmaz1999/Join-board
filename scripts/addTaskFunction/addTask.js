const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(assignedtoAPI);
}

async function renderData(URL) {
    let data = await loadData(URL);
    console.log(data);
    let content = document.getElementById('assignedto');
    if (data) {
        getAssignedTo(data, content);
    }
}

async function getAssignedTo(data, content) {
    let key = Object.keys(data);
    console.log(key);
    for (let i = 0; i < key.length; i++) {
        let assignedTo = data[key[i]];
        content.innerHTML += renderContacts(assignedTo, key[i]);
    }
}

function renderContacts(assignedTo, key) {
    return `
        <div class="assignedto-item">
            <input type="checkbox" class="assignedCheckbox" id="${key}" name="assignedto" value="${assignedTo.name}">
            <label for="${key}">${assignedTo.name}</label>
        </div>
    `;
}

async function addTask() {
    let task = document.getElementById("addTaskTitle").value;
    let date = document.getElementById("prioDate").value;
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let subtasks = document.getElementById("subtasks").value;

    let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
    let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

    if (!task || !date || !priority || !category || assignedTo.length === 0) {
        console.error("Error: One or more required fields are null.");
        return;
    }

    let data = {
        task: task,
        priority: priority,
        category: category,
        assignedto: assignedTo.map(name => ({ name })),
        description: description,
        subtasks: [{ itsdone: false, title: subtasks }],
        progress: "todo",
        duedate: date,
    };

    try {
        let response = await fetch(addAPI+".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        await response.json();
    } catch (error) {
        console.error("OH HIER IST EIN FEHLER PASSIERT :(", error);
    }
}

function showAssignedTo() {
    let assignedto = document.getElementById('assignedto');
    let arrowrInButton = document.getElementById('AssignedToButton'); 
    if (assignedto.classList.contains('d-flex')) {
        assignedto.classList.remove('d-flex');
        assignedto.classList.add('d-non');
        arrowrInButton.classList.add('down');
        arrowrInButton.classList.remove('up');
    } else {
        assignedto.classList.remove('d-non');
        assignedto.classList.add('d-flex');
        arrowrInButton.classList.add('up');
        arrowrInButton.classList.remove('down');
    }
}


// Initialen (Avatare unter assignedTo)
function getInitials(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

function displayInitials() {
    let initialsContainer = document.getElementById('selectedInitials');
    initialsContainer.innerHTML = '';

    let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
    assignedToCheckboxes.forEach(checkbox => {
        let initials = getInitials(checkbox.value);
        initialsContainer.innerHTML += `<span class="initial-circle">${initials}</span>`;
    });
}

function addCheckboxEventListeners() {
    let checkboxes = document.querySelectorAll('input[name="assignedto"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            displayInitials();
        });
    });
}

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


function showAddTaskOverlay() {
    let editWindow = document.getElementById('overlayAddTask');
    editWindow.classList.remove('d-none');
    editWindow.classList.add('slide-in-right');
}

function closeAddTaskOverlay() {
    let divID = document.getElementById('overlayAddTask');
    divID.classList.add('slide-out-right');
    setTimeout(() => {
        let divID = document.getElementById('overlayAddTask');
        divID.classList.add('d-none');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}
// End: Initialen
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
            <label for="${key}">${assignedTo.name}</label>
            <input type="checkbox" class="assignedCheckbox" id="${key}" name="assignedto" value="${assignedTo.name}">
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
        date: date,
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
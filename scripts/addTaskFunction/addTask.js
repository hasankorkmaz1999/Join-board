const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(assignedtoAPI);
    setupPriorityButtons();
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
        content.innerHTML += renderContacts(assignedTo);
    }
}

function renderContacts(assignedTo) {
    return /*html*/`
        <option value="${assignedTo.name}">${assignedTo.name}</option>
    `;
}

async function addTask() {
    let task = document.getElementById("addTaskTitle").value;
    let date = document.getElementById("prioDate").value;
    let priority = document.getElementById("priority").value;
    let category = document.getElementById("category").value;
    let assignedTo = document.getElementById("assignedto").value;
    let description = document.getElementById("description").value;
    let subtasks = document.getElementById("subtasks").value;

    if (!task || !date || !priority || !category || !assignedTo) {
        console.error("Error: One or more required fields are null.");
        return;
    }

    let data = {
        task: task,
        date: date,
        priority: priority,
        category: category,
        assignedto: { name: assignedTo },
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
// Das ist ein Test für mich
const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(assignedtoAPI);
    setupPriorityButtons();
}

async function renderData(URL) {
    let data = await loadData(URL);
    console.log('Fetched data for assigned to:', data);
    let content = document.getElementById('assignedto');
    if (data) {
        getAssignedTo(data, content);
    }
}

async function getAssignedTo(data, content) {
    let key = Object.keys(data);
    console.log('Keys:', key);
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
        alert("Please fill in all required fields.");
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
        let response = await fetch(addAPI + ".json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            let responseData = await response.json();
            console.log('Task added successfully:', responseData);
            alert("Task added successfully!");
        } else {
            throw new Error('Failed to add task.');
        }
    } catch (error) {
        console.error("Error while adding task:", error);
        alert("An error occurred while adding the task. Please try again.");
    }
}

async function loadData(url) {
    try {
        let response = await fetch(url + ".json");
        if (response.ok) {
            let data = await response.json();
            return data;
        } else {
            throw new Error('Failed to load data.');
        }
    } catch (error) {
        console.error("Error loading data:", error);
        alert("An error occurred while loading data. Please try again.");
    }
}

function setupPriorityButtons() {
    let buttons = document.querySelectorAll('.addTaskPrioButton');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            setActive(button, button.textContent.toLowerCase());
        });
    });
}

function setActive(button, priority) {
    let buttons = document.querySelectorAll('.addTaskPrioButton');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
    });

    button.classList.add(`active-${priority}`);

    let priorityInput = document.getElementById('priority');
    priorityInput.value = priority;
}

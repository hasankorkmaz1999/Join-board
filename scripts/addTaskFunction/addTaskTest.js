const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(assignedtoAPI);
}

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

// function getAssignedTo(data, content) {
//     let keys = Object.keys(data);
//     console.log(keys);
//     for (let i = 0; i < keys.length; i++) {
//         let assignedTo = data[keys[i]];
//         content.innerHTML += renderContacts(assignedTo, keys[i]);
//     }

//     // Event-Listener nach dem Rendern der Kontakte hinzufügen
//     let checkboxes = document.querySelectorAll('.assignedCheckbox');
//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', function () {
//             let parent = this.parentElement;
//             if (this.checked) {
//                 parent.style.backgroundColor = 'black';
//                 parent.style.color = 'white';
//             } else {
//                 parent.style.backgroundColor = '';
//                 parent.style.color = '';
//             }
//         });
//     });
// }

function getAssignedTo(data, content) {
    let keys = Object.keys(data);
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
        let assignedTo = data[keys[i]];
        content.innerHTML += renderContacts(assignedTo, keys[i]);
    }
    
    // Event-Listener nach dem Rendern der Kontakte hinzufügen
    let items = document.getElementsByClassName('assignedto-item');
    for (let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function (e) {
            // Verhindern, dass das Klicken auf das Element die Checkbox toggelt
            if (e.target.tagName !== 'INPUT') {
                let checkbox = this.getElementsByTagName('input')[0];
                checkbox.checked = !checkbox.checked;
            }
            
            let checkbox = this.getElementsByTagName('input')[0];
            if (checkbox.checked) {
                this.style.backgroundColor = '#2A3647'; // Verwendung des spezifischen Hex-Farbcodes
                this.style.color = 'white';
                checkbox.classList.add('checked');
            } else {
                this.style.backgroundColor = '';
                this.style.color = '';
                checkbox.classList.remove('checked');
            }
        });
    }
}

// Render Contacts so optimiert, dass man die initialien einsehen kann bei Assigned to
function renderContacts(assignedTo, key) {
    let initials = assignedTo.name.split(' ').map(name => name[0]).join('');
    return /*html*/`
        <div class="assignedto-item" style="display: flex; align-items: center; margin-right: 4px; padding-right: 10px; padding: 25px 8px 25px 8px; margin-top: 2px; cursor: pointer;">
            <div class="avatar" style="width: 40px; height: 40px; margin-bottom: 0px; margin-left: 8px; background-color: #29ABE2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                ${initials}
            </div>
            <!-- <label for="${key}" style="flex: 1; cursor: pointer;">${assignedTo.name}</label> -->
            <div style="flex: 1; margin-left: 4px; cursor: pointer;">${assignedTo.name}</div>
            <input type="checkbox" class="assignedCheckbox" id="${key}" name="assignedto" value="${assignedTo.name}" style="cursor: pointer;">
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
        <span class="subtask-title">${title}</span>
        <input type="text" class="edit-input" value="${title}" style="display:none;"></input>
        <img src="../../IMGicons/edit.svg" alt="edit" class="edit-btn">
        <img src="../../IMGicons/delete.svg" alt="delete" class="delete-btn">
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

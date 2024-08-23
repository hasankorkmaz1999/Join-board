const addAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";


window.onload = init;


function init() {
    renderData(assignedtoAPI);
    addCheckboxEventListeners();
    forbiddenCourse();
    initHeader();
}


function forbiddenCourse() {
    try {
        let userID = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        let guestToken = sessionStorage.getItem('guestToken');
        if (userID === null && guestToken === null) {
            window.location.href = './login.html?msg=login_required';
        } else if (guestToken !== null) {
            console.log("Guest access granted");
        }
    } catch (error) {
        console.error("No access to localStorage or sessionStorage possible: ", error);
        window.location.href = './login.html?msg=error_localStorage';
    }
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

    
function validateDate(dateStr) {
    let errorSpan = document.getElementById('duedateError');
    let selectedDate = new Date(dateStr);
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        errorSpan.textContent = "Please select a valid date in the present or future";
        errorSpan.style.color = '#FF7A00';
        errorSpan.classList.remove('d-non');
        throw new Error("The selected date is in the past.");
    } else {
        errorSpan.classList.add('d-non');
        return true;
    }
}


function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 3600);
}


async function renderData(URL) {
    try {
        let data = await loadData(URL);
        let content = document.getElementById('assignedto');
        if (data) {
            getAssignedTo(data, content);
        }
    } catch (error) {
        console.error("Error loading the data:", error);
    }
}


async function loadData(URL) {
    try {
        let response = await fetch(URL + ".json");
        if (!response.ok) {
            throw new Error('Network response was not in order');
        }
        return await response.json();
    } catch (error) {
        console.error("Error when retrieving the data:", error);
        throw error;
    }
}


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
                console.error('no elements found with ID "assignedto-item"');
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
                console.error('No parent element with the class "assignedto-item" found.');
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
    addCheckboxEventListenersForStyling()
}



document.addEventListener('DOMContentLoaded', () => {
    function updateAssignedToItems() {
        const assignedToItems = document.querySelectorAll('.assignedto-item');

        assignedToItems.forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            item.addEventListener('click', (event) => {
                if (event.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change')); 
                }
            });
        });
    }

    updateAssignedToItems();
});


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
            <div class="checkbox-label"></div> <!-- Needed!!!! -->
        </label>
    `;
}


async function addTask() {
    try {
        const sanitizedValues = await validateAndSanitizeForm();
        const task = sanitizedValues.taskTitle;
        const date = sanitizedValues.date;

        validateDate(date);

        const priority = document.getElementById("priority").value;
        const category = sanitizedValues.category;
        const description = sanitizedValues.description;

        let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
        let assignedTo = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);

        const subtaskElements = document.querySelectorAll("#subtaskList li");
        const subtasks = Array.from(subtaskElements).map(item => ({
            itsdone: false,
            title: item.textContent.trim()
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
        forward("../board.html");
        toastMessage("New task added successfully!");

    } catch (error) {
        console.warn("Error during validation or when adding the task (Are all mandatory fields filled in?):", error);
        toastMessage("Error adding task. Please try again.");
    }
}


function toggleCheckmark(inputElement) {
    const checkIcon = document.getElementById('checkIcon');
    const closeIcon = document.getElementById('closeIcon');
    const lineDivider = document.getElementById('lineDivider');
    
    if (inputElement.value.trim() !== "") {
        checkIcon.style.display = 'inline'; 
        closeIcon.style.display = 'inline'; 
        lineDivider.style.display = 'inline'; 
    } else {
        checkIcon.style.display = 'none';
        closeIcon.style.display = 'none'; 
        lineDivider.style.display = 'none'; 
    }
}

document.getElementById('subtasks').addEventListener('input', function() {
    const inputField = this;

    if (inputField.value.trim() !== "") {
        inputField.classList.add('no-plus');
    } else {
        inputField.classList.remove('no-plus');
    }
});


document.getElementById('checkIcon').addEventListener('click', function() {
    
    const subtaskInput = document.getElementById('subtasks');
    const subtaskTitle = subtaskInput.value.trim();

    if (subtaskTitle) {
        addSubtaskToList(subtaskTitle); 
        subtaskInput.value = ''; 
        toggleCheckmark(subtaskInput); 
        subtaskInput.classList.remove('no-plus');
    }
});


document.getElementById('closeIcon').addEventListener('click', function() {
    const subtaskInput = document.getElementById('subtasks');
    subtaskInput.value = ''; 
    toggleCheckmark(subtaskInput); 
    subtaskInput.classList.add('no-plus');
});


document.getElementById("subtasks").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const subtaskInput = event.target;
        const subtaskTitle = subtaskInput.value.trim();
        
        if (subtaskTitle) {
            addSubtaskToList(subtaskTitle);
            subtaskInput.value = '';
            toggleCheckmark(subtaskInput); 
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
            <img src="../../IMGicons/contacticons/check.png" alt="save" class="save-btn" style="display:none;">

        </div>
    </div>   
    `;

   
    const subtaskContainer = listItem.querySelector('.subtaskcontainer');
    const editButton = listItem.querySelector(".edit-btn");
    const saveButton = listItem.querySelector(".save-btn");
    const titleSpan = listItem.querySelector(".subtask-title");
    const editInput = listItem.querySelector(".edit-input");

    editButton.addEventListener("click", function() {
        editInput.style.display = "inline-block";
        titleSpan.style.display = "none";
        editButton.style.display = "none"; 
        saveButton.style.display = "inline-block"; 
        subtaskContainer.classList.add('editing');
    });

    
    saveButton.addEventListener("click", function() {
        titleSpan.textContent = editInput.value;
        editInput.style.display = "none";
        titleSpan.style.display = "inline-block";
        saveButton.style.display = "none"; 
        editButton.style.display = "inline-block";
        subtaskContainer.classList.remove('editing'); 
    });

    
    listItem.querySelector(".delete-btn").addEventListener("click", function() {
        subtaskList.removeChild(listItem);
    });

    subtaskList.appendChild(listItem);
}


let isAssignedToListOpen = false;


function showAssignedTo() {
    let assignedto = document.getElementById('assignedto');
    let arrowrInButton = document.getElementById('AssignedToButton');

    if (assignedto.classList.contains('d-flex')) {
        assignedto.classList.remove('d-flex');
        assignedto.classList.add('d-non');
        arrowrInButton.classList.add('down');
        arrowrInButton.classList.remove('up');
        isAssignedToListOpen = false;
        document.removeEventListener('click', closeAssignedToOnClickOutside);
    } else {
        assignedto.classList.remove('d-non');
        assignedto.classList.add('d-flex');
        arrowrInButton.classList.add('up');
        arrowrInButton.classList.remove('down');
        isAssignedToListOpen = true;
        setTimeout(() => {
            document.addEventListener('click', closeAssignedToOnClickOutside);
        }, 0);
    }
}


function closeAssignedToOnClickOutside(event) {
    let assignedto = document.getElementById('assignedto');
    let AssignedToButton = document.getElementById('AssignedToButton');
    if (!assignedto.contains(event.target) && !AssignedToButton.contains(event.target)) {
        assignedto.classList.remove('d-flex');
        assignedto.classList.add('d-non');
        AssignedToButton.classList.add('down');
        AssignedToButton.classList.remove('up');
        isAssignedToListOpen = false;
        document.removeEventListener('click', closeAssignedToOnClickOutside);
    }
}


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
    document.getElementById('assignedto').innerHTML = ``;
    document.getElementById('selectedInitials').innerHTML = ``;
    document.querySelector('.prioFlex').innerHTML = ``;
    document.querySelector('.prioFlex').innerHTML = resetKnopf();
    init();
}
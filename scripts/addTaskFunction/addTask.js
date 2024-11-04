const addAPI = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const assignedtoAPI = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

/**
 * Initializes the add task form by rendering the assigned-to data, adding event listeners, and checking user access.
 */
function init() {
    renderData(assignedtoAPI);
    addCheckboxEventListeners();
    forbiddenCourse();
    initHeader();
}

/**
 * Checks if the user has permission to access the page.
 * Redirects to the login page if no valid user ID or guest token is found.
 */
function forbiddenCourse() {
    try {
        let userID = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        let guestToken = sessionStorage.getItem('guestToken');
        if (userID === null && guestToken === null) {
            window.location.href = './login.html?msg=login_required';
        } else if (guestToken !== null) {
        }
    } catch (error) {
        window.location.href = './login.html?msg=error_localStorage';
    }
}

/**
 * Sets the active priority button and updates the hidden input value.
 * 
 * @param {HTMLElement} button - The button element that was clicked.
 * @param {string} priority - The priority level ('urgent', 'medium', 'low').
 */
function setActive(button, priority) {
    let buttons = document.querySelectorAll('.addTaskPrioButton');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
    });

    button.classList.add(`active-${priority}`);

    let priorityInput = document.getElementById('priority');
    priorityInput.value = priority;
}

/**
 * Validates the selected due date to ensure it is in the present or future.
 * Displays an error message if the date is invalid.
 * 
 * @param {string} dateStr - The due date string in ISO format.
 * @returns {boolean} True if the date is valid; otherwise, false.
 */
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

/**
 * Reloads the page after a delay.
 */
function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 3600);
}

/**
 * Fetches and renders the data for the assigned-to dropdown.
 * 
 * @param {string} URL - The API endpoint from which to fetch the assigned-to data.
 */
async function renderData(URL) {
    try {
        let data = await loadData(URL);
        let content = document.getElementById('assignedto');
        if (data) {
            getAssignedTo(data, content);
        }
    } catch (error) {
    }
}

/**
 * Fetches data from a specified URL and returns it as JSON.
 * 
 * @param {string} URL - The API endpoint from which to fetch data.
 * @returns {Promise<object>} The fetched data as a JSON object.
 */
async function loadData(URL) {
    try {
        let response = await fetch(URL + ".json");
        if (!response.ok) {
            throw new Error('Network response was not in order');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

/**
 * Returns the avatar color associated with the given ID. If no color is associated, generates and stores a new one.
 * 
 * @param {string} id - The ID for which to get the avatar color.
 * @returns {string} The avatar color in hex format.
 */
function getAvatarColor(id) {
    if (!avatarColorsMap[id]) {
        avatarColorsMap[id] = avatarColors();
    }
    return avatarColorsMap[id];
}

const avatarColorsMap = {};

/**
 * Cycles through a predefined set of colors and returns the next color in the sequence.
 * 
 * @returns {string} The next avatar color in hex format.
 */
function avatarColors() {
    const colors = [
        '#FF7A00', '#FF5EB3', '#6E52FF', '#00BEE8', '#C3FF2B', '#FF4646'
    ];
    lastColorIndex = (lastColorIndex + 1) % colors.length;
    return colors[lastColorIndex];
}

let lastColorIndex = -1;

/**
 * Generates initials from a given name. The initials are created from the first letter of each word in the name.
 * 
 * @param {string} name - The name from which to generate initials.
 * @returns {string} The generated initials.
 */
function getInitials(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

/**
 * Displays the initials of the selected assigned-to contacts.
 * 
 * @param {string} divID - The ID of the div element that triggered the display.
 */
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

/**
 * Adds event listeners to the assigned-to checkboxes for styling purposes.
 */
function addCheckboxEventListenersForStyling() {
    let checkboxes = document.querySelectorAll('input[name="assignedto"]');
    if (checkboxes.length === 0) {
        return;
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(event) {
            const parentLabel = checkbox.closest('.assignedto-item');
            if (!parentLabel) {
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

/**
 * Adds event listeners to the assigned-to checkboxes for displaying initials.
 */
function addCheckboxEventListeners() {
    let checkboxes = document.querySelectorAll('input[name="assignedto"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const parentDiv = checkbox.closest('.assignedto-item');
            if (!parentDiv) {
                return;
            }

            const divID = parentDiv.firstElementChild.id;
            displayInitials(divID);
        });
    });
}

/**
 * Renders the contacts for the assigned-to section and adds them to the DOM.
 * 
 * @param {object} data - The data object containing the contact information.
 * @param {HTMLElement} content - The DOM element where the contacts will be rendered.
 */
async function getAssignedTo(data, content) {
    let key = Object.keys(data);
    for (let i = 0; i < key.length; i++) {
        let assignedTo = data[key[i]];
        content.innerHTML += renderContacts(assignedTo, key[i]);
    }
    addCheckboxEventListeners();
    addCheckboxEventListenersForStyling();
}

/**
 * Renders the HTML for a contact in the assigned-to section.
 * 
 * @param {object} assignedTo - The contact object containing the name and other details.
 * @param {string} key - The key of the contact.
 * @returns {string} The HTML string for the contact item.
 */
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

/**
 * Adds a new task to the server by validating the form data and sending it via a POST request.
 * Displays a success message and redirects to the board page if successful.
 */
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
        toastMessage("Error adding task. Please try again.");
    }
}

/**
 * Toggles the visibility of the checkmark, close icon, and divider line in the subtask input field.
 * 
 * @param {HTMLInputElement} inputElement - The input element in which the user is typing.
 */
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

/**
 * Adds a subtask to the list when the user clicks the check icon.
 */
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

/**
 * Clears the subtask input field when the user clicks the close icon.
 */
document.getElementById('closeIcon').addEventListener('click', function() {
    const subtaskInput = document.getElementById('subtasks');
    subtaskInput.value = '';
    toggleCheckmark(subtaskInput);
    subtaskInput.classList.add('no-plus');
});

/**
 * Handles the Enter key press in the subtask input field, adding the subtask to the list if valid.
 * 
 * @param {KeyboardEvent} event - The key press event.
 */
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

/**
 * Adds a subtask to the DOM list with edit and delete functionalities.
 * 
 * @param {string} title - The title of the subtask to add.
 */
function addSubtaskToList(title) {
    const subtaskList = document.getElementById("subtaskList");
    const listItem = document.createElement("li");
    listItem.innerHTML = /*html*/`
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

/**
 * Toggles the visibility of the assigned-to list.
 */
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

/**
 * Closes the assigned-to list if the user clicks outside of it.
 * 
 * @param {Event} event - The click event.
 */
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

/**
 * Clears the add task form when the clear button is clicked.
 */
document.addEventListener('DOMContentLoaded', function() { 
    function clearAddTaskForm() {
        let form = document.getElementById('addTaskForm');
        if (form) {
            form.reset();
        } else {
        }
    }

    try {
        document.getElementById('clearbutton').addEventListener('click', function(event) {
            event.preventDefault();
            clearAddTaskForm();
        });
    } catch (error) {
       
    }
});

/**
 * Clears all input values in the add task form and resets the form elements.
 */
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

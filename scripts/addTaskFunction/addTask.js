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
            // Falls weder userID noch guestToken vorhanden ist, umleiten
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

document.addEventListener('DOMContentLoaded', function() {
    let assignedToCheckboxes = document.querySelectorAll('input[name="assignedto"]:checked');
    let assignedto = Array.from(assignedToCheckboxes).map(checkbox => checkbox.value);
});


function validateDate(dateStr) {
    let errorSpan = document.getElementById('duedateError');
    let selectedDate = new Date(dateStr);
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Setzt die Zeit auf 00:00, um nur das Datum zu vergleichen

    if (selectedDate < today) {
        errorSpan.textContent = "Please select a valid date in the present or future";
        errorSpan.style.color = '#FF7A00';
        errorSpan.classList.remove('d-non');
        throw new Error("Das ausgewählte Datum liegt in der Vergangenheit.");
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
    let assignedToItems = document.querySelectorAll('.assignedto-item');

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


function resetKnopf() {
    return /*html*/`
                                        <button type="button" onclick="setActive(this, 'urgent')" class="addTaskPrioButton prio-urgent">Urgent
                                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_209288_4288)">
                                        <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"/>
                                        <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_209288_4288">
                                        <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <button type="button" onclick="setActive(this, 'medium')" class="addTaskPrioButton prio-medium active-medium">Medium <!-- Ja der button muss Aktiv sein ;) -->
                                    <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800"/>
                                        <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800"/>
                                    </svg>
                                </button>
                                <button type="button" onclick="setActive(this, 'low')" class="addTaskPrioButton prio-low">Low
                                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
                                        <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229"/>
                                        </svg>                                        
                                </button>
                                <input type="hidden" id="priority" name="priority">
                            </form>
    `
}
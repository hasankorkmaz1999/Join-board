/**
 * The URL of the main API endpoint.
 * @constant {string}
 */
let API = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/";
/**
 * The URL of the endpoint for editing contacts.
 * @constant {string}
 */
const editAPI = "demoUser/users/user1ID/contacts";
/**
 * The full URL for editing contacts.
 * @constant {string}
 */
const url = `${API}${editAPI}.json`;
/**
 * Initializes the application and fetches the data.
 * Called when the window is loaded.
 */
window.onload = init;
/**
 * Initializes the application and fetches the data.
 */
function init() {
    renderData(API);
    forbiddenCourse();
    initHeader();
}
let activeContactId = null; // to track the currently active contact

/**
 * Checks if the user has access to the course. If no user ID or guest token is found,
 * redirects to the login page. If a guest token is found, logs a message indicating guest access.
 * If an error occurs while accessing localStorage or sessionStorage, redirects to the login page with an error message.
 */
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
        console.error("Kein Zugriff auf localStorage oder sessionStorage möglich: ", error);
        window.location.href = './login.html?msg=error_localStorage';
    }
}
/**
 * Renders the contact data on the page.
 * @param {string} URL - The URL from which to load the data.
 */
async function renderData(URL) {
    let data = await loadData(URL);
    let content = document.getElementById("renderContacts");
    content.innerHTML = ``;
    if (data) {
        renderContactsData(data, content);
    }
    disableSpinner();
    let addButton = document.getElementById('add-contact-btn');
    addButton.disabled = false;
};
/**
 * Renders the contact data.
 * @param {Object} data - The contact data.
 * @param {HTMLElement} content - The HTML element where the data should be displayed.
 */
function renderContactsData(data, content) {
    let contacts = data.demoUser.users.user1ID.contacts;
    let contactKeys = Object.keys(contacts);
    contactKeys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name));
    let currentLetter = '';
    renderContactsByLetter(contactKeys, contacts, content, currentLetter);
}
/**
 * Renders the contacts sorted by letter.
 * @param {Array} contactKeys - The keys of the contacts.
 * @param {Object} contacts - The contact data.
 * @param {HTMLElement} content - The HTML element where the data should be displayed.
 * @param {string} currentLetter - The current letter being sorted.
 */
function renderContactsByLetter(contactKeys, contacts, content, currentLetter) {
    for (let i = 0; i < contactKeys.length; i++) {
        const element = contacts[contactKeys[i]];
        let firstLetter = element.name.charAt(0).toUpperCase();
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            content.innerHTML += `<div class="alphabet">${currentLetter}</div>`;
        }
        content.innerHTML += renderContact(element, contactKeys[i]);
    }
};
/**
 * Disables the loading spinner.
 */
function disableSpinner() {
    let element = document.getElementById('spinner');
    element.innerHTML = ``;
}
/**
 * Opens the detailed view of a contact.
 * @param {string} id - The ID of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function openContact(id, name, email, phone) {
    deactivatePreviousContact();
    activateCurrentContact(id);
    renderContactDetails(id, name, email, phone);
    contactResponsive(id, name, email, phone);
    mobileButtonChange(true);
    if (window.innerWidth <= 1000) {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('addNewContactMobile').style.display = 'none';
    document.getElementById('footer-mobile').style.display = 'none';
    } else {
        document.getElementById('main-content').style.display = 'block';
        
    }
    
}
/**
 * Deactivates the previous contact.
 */
function deactivatePreviousContact() {
    if (activeContactId) {
        let previousContactElement = document.getElementById(`contact-${activeContactId}`);
        previousContactElement.classList.remove('active');
        let previousContactNameElement = previousContactElement.getElementsByClassName('contact-name')[0];
        previousContactNameElement.style.color = 'black';
    }
}
/**
 * Activates the current contact.
 * @param {string} id - The ID of the contact.
 */
function activateCurrentContact(id) {
    let contactElement = document.getElementById(`contact-${id}`);
    contactElement.classList.add('active');
    activeContactId = id;
    let contactNameElement = contactElement.getElementsByClassName('contact-name')[0];
    contactNameElement.style.color = 'white';
}
/**
 * Renders the detailed view of a contact.
 * @param {string} id - The ID of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function renderContactDetails(id, name, email, phone) {
    const color = document.getElementById(`contact-${id}`).getAttribute('data-color');
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = renderBigView(id, name, email, phone, color);
    activateAnimation();
}
/**
 * Activates the animation of the detailed view.
 */
function activateAnimation() {
    let divID = document.getElementById('contact-container');
    divID.classList.add('slide-in-right');
    divID.classList.add('contact-container');
    setTimeout(() => {
        divID.classList.remove('d-none');
    }, 50);
}
/**
 * Gets the initials of a name.
 * @param {string} name - The name of the contact.
 * @returns {string} The initials of the name.
 */
function getInitials(name) {
    let initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
}
let lastColorIndex = -1;
/**
 * Generates a background color for avatars.
 * @returns {string} The generated color.
 */
function avatarColors() {
    const colors = [
        '#FF7A00', '#FF5EB3', '#6E52FF', '#00BEE8', '#C3FF2B', '#FF4646'
    ];
    let colorIndex = (lastColorIndex + 1) % colors.length;
    lastColorIndex = colorIndex;
    return colors[colorIndex];
}
/**
 * Loads the contact data for editing.
 * @param {string} id - The ID of the contact.
 */
async function editContacts(id) {
    try {
        let data = await loadData(API);
        if (data) {
            loadEditData(data, id);
            showEditOverlay(); // Nur aufrufen, wenn die Daten erfolgreich geladen wurden.
        } else {
            console.error("No data found");
        }
    } catch (error) {
        console.error("Error in editContacts function:", error);
    }
}
/**
 * Loads the data of the contact to be edited.
 * @param {Object} data - The contact data.
 * @param {string} id - The ID of the contact.
 */
function loadEditData(data, id) {
    let contact = data.demoUser.users.user1ID.contacts[id];
    if (contact) {
        let name = contact.name;
        let phone = contact.phone;
        let email = contact.email;
        let renderEditView = document.getElementById('overlayEdit');
        renderEditView.innerHTML = editContactForm(name, phone, email, id);
    } else {
        console.error("No contact found with ID:", id);
    }
}
/**
 * Shows the edit overlay.
 */
function showEditOverlay() {
    let editWindow = document.getElementById('overlayEdit');
    editWindow.classList.remove('d-non');
    editWindow.classList.add('slide-in-right');
}
/**
 * Closes the edit overlay.
 */
function closeEditOverlay() {
    let divID = document.getElementById('overlayEdit');
    divID.classList.add('slide-out-right');
    setTimeout(() => {
        let divID = document.getElementById('overlayEdit');
        divID.classList.add('d-non');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}
/**
 * Finishes editing a contact and saves the changes.
 * @param {string} id - The ID of the contact.
 */
function finishEditContact(id) {
    let { valueName, valueEmail, valuePhone } = getEditInputValues();
    let { nameError, emailError, phoneError } = resetEditErrors();
    let hasError = validateEditInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError);
    if (!hasError) {
        sanitizeAndSaveContact(id, valueName, valueEmail, valuePhone);
    }
    openContact(id, valueName, valueEmail, valuePhone);
}
/**
 * Gets the input values from the edit form.
 * @returns {Object} The input values.
 */
function getEditInputValues() {
    return {
        valueName: document.getElementById('nameValue').value.trim(),
        valueEmail: document.getElementById('emailValue').value.trim(),
        valuePhone: document.getElementById('phoneValue').value.trim()
    };
}
/**
 * Resets the error display in the edit form.
 * @returns {Object} The error display elements.
 */
function resetEditErrors() {
    let nameError = document.getElementById('name-error-edit');
    let emailError = document.getElementById('email-error-edit');
    let phoneError = document.getElementById('phone-error-edit');
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    return { nameError, emailError, phoneError };
}
/**
 * Validates the input values in the edit form.
 * @param {string} valueName - The name of the contact.
 * @param {string} valueEmail - The email address of the contact.
 * @param {string} valuePhone - The phone number of the contact.
 * @param {HTMLElement} nameError - The element for name error display.
 * @param {HTMLElement} emailError - The element for email error display.
 * @param {HTMLElement} phoneError - The element for phone error display.
 * @returns {boolean} Whether there is an error.
 */
function validateEditInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError) {
    let hasError = false;
    if (!isValidLength(valueName, valueEmail, valuePhone)) {
        nameError.innerText = "Name, email, and phone number must each be no more than 30 characters long.";
        nameError.style.display = 'block';
        hasError = true;
    }
    if (!isValidEmail(valueEmail)) {
        emailError.innerText = "Please enter a valid email address.";
        emailError.style.display = 'block';
        hasError = true;
    }
    if (!isValidPhone(valuePhone)) {
        phoneError.innerText = "Phone number can only contain numbers and a +.";
        phoneError.style.display = 'block';
        hasError = true;
    }
    return hasError;
}
/**
 * Sanitizes the input values and saves the contact.
 * @param {string} id - The ID of the contact.
 * @param {string} valueName - The name of the contact.
 * @param {string} valueEmail - The email address of the contact.
 * @param {string} valuePhone - The phone number of the contact.
 */
function sanitizeAndSaveContact(id, valueName, valueEmail, valuePhone) {
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    let updatedContact = { name: valueName, email: valueEmail, phone: valuePhone };
    saveContact(id, updatedContact);
}
/**
 * Saves a contact.
 * @param {string} id - The ID of the contact.
 * @param {Object} contactData - The contact data.
 */
async function saveContact(id, contactData) {
    try {
        let response = await fetch(`${API}${editAPI}/${id}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await response.json();
        init();
        closeEditOverlay();
        toastMessage("Contact has been revised");
    } catch (error) {
        console.error('Error saving contact:', error);
    }
}
/**
 * Add a new contact.
 */
async function createNewContact() {
    let { valueName, valueEmail, valuePhone } = getNewContactInputValues();
    let { nameError, emailError, phoneError } = resetNewContactErrors();
    let hasError = validateNewContactInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError);
    if (!hasError) {
        sanitizeAndCreateContact(valueName, valueEmail, valuePhone);
    }
}
/**
 * Gets the input values from the new contact form.
 * @returns {Object} The input values.
 */
function getNewContactInputValues() {
    return {
        valueName: document.getElementById('inputfiledsname').value.trim(),
        valueEmail: document.getElementById('inputfiledsemail').value.trim(),
        valuePhone: document.getElementById('inputfiledsphone').value.trim()
    };
}
/**
 * Resets the error display in the new contact form.
 * @returns {Object} The error display elements.
 */
function resetNewContactErrors() {
    let nameError = document.getElementById('name-error');
    let emailError = document.getElementById('email-error');
    let phoneError = document.getElementById('phone-error');
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    return { nameError, emailError, phoneError };
}
/**
 * Validates the input values in the new contact form.
 * @param {string} valueName - The name of the contact.
 * @param {string} valueEmail - The email address of the contact.
 * @param {string} valuePhone - The phone number of the contact.
 * @param {HTMLElement} nameError - The element for name error display.
 * @param {HTMLElement} emailError - The element for email error display.
 * @param {HTMLElement} phoneError - The element for phone error display.
 * @returns {boolean} Whether there is an error.
 */
function validateNewContactInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError) {
    let hasError = false;
    if (!isValidLength(valueName, valueEmail, valuePhone)) {
        nameError.innerText = "Name, email, and phone number must each be no more than 30 characters long.";
        nameError.style.display = 'block';
        hasError = true;
    }
    if (!isValidEmail(valueEmail)) {
        emailError.innerText = "Please enter a valid email address.";
        emailError.style.display = 'block';
        hasError = true;
    }
    if (!isValidPhone(valuePhone)) {
        phoneError.innerText = "Phone number can only contain numbers and a +.";
        phoneError.style.display = 'block';
        hasError = true;
    }
    return hasError;
}
/**
 * Sanitizes the input values and creates a new contact.
 * @param {string} valueName - The name of the contact.
 * @param {string} valueEmail - The email address of the contact.
 * @param {string} valuePhone - The phone number of the contact.
 */
function sanitizeAndCreateContact(valueName, valueEmail, valuePhone) {
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    const newContact = { name: valueName, email: valueEmail, phone: valuePhone || '' };
    saveNewContact(newContact);
}
/**
 * Saves a new contact.
 * @param {Object} newContact - The contact data.
 */
async function saveNewContact(newContact) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
    });
    await response.json();
    init();
    closeOverlay();
    toastMessage("Contact successfully created");
    clearNewContactFields();
}
function clearNewContactFields() {
    document.getElementById('inputfiledsname').value = ``;
    document.getElementById('inputfiledsemail').value = ``;
    document.getElementById('inputfiledsphone').value = ``;
}
/**
 * Deletes a contact.
 * @param {string} id - The ID of the contact.
 */
async function deletContacts(id) {
    try {
        let response = await fetch(`${API}${editAPI}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        await response.json();
        init();
        closeEditOverlay();
        toastMessage("Delete Successful");
        reloadPage();
        
    } catch (error) {
        console.error('Error deleting contact:', error);
    }
    
}

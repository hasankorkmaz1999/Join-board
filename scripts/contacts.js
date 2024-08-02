let API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";
let userAPI = "";
let demoAPI = "dummy-user/";
const editAPI = "demoUser/users/user1ID/contacts";
const url = `${API}${editAPI}.json`;

window.onload = init;

// Initialisiert die Anwendung und ruft die Daten ab
function init() {
    renderData(API);
}

let activeContactId = null; // um den aktuell aktiven Kontakt zu verfolgen

// Rendert die Kontaktdaten auf der Seite
async function renderData (URL) {
    let data = await loadData(URL);
    let content = document.getElementById("renderContacts");
    content.innerHTML = ``;
    if (data) {
        renderContactsData(data, content);
    }
    disableSpinner();
    let addButton = document.getElementById('add-contact-btn');
    addButton.disabled = false;
}

function renderContactsData(data, content) {
    let contacts = data.demoUser.users.user1ID.contacts;
    let contactKeys = Object.keys(contacts);
    contactKeys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name));
    let currentLetter = '';
    renderContactsByLetter(contactKeys, contacts, content, currentLetter);
}

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
}

// Deaktiviert den Lade-Spinner
function disableSpinner() {
    let element = document.getElementById('spinner');
    element.innerHTML = ``;
}

// Rendert einen einzelnen Kontakt als HTML
function renderContact(element, id) {
    const color = getAvatarColor(id); // Holt die Farbe für diesen Kontakt

    return /*html*/`
        <div class="contact-item" id="contact-${id}" data-color="${color}" onclick="openContact('${id}', '${element.name}', '${element.email}', '${element.phone}')">
            <div class="avatar" style="background-color: ${color};">${getInitials(element.name)}</div>
            <div class="contact-info">
                <div class="contact-name">${element.name}</div>
                <div class="contact-email">${element.email}</div>
            </div>
        </div>
    `;
}

// Initialisiert ein Objekt, um die Hintergrundfarben der Avatare zu speichern
const avatarColorsMap = {};

// Funktion zum Abrufen oder Generieren einer Hintergrundfarbe für einen Kontakt
function getAvatarColor(id) {
    if (!avatarColorsMap[id]) {
        avatarColorsMap[id] = avatarColors();
    }
    return avatarColorsMap[id];
}

// Öffnet die Detailansicht eines Kontakts
function openContact(id, name, email, phone) {
    deactivatePreviousContact();
    activateCurrentContact(id);
    renderContactDetails(id, name, email, phone);
    contactResponsive(id, name, email, phone);
}

function deactivatePreviousContact() {
    if (activeContactId) {
        let previousContactElement = document.getElementById(`contact-${activeContactId}`);
        previousContactElement.classList.remove('active');
        let previousContactNameElement = previousContactElement.querySelector('.contact-name');
        previousContactNameElement.style.color = 'black';
    }
}

function activateCurrentContact(id) {
    let contactElement = document.getElementById(`contact-${id}`);
    contactElement.classList.add('active');
    activeContactId = id;
    let contactNameElement = contactElement.querySelector('.contact-name');
    contactNameElement.style.color = 'white';
}

function renderContactDetails(id, name, email, phone) {
    const color = document.getElementById(`contact-${id}`).getAttribute('data-color');
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = renderBigView(id, name, email, phone, color);
    activateAnimation();
}

function activateAnimation() {
    setTimeout(() => {
        let divID = document.getElementById('contact-container');
        divID.classList.remove('d-none');
        divID.classList.add('slide-in-right');
        divID.classList.add('contact-container');
    }, 100);
}

// Holt die Initialen eines Namens
function getInitials(name) {
    let initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
}

let lastColorIndex = -1;

// Generiert eine Hintergrundfarbe für Avatare
function avatarColors() {
    const colors = [
        '#FF7A00', '#FF5EB3', '#6E52FF', '#00BEE8', '#C3FF2B', '#FF4646'
    ];
    let colorIndex = (lastColorIndex + 1) % colors.length;
    lastColorIndex = colorIndex;
    return colors[colorIndex];
}

// Öffnet das Overlay zum Hinzufügen eines neuen Kontakts
function addNewContact() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove("d-none");
    overlay.classList.add('slide-in-right');
}

// Schließt das Overlay
function closeOverlay() {
    let divID = document.getElementById('overlay');
    divID.classList.add('slide-out-right');
    setTimeout(() => {
        let divID = document.getElementById('overlay');
        divID.classList.add('d-none');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}

// Lädt die Daten eines Kontakts zum Bearbeiten
async function editContacts(id) {
    try {
        let data = await loadData(API);
        if (data) {
            loadEditData(data, id);
        } else {
            console.error("No data found");
        }
    } catch (error) {
        console.error("Error in editContacts function:", error);
    }
    showEditOverlay();
}

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

function showEditOverlay() {
    let editWindow = document.getElementById('overlayEdit');
    editWindow.classList.remove('d-none');
    editWindow.classList.add('slide-in-right');
}

// Schließt das Bearbeitungs-Overlay
function closeEditOverlay() {
    let divID = document.getElementById('overlayEdit');
    divID.classList.add('slide-out-right');
    setTimeout(() => {
        let divID = document.getElementById('overlayEdit');
        divID.classList.add('d-none');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}

// Beendet das Bearbeiten eines Kontakts und speichert die Änderungen
function finishEditContact(id) {
    let { valueName, valueEmail, valuePhone } = getEditInputValues();
    let { nameError, emailError, phoneError } = resetEditErrors();

    let hasError = validateEditInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError);

    if (!hasError) {
        sanitizeAndSaveContact(id, valueName, valueEmail, valuePhone);
    }
}

function getEditInputValues() {
    return {
        valueName: document.getElementById('nameValue').value.trim(),
        valueEmail: document.getElementById('emailValue').value.trim(),
        valuePhone: document.getElementById('phoneValue').value.trim()
    };
}

function resetEditErrors() {
    let nameError = document.getElementById('name-error-edit');
    let emailError = document.getElementById('email-error-edit');
    let phoneError = document.getElementById('phone-error-edit');
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    return { nameError, emailError, phoneError };
}

function validateEditInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError) {
    let hasError = false;
    if (!isValidLength(valueName, valueEmail, valuePhone)) {
        nameError.innerText = "Name, E-Mail und Telefonnummer dürfen jeweils maximal 30 Zeichen lang sein.";
        nameError.style.display = 'block';
        hasError = true;
    }
    if (!isValidEmail(valueEmail)) {
        emailError.innerText = "Bitte eine gültige E-Mail-Adresse eingeben.";
        emailError.style.display = 'block';
        hasError = true;
    }
    if (!isValidPhone(valuePhone)) {
        phoneError.innerText = "Die Telefonnummer darf nur Zahlen und ein + enthalten.";
        phoneError.style.display = 'block';
        hasError = true;
    }
    return hasError;
}

function sanitizeAndSaveContact(id, valueName, valueEmail, valuePhone) {
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    let updatedContact = { name: valueName, email: valueEmail, phone: valuePhone };
    saveContact(id, updatedContact);
}

// Speichert einen Kontakt
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
            throw new Error('Netzwerkantwort war nicht ok');
        }

        await response.json();
        init();
        closeEditOverlay();
        toastMessage("Contact has been revised");
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}

// Neuen Kontakt hinzufügen
async function createNewContact() {
    let { valueName, valueEmail, valuePhone } = getNewContactInputValues();
    let { nameError, emailError, phoneError } = resetNewContactErrors();

    let hasError = validateNewContactInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError);

    if (!hasError) {
        sanitizeAndCreateContact(valueName, valueEmail, valuePhone);
    }
}

function getNewContactInputValues() {
    return {
        valueName: document.getElementById('inputfiledsname').value.trim(),
        valueEmail: document.getElementById('inputfiledsemail').value.trim(),
        valuePhone: document.getElementById('inputfiledsphone').value.trim()
    };
}

function resetNewContactErrors() {
    let nameError = document.getElementById('name-error');
    let emailError = document.getElementById('email-error');
    let phoneError = document.getElementById('phone-error');
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    return { nameError, emailError, phoneError };
}

function validateNewContactInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError) {
    let hasError = false;
    if (!isValidLength(valueName, valueEmail, valuePhone)) {
        nameError.innerText = "Name, E-Mail und Telefonnummer dürfen jeweils maximal 30 Zeichen lang sein.";
        nameError.style.display = 'block';
        hasError = true;
    }
    if (!isValidEmail(valueEmail)) {
        emailError.innerText = "Bitte eine gültige E-Mail-Adresse eingeben.";
        emailError.style.display = 'block';
        hasError = true;
    }
    if (!isValidPhone(valuePhone)) {
        phoneError.innerText = "Die Telefonnummer darf nur Zahlen und ein + enthalten.";
        phoneError.style.display = 'block';
        hasError = true;
    }
    return hasError;
}

function sanitizeAndCreateContact(valueName, valueEmail, valuePhone) {
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    const newContact = { name: valueName, email: valueEmail, phone: valuePhone || '' };
    saveNewContact(newContact);
}

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
    document.getElementById('inputfiledsname').value = '';
    document.getElementById('inputfiledsemail').value = '';
    document.getElementById('inputfiledsphone').value = '';
}

// Löscht einen Kontakt
async function deletContacts(id) {
    try {
        let response = await fetch(`${API}${editAPI}/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }

        await response.json();
        init();
        closeEditOverlay();
        toastMessage("Delete Successful");
        reloadPage();
    } catch (error) {
        console.error('Fehler beim Löschen des Kontakts:', error);
    }
}

/**
 * Die URL des Haupt-API-Endpunkts.
 * @constant {string}
 */
let API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Die URL des Endpunkts für das Bearbeiten von Kontakten.
 * @constant {string}
 */
const editAPI = "demoUser/users/user1ID/contacts";

/**
 * Die vollständige URL für das Bearbeiten von Kontakten.
 * @constant {string}
 */
const url = `${API}${editAPI}.json`;

/**
 * Initialisiert die Anwendung und ruft die Daten ab.
 * Wird aufgerufen, wenn das Fenster geladen wird.
 */
window.onload = init;

/**
 * Initialisiert die Anwendung und ruft die Daten ab.
 */
function init() {
    renderData(API);
}

let activeContactId = null; // um den aktuell aktiven Kontakt zu verfolgen

/**
 * Rendert die Kontaktdaten auf der Seite.
 * @param {string} URL - Die URL, von der die Daten geladen werden.
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
}

/**
 * Rendert die Kontaktdaten.
 * @param {Object} data - Die Kontaktdaten.
 * @param {HTMLElement} content - Das HTML-Element, in dem die Daten angezeigt werden sollen.
 */
function renderContactsData(data, content) {
    let contacts = data.demoUser.users.user1ID.contacts;
    let contactKeys = Object.keys(contacts);
    contactKeys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name));
    let currentLetter = '';
    renderContactsByLetter(contactKeys, contacts, content, currentLetter);
}

/**
 * Rendert die Kontakte nach Buchstaben sortiert.
 * @param {Array} contactKeys - Die Schlüssel der Kontakte.
 * @param {Object} contacts - Die Kontaktdaten.
 * @param {HTMLElement} content - Das HTML-Element, in dem die Daten angezeigt werden sollen.
 * @param {string} currentLetter - Der aktuelle Buchstabe, nach dem sortiert wird.
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
}

/**
 * Deaktiviert den Lade-Spinner.
 */
function disableSpinner() {
    let element = document.getElementById('spinner');
    element.innerHTML = ``;
}

/**
 * Öffnet die Detailansicht eines Kontakts.
 * @param {string} id - Die ID des Kontakts.
 * @param {string} name - Der Name des Kontakts.
 * @param {string} email - Die E-Mail-Adresse des Kontakts.
 * @param {string} phone - Die Telefonnummer des Kontakts.
 */
function openContact(id, name, email, phone) {
    deactivatePreviousContact();
    activateCurrentContact(id);
    renderContactDetails(id, name, email, phone);
    contactResponsive(id, name, email, phone);
    mobileButtonChange(true);
}

/**
 * Deaktiviert den vorherigen Kontakt.
 */
function deactivatePreviousContact() {
    if (activeContactId) {
        let previousContactElement = document.getElementById(`contact-${activeContactId}`);
        previousContactElement.classList.remove('active');
        let previousContactNameElement = previousContactElement.querySelector('.contact-name');
        previousContactNameElement.style.color = 'black';
    }
}

/**
 * Aktiviert den aktuellen Kontakt.
 * @param {string} id - Die ID des Kontakts.
 */
function activateCurrentContact(id) {
    let contactElement = document.getElementById(`contact-${id}`);
    contactElement.classList.add('active');
    activeContactId = id;
    let contactNameElement = contactElement.querySelector('.contact-name');
    contactNameElement.style.color = 'white';
}

/**
 * Rendert die Detailansicht eines Kontakts.
 * @param {string} id - Die ID des Kontakts.
 * @param {string} name - Der Name des Kontakts.
 * @param {string} email - Die E-Mail-Adresse des Kontakts.
 * @param {string} phone - Die Telefonnummer des Kontakts.
 */
function renderContactDetails(id, name, email, phone) {
    const color = document.getElementById(`contact-${id}`).getAttribute('data-color');
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = renderBigView(id, name, email, phone, color);
    activateAnimation();
}

/**
 * Aktiviert die Animation der Detailansicht.
 */
function activateAnimation() {
    let divID = document.getElementById('contact-container');
    divID.classList.add('slide-in-right');
    divID.classList.add('contact-container');
    setTimeout(() => {
        divID.classList.remove('d-none');
    }, 50);
}

/* 
function activateAnimation() {
    let divID = document.getElementById('contact-container');
    divID.classList.remove('d-none');
    setTimeout(() => {
        divID.classList.add('show'); // neue Klasse für die Animation
    }, 50); // kleine Verzögerung für den Übergang
}
*/

/**
 * Holt die Initialen eines Namens.
 * @param {string} name - Der Name des Kontakts.
 * @returns {string} Die Initialen des Namens.
 */
function getInitials(name) {
    let initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
}

let lastColorIndex = -1;

/**
 * Generiert eine Hintergrundfarbe für Avatare.
 * @returns {string} Die generierte Farbe.
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
 * Öffnet das Overlay zum Hinzufügen eines neuen Kontakts.
 */
function addNewContact() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove("d-none");
    overlay.classList.add('slide-in-right');
}

/**
 * Schließt das Overlay.
 */
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

/**
 * Lädt die Daten eines Kontakts zum Bearbeiten.
 * @param {string} id - Die ID des Kontakts.
 */
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

/**
 * Lädt die Daten des zu bearbeitenden Kontakts.
 * @param {Object} data - Die Kontaktdaten.
 * @param {string} id - Die ID des Kontakts.
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
 * Zeigt das Bearbeitungs-Overlay an.
 */
function showEditOverlay() {
    let editWindow = document.getElementById('overlayEdit');
    editWindow.classList.remove('d-none');
    editWindow.classList.add('slide-in-right');
}

/**
 * Schließt das Bearbeitungs-Overlay.
 */
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

/**
 * Beendet das Bearbeiten eines Kontakts und speichert die Änderungen.
 * @param {string} id - Die ID des Kontakts.
 */
function finishEditContact(id) {
    let { valueName, valueEmail, valuePhone } = getEditInputValues();
    let { nameError, emailError, phoneError } = resetEditErrors();

    let hasError = validateEditInput(valueName, valueEmail, valuePhone, nameError, emailError, phoneError);

    if (!hasError) {
        sanitizeAndSaveContact(id, valueName, valueEmail, valuePhone);
    }
}

/**
 * Holt die Eingabewerte aus dem Bearbeitungsformular.
 * @returns {Object} Die Eingabewerte.
 */
function getEditInputValues() {
    return {
        valueName: document.getElementById('nameValue').value.trim(),
        valueEmail: document.getElementById('emailValue').value.trim(),
        valuePhone: document.getElementById('phoneValue').value.trim()
    };
}

/**
 * Setzt die Fehleranzeige im Bearbeitungsformular zurück.
 * @returns {Object} Die Fehleranzeige-Elemente.
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
 * Validiert die Eingabewerte im Bearbeitungsformular.
 * @param {string} valueName - Der Name des Kontakts.
 * @param {string} valueEmail - Die E-Mail-Adresse des Kontakts.
 * @param {string} valuePhone - Die Telefonnummer des Kontakts.
 * @param {HTMLElement} nameError - Das Element für die Namensfehleranzeige.
 * @param {HTMLElement} emailError - Das Element für die E-Mail-Fehleranzeige.
 * @param {HTMLElement} phoneError - Das Element für die Telefon-Fehleranzeige.
 * @returns {boolean} Ob ein Fehler vorliegt.
 */
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

/**
 * Bereinigt die Eingabewerte und speichert den Kontakt.
 * @param {string} id - Die ID des Kontakts.
 * @param {string} valueName - Der Name des Kontakts.
 * @param {string} valueEmail - Die E-Mail-Adresse des Kontakts.
 * @param {string} valuePhone - Die Telefonnummer des Kontakts.
 */
function sanitizeAndSaveContact(id, valueName, valueEmail, valuePhone) {
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    let updatedContact = { name: valueName, email: valueEmail, phone: valuePhone };
    saveContact(id, updatedContact);
}

/**
 * Speichert einen Kontakt.
 * @param {string} id - Die ID des Kontakts.
 * @param {Object} contactData - Die Kontaktdaten.
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

/**
 * Neuen Kontakt hinzufügen.
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
 * Holt die Eingabewerte aus dem Formular für neue Kontakte.
 * @returns {Object} Die Eingabewerte.
 */
function getNewContactInputValues() {
    return {
        valueName: document.getElementById('inputfiledsname').value.trim(),
        valueEmail: document.getElementById('inputfiledsemail').value.trim(),
        valuePhone: document.getElementById('inputfiledsphone').value.trim()
    };
}

/**
 * Setzt die Fehleranzeige im Formular für neue Kontakte zurück.
 * @returns {Object} Die Fehleranzeige-Elemente.
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
 * Validiert die Eingabewerte im Formular für neue Kontakte.
 * @param {string} valueName - Der Name des Kontakts.
 * @param {string} valueEmail - Die E-Mail-Adresse des Kontakts.
 * @param {string} valuePhone - Die Telefonnummer des Kontakts.
 * @param {HTMLElement} nameError - Das Element für die Namensfehleranzeige.
 * @param {HTMLElement} emailError - Das Element für die E-Mail-Fehleranzeige.
 * @param {HTMLElement} phoneError - Das Element für die Telefon-Fehleranzeige.
 * @returns {boolean} Ob ein Fehler vorliegt.
 */
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

/**
 * Bereinigt die Eingabewerte und erstellt einen neuen Kontakt.
 * @param {string} valueName - Der Name des Kontakts.
 * @param {string} valueEmail - Die E-Mail-Adresse des Kontakts.
 * @param {string} valuePhone - Die Telefonnummer des Kontakts.
 */
function sanitizeAndCreateContact(valueName, valueEmail, valuePhone) {
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    const newContact = { name: valueName, email: valueEmail, phone: valuePhone || '' };
    saveNewContact(newContact);
    
}

/**
 * Speichert einen neuen Kontakt.
 * @param {Object} newContact - Die Kontaktdaten.
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
 * Löscht einen Kontakt.
 * @param {string} id - Die ID des Kontakts.
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


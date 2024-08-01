let API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";
let userAPI = "";
let demoAPI = "dummy-user/";
const editAPI = "demoUser/users/user1ID/contacts";
const url = `${API}${editAPI}.json`;

window.onload = init;

function init() {
    renderData(API);
}

async function loadData(URL) {
    try {
        let response = await fetch(URL + ".json");
        let responseToJson = await response.json();
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
        return null;
    }
}

let activeContactId = null; // um den aktuell aktiven Kontakt zu verfolgen

async function renderData (URL) {
    let data = await loadData(URL);
    let content = document.getElementById("renderContacts");
    content.innerHTML = ``;
    if (data) {
        let contacts = data.demoUser.users.user1ID.contacts;
        
        let contactKeys = Object.keys(contacts);
        contactKeys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name));

        let currentLetter = '';
        for (let i = 0; i < contactKeys.length; i++) {
            const element = contacts[contactKeys[i]];

            let firstLetter = element.name.charAt(0).toUpperCase();
            if (firstLetter !== currentLetter) {
                currentLetter = firstLetter;
                content.innerHTML += `<div class="alphabet">${currentLetter}</div>`;
            }
            console.log(element);
            content.innerHTML += renderContacts(element, contactKeys[i]);
        }
    }
    disableSpinner();
}

function disableSpinner() {
    let element = document.getElementById('spinner');
    element.innerHTML = ``;
}

function renderContacts(element, id) {
    const color = getAvatarColor(id); // Holt die Farbe für diesen Kontakt

    return  /*html*/`
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


function openContact(id, name, email, phone) {
    // Entfernt die aktive Klasse vom vorherigen Kontakt und setzt die Farbe des Namens zurück
    if (activeContactId) {
        let previousContactElement = document.getElementById(`contact-${activeContactId}`);
        previousContactElement.classList.remove('active');
        let previousContactNameElement = previousContactElement.querySelector('.contact-name');
        previousContactNameElement.style.color = 'black'; // oder die Standardfarbe, die wir verwenden
    }

    // Fügt die aktive Klasse zum aktuellen Kontakt hinzu
    let contactElement = document.getElementById(`contact-${id}`);
    contactElement.classList.add('active');
    activeContactId = id;

    // Setzt den Namen des Kontakts auf weiß
    let contactNameElement = contactElement.querySelector('.contact-name');
    contactNameElement.style.color = 'white';

    // Holt die Hintergrundfarbe des aktuellen Kontakts
    const color = contactElement.getAttribute('data-color');

    // Rendert die Kontaktdaten
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = renderBigView(id, name, email, phone, color);

    // Animation aktivieren
    setTimeout(
        function() {
            let divID = document.getElementById('contact-container');
            divID.classList.remove('d-none');
            divID.classList.add('slide-in-right');
            divID.classList.add('contact-container');
        }, 100);
        contactResponsive() 
}

function renderBigView(id, name, email, phone, color) {
    return /*html*/`
        <div class="contact-details-big">
            
            <div class="avatar" style="background-color: ${color};">${getInitials(name)}</div>
                <div class="contact-info">
                    <div class="contact-name-big">${name}</div>
                    <div class="flex-card-big">
                        <div onclick="editContacts('${id}')" class="edit-big">Edit</div>
                        <div onclick="deletContacts('${id}')" class="delete-big">Delete</div>
                    </div>
                </div> 
            </div>
            
            <div class="contact-container-big">
                <div class="info-big">Contact Information</div>
                <div class="email-big">Email</div>
                <div class="contact-email-big"><a href="mailto:${email}">${email}</a></div>
                <div class="phone-big">Phone</div>
                <div class="contact-phone-big">${phone || ''}</div>
            </div>
        </div>
    `
}

function getInitials(name) {
    let initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
}

let lastColorIndex = -1;

function avatarColors() {
    const colors = [
        '#FF7A00', '#FF5EB3', '#6E52FF', '#00BEE8', '#C3FF2B', '#FF4646'
    ];
    let colorIndex = (lastColorIndex + 1) % colors.length;
    lastColorIndex = colorIndex;
    return colors[colorIndex];
}


function addNewContact() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove("d-none");
    overlay.classList.add('slide-in-right');
}

function closeOverlay() {
    let divID = document.getElementById('overlay');
    divID.classList.add('slide-out-right');
    setTimeout(
        function() {
            let divID = document.getElementById('overlay');
            divID.classList.add('d-none');
            divID.classList.remove('slide-in-right');
            divID.classList.remove('slide-out-right');
        }, 500
    );
}

//Kontakt bearbeiten
async function editContacts(id) {
    try {
        let data = await loadData(API);
        if (data) {
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
        } else {
            console.error("No data found");
        }
    } catch (error) {
        console.error("Error in editContacts function:", error);
    }
    let editWindow = document.getElementById('overlayEdit');
    editWindow.classList.remove('d-none');
    editWindow.classList.add('slide-in-right');
}

function closeEditOverlay() {
    let divID = document.getElementById('overlayEdit');
    divID.classList.add('slide-out-right');
    setTimeout(
        function() {
            let divID = document.getElementById('overlayEdit');
            divID.classList.add('d-none');
            divID.classList.remove('slide-in-right');
            divID.classList.remove('slide-out-right');
        }, 500
    );
}

function editContactForm(name, phone, email, id) {
    return /*html*/`
        <div class="contactForm">
        <div class="contactFormLeft">
            <img class="joinnnlogocontact" src="./icons/Capa2Edit.svg" alt="">
            <img class="addcontacttext" src="./icons/Frame211Edit.svg" alt="">
        </div>
        <form class="contactFormRight" onsubmit="finishEditContact('${id}'); return false;">
            <img src="./icons/contacticons/kontak.png" alt="">
            <div class="contactinputfields">
                <img onclick="closeEditOverlay()" class="closeX" src="./icons/close.svg" alt="">
                <input value="${name}" id="nameValue"  class="inputfiledsname" placeholder="Name" type="text" name="name">
                <input value="${email}" id="emailValue" class="inputfiledsemail" placeholder="Email" type="text" name="email">
                <input value="${phone}" id="phoneValue" class="inputfiledsphone" placeholder="Phone" type="text" name="phone">
                <div class="contactbuttons">
                    <button type="button" onclick="closeEditOverlay()" class="cancelbutton">Cancel X</button>
                    <button type="submit" class="createbutton">Edit contact<img src="./icons/check.svg" alt=""></button>
                </div>
            </div>
        </form>
    `
}

function finishEditContact(id) {
    // Hole die Werte aus den Eingabefeldern
    let valueName = document.getElementById('nameValue').value.trim();
    let valueEmail = document.getElementById('emailValue').value.trim();
    let valuePhone = document.getElementById('phoneValue').value.trim();
    // Überprüfungen durchführen
    if (!isValidLength(valueName, valueEmail, valuePhone)) {
        alert("Alle Eingabewerte dürfen maximal 30 Zeichen lang sein.");
        return;
    }
    if (!isValidEmail(valueEmail)) {
        alert("Bitte eine gültige Email-Adresse eingeben.");
        return;
    }
    if (!isValidPhone(valuePhone)) {
        alert("Die Telefonnummer darf nur Zahlen und ein + enthalten.");
        return;
    }
    // Eingaben sanitisieren
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    // Aktualisierten Kontakt erstellen
    let updatedContact = {
        name: valueName,
        email: valueEmail,
        phone: valuePhone
    };
    saveContact(id, updatedContact);
}


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

        let responseData = await response.json();
        console.log('Erfolgreich gespeichert:', responseData);
        init();
        closeEditOverlay();
        toastMessage("Contact has been revised");
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}



// neuen Kontakt hinzufügen
async function createNewContact() {
    // Hole die Werte aus den Eingabefeldern
    let valueName = document.getElementById('inputfiledsname').value.trim();
    let valueEmail = document.getElementById('inputfiledsemail').value.trim();
    let valuePhone = document.getElementById('inputfiledsphone').value.trim();
    // Überprüfungen durchführen
    if (!isValidLength(valueName, valueEmail, valuePhone)) {
        alert("Alle Eingabewerte dürfen maximal 30 Zeichen lang sein.");
        return;
    }
    if (!isValidEmail(valueEmail)) {
        alert("Bitte eine gültige Email-Adresse eingeben.");
        return;
    }
    if (!isValidPhone(valuePhone)) {
        alert("Die Telefonnummer darf nur Zahlen und ein + enthalten.");
        return;
    }
    // Eingaben sanitisieren
    valueName = sanitizeInput(valueName);
    valueEmail = sanitizeInput(valueEmail);
    valuePhone = sanitizeInput(valuePhone);
    // Neuen Kontakt erstellen
    const newContact = {
        name: valueName,
        email: valueEmail,
        phone: valuePhone || ''
    };
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContact)
        });
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const responseData = await response.json();
        console.log('Erfolgreich gespeichert:', responseData);
        init();
        closeOverlay();
        toastMessage("new contact has been created");

    } catch (error) {
        console.error('Fehler beim Hinzufügen des Kontakts:', error);
    } finally {
        // Eingabefelder leeren
        document.getElementById('inputfiledsname').value = '';
        document.getElementById('inputfiledsemail').value = '';
        document.getElementById('inputfiledsphone').value = '';
    }
}

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
        let responseData = await response.json();
        console.log('Erfolgreich gespeichert:', responseData);
        init();
        closeEditOverlay();
        toastMessage("Contact has been edited");
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}

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

        let responseData = await response.json();
        console.log('Erfolgreich gelöscht:', responseData);
        init();
        closeEditOverlay();
        toastMessage("Delete Successful");
        reloadPage();
    } catch (error) {
        console.error('Fehler beim Löschen des Kontakts:', error);
    }
}
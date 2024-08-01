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

// Lädt Daten von der angegebenen URL und gibt sie als JSON zurück
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

// Rendert die Kontaktdaten auf der Seite
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
            content.innerHTML += renderContacts(element, contactKeys[i]);
        }
    }
    disableSpinner();
}

// Deaktiviert den Lade-Spinner
function disableSpinner() {
    let element = document.getElementById('spinner');
    element.innerHTML = ``;
}

// Rendert einen einzelnen Kontakt als HTML
function renderContacts(element, id) {
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

    contactResponsive(id, name, email, phone) // needed
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
    setTimeout(function() {
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

// Schließt das Bearbeitungs-Overlay
function closeEditOverlay() {
    let divID = document.getElementById('overlayEdit');
    divID.classList.add('slide-out-right');
    setTimeout(function() {
        let divID = document.getElementById('overlayEdit');
        divID.classList.add('d-none');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}

// Beendet das Bearbeiten eines Kontakts und speichert die Änderungen
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

        let responseData = await response.json();
        init();
        closeEditOverlay();
        toastMessage("Contact has been revised");
    } catch (error) {
        console.error('Fehler beim Speichern des Kontakts:', error);
    }
}

// Neuen Kontakt hinzufügen
async function createNewContact() {
    // Hole die Werte aus den Eingabefeldern
    let valueName = document.getElementById('inputfiledsname').value.trim();
    let valueEmail = document.getElementById('inputfiledsemail').value.trim();
    let valuePhone = document.getElementById('inputfiledsphone').value.trim();
    
    // Fehlernachrichten-Elemente
    let nameError = document.getElementById('name-error');
    let emailError = document.getElementById('email-error');
    let phoneError = document.getElementById('phone-error');
    
    // Setze die Fehlernachrichten zurück
    nameError.style.display = 'none';
    emailError.style.display = 'none';
    phoneError.style.display = 'none';

    // Überprüfungen durchführen
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

    if (hasError) {
        return; // Falls ein Fehler vorliegt, beende die Funktion
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

    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
    });

    const responseData = await response.json();
    init();
    closeOverlay();
    toastMessage("Contact successfully created");

    // Eingabefelder leeren
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

        let responseData = await response.json();
        init();
        closeEditOverlay();
        toastMessage("Delete Successful");
        reloadPage();
    } catch (error) {
        console.error('Fehler beim Löschen des Kontakts:', error);
    }
}
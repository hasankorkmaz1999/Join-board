let API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";
let userAPI = "";
let demoAPI = "dummy-user/";
let editAPI = "demoUser.users.user1ID.contacts";
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
    return  /*html*/`
            <div class="contact-item" id="contact-${id}" onclick="openContact('${id}', '${element.name}', '${element.email}', '${element.phone}')">
                <div class="avatar" style="background-color: ${avatarColors()};">${getInitials(element.name)}</div>
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
        // document.getElementById(`contact-${activeContactId}`).classList.remove('active');
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

    // Rendert die Kontaktdaten
    let contactContainer = document.getElementById('contact-container');
    contactContainer.innerHTML = renderBigView(id, name, email, phone);

    // Animation aktivieren
    setTimeout(() => {
        const contactDetails = document.querySelector('.contact-details');
        contactDetails.classList.add('show');
    }, 0)
}

function renderBigView(id, name, email, phone) {
    return /*html*/`
                <div class="contact-details">
            <div class="avatar" style="background-color: ${getAvatarColor()};">${getInitials(name)}</div>
            <div class="contact-info">
                <div class="contact-name">${name}</div>
                <div class="contact-email"><a href="mailto:${email}">${email}</a></div>
                <div class="contact-phone">${phone || ''}</div>
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
    
}

function closeOverlay() {
    overlay.classList.add("d-none");
}
//Kontakt bearbiten
async function editContacts(id) {
    try {
        let data = await loadData(API);
        if (data) {
            let contact = data.demoUser.users.user1ID.contacts[id];
            if (contact) {
                let name = contact.name;
                let phone = contact.phone;
                let email = contact.email;
                console.log("Contact Details:", name, phone, email);
            } else {
                console.error("No contact found with ID:", id);
            }
        } else {
            console.error("No data found");
        }
    } catch (error) {
        console.error("Error in editContacts function:", error);
    }
}
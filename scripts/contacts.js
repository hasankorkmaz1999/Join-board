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
    setTimeout(
        function() {
            let divID = document.getElementById('contact-container');
            divID.classList.remove('d-none');
            divID.classList.add('slide-in-right');
            divID.classList.add('contact-container');
        }, 100);
}

function renderBigView(id, name, email, phone) {
    return /*html*/`
        <div class="contact-details-big">
        <div class="avatar" style="background-color: ${getAvatarColor()};">${getInitials(name)}</div>
            <div class="contact-info">
                <div class="contact-name-big">${name}</div>
                    <div class="flex-card-big">
                        <div onclick="editContacts('${id}')" class="edit-big">Edit</div>
                        <div class="delete-big">Delete</div>
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
                let renderEditView = document.getElementById('overlayEdit');
                renderEditView.innerHTML = editContactForm(name, phone, email);
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

function editContactForm(name, phone, email) {
    return /*html*/`
        <div class="contactForm">
        <div class="contactFormLeft">
            <img class="joinnnlogocontact" src="./icons/Capa2Edit.svg" alt="">
            <img class="addcontacttext" src="./icons/Frame 211Edit.svg" alt="">
        </div>

        <div class="contactFormRight">
            <img src="./icons/contacticons/kontak.png" alt="">
                    <div class="contactinputfields">
                        <img  onclick="closeEditOverlay()" class="closeX" src="./icons/close.svg" alt="">
                        <input value="${name}" class="inputfiledsname" placeholder="Name" type="text">
                        <input value="${email}" class="inputfiledsemail" placeholder="Email" type="text">
                        <input value="${phone}" class="inputfiledsphone" placeholder="Phone" type="text">

                    <div class="contactbuttons">
                        <button onclick="closeEditOverlay()" class="cancelbutton">Cancel  X</button>
                        <button class="createbutton">Edit contact<img src="./icons/check.svg" alt=""></button>
                    </div>
                </div>
            </div>
        </div>
    `
}
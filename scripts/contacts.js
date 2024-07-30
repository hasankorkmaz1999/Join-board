let API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";
let userAPI = "";
let demoAPI = "dummy-user/";
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

function openContact(id, name, email, phone) {
    // Entfernt die aktive Klasse vom vorherigen Kontakt
    if (activeContactId) {
        document.getElementById('contact-${activeContactId}').classList.remove('active');
    }
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

function openContact(element, index) {
    let contactcontainer = document.getElementById('contact-container');
    let contactname = document.getElementById('contactname${index}')
    contactcontainer.innerHTML = `
    <div> </div>`
}
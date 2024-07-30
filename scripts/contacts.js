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

async function renderData (URL) {
    let data = await loadData(URL);
    let content = document.getElementById("renderContacts");
    content.innerHTML = ``; 
    if (data) {
        let contacts = data.demoUser.users.user1ID.contacts;
        
        let contactKeys = Object.keys(contacts);
        contactKeys.sort((a, b) => contacts[a].name.localeCompare(contacts[b].name));

        let currentLetter = ''; // Ty
        for (let i = 0; i < contactKeys.length; i++) {
            const element = contacts[contactKeys[i]];

            // Alpha
            let firstLetter = element.name.charAt(0).toUpperCase();
            if (firstLetter !== currentLetter) {
                currentLetter = firstLetter;
                content.innerHTML += `<div class="alphabet">${currentLetter}</div>`;
            }
            console.log(element);
            content.innerHTML += renderContacts(element);
        }
    }
}


function renderContacts(element) {
   return  `
            <div class="contact-item">
                <div class="avatar" style="background-color: #FFAB00;">${getInitials(element.name)}</div>
                <div class="contact-info">
                    <div class="contact-name">${element.name}</div>
                    <div class="contact-email">${element.email}</div>
                </div>
            </div>
    `
}

function getInitials(name) {
    let initials = name.split(' ').map(word => word.charAt(0)).join('');
    return initials.toUpperCase();
}
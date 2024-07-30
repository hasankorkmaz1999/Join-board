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
        console.log(responseToJson);
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
        return null;
    }
}

async function renderData (URL) {
    let data = await loadData(URL);
    /* let content = document.getElementById("ID NAME"); */
    /* content.innerHTML = ``; */
    if (data && data.users && data.users.user1ID && data.users.user1ID.contact1ID) {
        for (let i = 0; i < data.demo-userAPI.users.user1ID.contact1ID.length; i++) {
            const element = data.demo-userAPI.users.user1ID.contact1ID[i];
            console.log(element);
        }
    }
}


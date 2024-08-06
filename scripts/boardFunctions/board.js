let taskAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
let contactAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";

window.onload = init;

function init() {
    renderData(taskAPI);
}

async function renderData(URL) {
    let data = await loadData(URL);
    console.log(data);
    let content = document.getElementById('renderData');
    content.innerHTML = ``;
    if (data) {
        renderTaskData(data, content);
    }
    disableSpinner();
}

function disableSpinner() {
    
    let element = document.getElementById('spinner');
    if (element === null) {
        console.error("Spinner not found!");
        
    } else {
        element.innerHTML = ``;
    }
}

function renderTaskData(data, content) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let task = data[key];
        let taskDiv = document.getElementById('renderData');
        taskDiv.innerHTML += renderDiv(task);
    }
}

function renderDiv(task) {
 return /*html*/`
    <div class="task-title">${task.title}</div>
    <div class="task-description">${task.description}</div>
    <span>Hier muss der fortschritsbalken rein (muss via inline style css geamcht werdem)</span>
 `
}
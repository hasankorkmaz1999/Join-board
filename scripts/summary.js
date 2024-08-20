const taskAPI = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const NameOfAdmin = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/profile";
const user_API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/users";

window.onload = init();

function init() {
    renderData(taskAPI);
    displayGreeting();
    loadNameOfAdmin();
    forbiddenCourse();
    initHeader();
}

/* window.onload = function() {
    renderData(taskAPI);
    loadNameOfAdmin();
    displayGreeting();
    forbiddenCourse();
}; */

/* function infoTap() {
    let infoDIV = document.getElementById('dropdown-content');
    let checkClass = infoDIV.classList.contains('show');
    if (checkClass) {
        infoDIV.classList.remove('d-none');
    } else {
        infoDIV.classList.add('dropdown-content');
    }
} */

function forbiddenCourse() {
    try {
        let userID = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        let guestToken = sessionStorage.getItem('guestToken');
        if (userID === null && guestToken === null) {
            // Falls weder userID noch guestToken vorhanden ist, umleiten
            window.location.href = './login.html?msg=login_required';
        } else if (guestToken !== null) {
            // Hier könntest du z.B. Einschränkungen für Gäste definieren
            console.log("Gastzugriff gewährt");
        }
    } catch (error) {
        console.error("Kein Zugriff auf localStorage oder sessionStorage möglich: ", error);
        window.location.href = './login.html?msg=error_localStorage';
    }
}

    async function loadNameOfAdmin() {
        let tempUserID = sessionStorage.getItem('userId'); 
        let saveUserID = localStorage.getItem('userId'); 
        let guestToken = sessionStorage.getItem('guestToken');
        
        if (tempUserID) {
            let data = await loadData(`${user_API}/${tempUserID}`);
            document.getElementById('NameOfAdmin').innerHTML = data.name;
            return;
        } 
        
        if (saveUserID) {
            let data = await loadData(`${user_API}/${saveUserID}`);
            document.getElementById('NameOfAdmin').innerHTML = data.name;
            return;
        } 
        
        if (guestToken === "true") {
            let data = await loadData(NameOfAdmin);
            document.getElementById('NameOfAdmin').innerHTML = data.name;
        }
    }
    

async function renderData(URL) {
    let data = await loadData(URL);
    
    let numberDone = 0;
    let numberInProgress = 0;
    let numberAwaitingFeedback = 0;
    let numberTodo = 0;
    let upcomingDate = null;
    let tasksOnUpcomingDate = 0;

    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const task = data[key];
            switch (task.progress) {
                case 'done':
                    numberDone++;
                    break;
                case 'inProgress':
                    numberInProgress++;
                    break;
                case 'AwaitingFeedback':
                    numberAwaitingFeedback++;
                    break;
                case 'todo':
                    numberTodo++;
                    break;
            }
            const taskDueDate = new Date(task.duedate);
            if (upcomingDate === null || taskDueDate < upcomingDate) {
                upcomingDate = taskDueDate;
                tasksOnUpcomingDate = 1;
            } else if (taskDueDate.getTime() === upcomingDate.getTime()) {
                tasksOnUpcomingDate++;
            }
        }
    }

    const summaryData = {
        numberDone,
        numberInProgress,
        numberAwaitingFeedback,
        numberTodo,
        upcomingDate: upcomingDate ? upcomingDate.toLocaleDateString() : "No upcoming deadlines",
        tasksOnUpcomingDate
    };

    // Ausgabe in der Konsole
    console.log(`Total Tasks: ${numberDone + numberInProgress + numberAwaitingFeedback + numberTodo}`);
    console.log(`Done: ${numberDone}`);
    console.log(`In Progress: ${numberInProgress}`);
    console.log(`Awaiting Feedback: ${numberAwaitingFeedback}`);
    console.log(`Todo: ${numberTodo}`);
    if (upcomingDate) {
        console.log(`Upcoming Deadline: ${upcomingDate.toLocaleDateString()} (${tasksOnUpcomingDate} tasks)`);
    } else {
        console.log("No upcoming deadlines.");
    }

    // Daten an showData übergeben
    showData(summaryData);
}

function showData(data) {
    document.getElementById('numberTodo').innerHTML = data.numberTodo;
    document.getElementById('numberDone').innerHTML = data.numberDone;
    document.getElementById('numberUpcomming').innerHTML = data.tasksOnUpcomingDate;
    document.getElementById('dateUpcomming').innerHTML = data.upcomingDate;
    document.getElementById('numberTaskInBoard').innerHTML = data.numberDone + data.numberInProgress + data.numberAwaitingFeedback + data.numberTodo;
    document.getElementById('numberTaskInProgress').innerHTML = data.numberInProgress;
    document.getElementById('numberTaskAwaitFeedback').innerHTML = data.numberAwaitingFeedback;
}

/* id 
loadData
numberDone
numberUpcomming
dateUpcomming
numberTaskInBoard
numberTaskInProgress
numberTaskAwaitFeedback
*/

function displayGreeting() {
    let greetingText = document.getElementById('greeting-text');
    let currentHour = new Date().getHours();
    let greeting;
    try {
        if (currentHour < 12) {
            greeting = "Good morning,";
        } else if (currentHour < 18) {
            greeting = "Good afternoon,";
        } else {
            greeting = "Good evening,";
        }
    } catch (error) {
        greeting = "Hello,";
        console.error("Error while getting the current hour: " + error);
    }
    greetingText.innerText = greeting;
}

const taskAPI = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
const NameOfAdmin = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/profile";
const user_API = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/users";

/**
 * Initializes the summary page by rendering task data, displaying the greeting, loading the admin name,
 * checking for forbidden access, loading deadlines, and initiating the header.
 */
window.onload = init;

function init() {
  renderData(taskAPI);
  displayGreeting();
  loadNameOfAdmin();
  forbiddenCourse();
  loadDeadline();
  initHeader();
  fadeOutAnimation();
}

/**
 * Checks if the user has permission to access the page. Redirects to the login page if no valid user ID or guest token is found.
 */
function forbiddenCourse() {
  try {
    let userID = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    let guestToken = sessionStorage.getItem("guestToken");
    if (userID === null && guestToken === null) {
      window.location.href = "./login.html?msg=login_required";
    } else if (guestToken !== null) {
    }
  } catch (error) {
    window.location.href = "./login.html?msg=error_localStorage";
  }
}

/**
 * Loads the name of the admin or user and displays it on the page.
 * Checks session storage, local storage, and guest token for user ID.
 */
async function loadNameOfAdmin() {
  let tempUserID = sessionStorage.getItem("userId");
  let saveUserID = localStorage.getItem("userId");
  let guestToken = sessionStorage.getItem("guestToken");

  if (tempUserID) {
    let data = await loadData(`${user_API}/${tempUserID}`);
    document.getElementById("NameOfAdmin").innerHTML = data.name;
    return;
  }

  if (saveUserID) {
    let data = await loadData(`${user_API}/${saveUserID}`);
    document.getElementById("NameOfAdmin").innerHTML = data.name;
    return;
  }

  if (guestToken === "true") {
    let data = await loadData(NameOfAdmin);
    document.getElementById("NameOfAdmin").innerHTML = data.name;
  }
}

/**
 * Renders task data from the provided URL and calculates various task statistics such as completed tasks,
 * tasks in progress, tasks awaiting feedback, and upcoming deadlines.
 * 
 * @param {string} URL - The API endpoint from which to fetch task data.
 */
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
        case "done":
          numberDone++;
          break;
        case "inProgress":
          numberInProgress++;
          break;
        case "AwaitingFeedback":
          numberAwaitingFeedback++;
          break;
        case "todo":
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
    upcomingDate: upcomingDate
      ? upcomingDate.toLocaleDateString()
      : "No upcoming deadlines",
    tasksOnUpcomingDate,
  };
  showData(summaryData);
}

/**
 * Displays the calculated task statistics on the page.
 * 
 * @param {object} data - The summary data object containing task statistics.
 */
function showData(data) {
  document.getElementById("numberTodo").innerHTML = data.numberTodo;
  document.getElementById("numberDone").innerHTML = data.numberDone;
  document.getElementById("numberUpcomming").innerHTML = data.tasksOnUpcomingDate;
  document.getElementById("dateUpcomming").innerHTML = data.upcomingDate;
  document.getElementById("numberTaskInBoard").innerHTML =
    data.numberDone + data.numberInProgress + data.numberAwaitingFeedback + data.numberTodo;
  document.getElementById("numberTaskInProgress").innerHTML = data.numberInProgress;
  document.getElementById("numberTaskAwaitFeedback").innerHTML = data.numberAwaitingFeedback;
}

/**
 * Displays a greeting message based on the current time of day.
 */
function displayGreeting() {
  let greetingText = document.getElementById("greeting-text");
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
  }
  greetingText.innerText = greeting;
}

/**
 * Counts and displays the number of urgent tasks that are not yet completed.
 * 
 * @param {object} tasks - The tasks object containing all tasks to be evaluated.
 */
async function countUrgentTasks(tasks) {
  let urgentCount = 0;

  for (let key in tasks) {
    let task = tasks[key];
    if (task.priority === "urgent" && task.progress !== "done") {
      urgentCount++;
    }
  }

  document.getElementById("numberUpcomming").textContent = urgentCount;
}

/**
 * Finds and displays the next upcoming deadline from the task list.
 * 
 * @param {object} tasks - The tasks object containing all tasks to be evaluated.
 */
function findNextDeadline(tasks) {
  let today = new Date();
  let upcomingDeadline = null;

  for (let key in tasks) {
    let task = tasks[key];
    let taskDate = new Date(task.date);

    if (taskDate >= today && task.progress !== "done") {
      if (!upcomingDeadline || taskDate < upcomingDeadline) {
        upcomingDeadline = taskDate;
      }
    }
  }

  if (upcomingDeadline) {
    let options = { year: "numeric", month: "long", day: "numeric" };
    document.getElementById("dateUpcomming").textContent =
      upcomingDeadline.toLocaleDateString("en-US", options);
  } else {
    document.getElementById("dateUpcomming").textContent =
      "No upcoming deadlines";
  }
}

/**
 * Loads the task deadlines and updates the page with the number of urgent tasks and the next deadline.
 */
async function loadDeadline() {
  let tasks = await loadData(taskAPI); 
  countUrgentTasks(tasks); 
  findNextDeadline(tasks); 
}

/**
 * Handles the fade-out animation for the greeting container on smaller screens.
 */
function fadeOutAnimation() {
  if (window.innerWidth <= 850) {
    document.body.style.overflow = "hidden";
    setTimeout(function () {
      document.getElementById('greeting-container').classList.add('fade-out');
    }, 1500);
    setTimeout(function () {
      document.getElementById('greeting-container').classList.add('d-none');
      document.getElementById('greeting-container').classList.remove('fade-out');
      document.getElementById('greeting-container').classList.remove('greeting-container');
      document.body.style.overflow = "auto";
    }, 2500);
  }
}

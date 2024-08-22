let taskAPI =
  "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes";
  
  
let contactAPI =
  "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/contacts";


let cureentDraggedElement;


window.onload = init;


let tasks = {};


function init() {
  renderData(taskAPI);
  forbiddenCourse();
  initHeader();
}


function forbiddenCourse() {
  try {
    let userID =
      localStorage.getItem("userId") || sessionStorage.getItem("userId");
    let guestToken = sessionStorage.getItem("guestToken");
    if (userID === null && guestToken === null) {
      window.location.href = "./login.html?msg=login_required";
    } else if (guestToken !== null) {
      console.log("Guest access granted");
    }
  } catch (error) {
    console.error(
      "Kein Zugriff auf localStorage oder sessionStorage möglich: ",
      error
    );
    window.location.href = "./login.html?msg=error_localStorage";
  }
}


async function renderData(URL) {
  document.getElementById("todo").innerHTML = ``;
  document.getElementById("inprogress").innerHTML = ``;
  document.getElementById("done").innerHTML = ``;
  document.getElementById("awaitingfeedback").innerHTML = ``;
  let data = await loadData(URL);
  if (data) {
    renderTaskData(data);
  }
}


function disableSpinner() {
  let element = document.getElementById("spinner");
  document.getElementById("laoding").classList.add("d-non");
  if (element === null) {
    console.error("Spinner not found!");
  } else {
    element.innerHTML = ``;
  }
}


function renderTaskData(data) {
  tasks = data;
  let keys = Object.keys(data);
  let todoDIV = document.getElementById("todo");
  let inprogressDIV = document.getElementById("inprogress");
  let doneDIV = document.getElementById("done");
  let awaitingfeedbackDIV = document.getElementById("awaitingfeedback");

  todoDIV.innerHTML = "";
  inprogressDIV.innerHTML = "";
  doneDIV.innerHTML = "";
  awaitingfeedbackDIV.innerHTML = "";

  let todoTasksCount = 0;
  let inProgressTasksCount = 0;
  let awaitingFeedbackTasksCount = 0;
  let doneTasksCount = 0;

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let task = data[key];
    let progress = task.progress;

    if (progress === "todo") {
      todoDIV.innerHTML += renderDivTodo(task, key);
      todoTasksCount++;
    }
    if (progress === "inProgress") {
      inprogressDIV.innerHTML += renderDivInprogress(task, key);
      inProgressTasksCount++;
    }
    if (progress === "done") {
      doneDIV.innerHTML += renderDivDone(task, key);
      doneTasksCount++;
    }
    if (progress === "AwaitingFeedback") {
      awaitingfeedbackDIV.innerHTML += renderDivawaitingfeedback(task, key);
      awaitingFeedbackTasksCount++;
    }
  }

  if (todoTasksCount === 0) {
    todoDIV.innerHTML = '<div class="no-tasks-banner">No tasks To Do</div>';
  }

  if (inProgressTasksCount === 0) {
    inprogressDIV.innerHTML =
      '<div class="no-tasks-banner">No tasks in Progress</div>';
  }

  if (awaitingFeedbackTasksCount === 0) {
    awaitingfeedbackDIV.innerHTML =
      '<div class="no-tasks-banner">No tasks awaiting Feedback</div>';
  }

  if (doneTasksCount === 0) {
    doneDIV.innerHTML = '<div class="no-tasks-banner">No tasks done</div>';
  }

  disableSpinner();
}


function startDragging(id) {
  cureentDraggedElement = id;
}


function allowDrop(event) {
  event.preventDefault();
}


function showDropIndicator(event) {
  let target = event.currentTarget;
  if (!target.querySelector(".drop-indicator")) {
    let dropIndicator = document.createElement("div");
    dropIndicator.classList.add("drop-indicator");
    target.appendChild(dropIndicator);
  }
}


function hideDropIndicator(event) {
  let target = event.currentTarget;
  let dropIndicator = target.querySelector(".drop-indicator");
  if (dropIndicator) {
    dropIndicator.remove();
  }
}


function moveTo(category) {
  let data = {
    progress: category,
  };
  updateData(taskAPI, cureentDraggedElement, data);
}


function updateData(URL, id, data) {
  fetch(`${URL}/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(() => {
    toastMessage("Task moved successfully!");
    setTimeout(() => {
      init();
    }, 100);
  });
}


function closeOverlay() {
  let overlay = document.getElementById("overlayforaddtask");
  let popupContent = document.getElementById("addtaskpopup");
  popupContent.innerHTML = "";

  overlay.classList.add("slide-out-right");
  setTimeout(() => {
    overlay.classList.add("d-none");
    overlay.classList.remove("slide-in-right");
    overlay.classList.remove("slide-out-right");
  }, 500);
}


function openAddTaskOverlay(progress) {
  let overlay = document.getElementById("overlayforaddtask");
  overlay.classList.remove("d-none");
  overlay.classList.add("slide-in-right");

  let iframe = document.createElement("iframe");
  iframe.src = `add_task_board.html?progress=${progress}`; 

  let popupContent = document.getElementById("addtaskpopup");
  popupContent.innerHTML = ""; 
  popupContent.appendChild(iframe);
  document.body.style.overflow = "hidden";
}


function closeAddTaskOverlay() {
  let overlay = document.getElementById("overlayforaddtask");
  overlay.classList.remove("slide-in-right");
  overlay.classList.add("slide-out-right");
  setTimeout(() => {
    overlay.classList.add("d-none");
    overlay.classList.remove("slide-in-right");
    overlay.classList.remove("slide-out-right");
    document.body.style.overflow = "auto";
  }, 500);
}


function doNotClose(event) {
  event.stopPropagation();
}


function openSingleTaskOverlay(taskData, key) {
  let overlay = document.getElementById("overlayforsingletask");
  overlay.classList.remove("d-none");
  overlay.classList.add("slide-in-right");

  let popupContent = document.getElementsByClassName("singletaskpopup")[0];

  let htmlContent = addSingleTaskForm(taskData, key);
  popupContent.innerHTML = htmlContent;
  document.body.style.overflow = "hidden";
}


function closeSingleTaskOverlay() {
  let overlay = document.getElementById("overlayforsingletask");
  overlay.classList.remove("slide-in-right");
  overlay.classList.add("slide-out-right");
  setTimeout(() => {
    overlay.classList.add("d-none");
    overlay.classList.remove("slide-in-right");
    let popupContent = document.getElementsByClassName("singletaskpopup")[0];
    popupContent.innerHTML = "";
    document.body.style.overflow = "auto";
  }, 500);
}


async function deleteTask(taskKey) {
  const deleteAPI = `https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes/${taskKey}.json`;

  try {
    const response = await fetch(deleteAPI, {
      method: "DELETE",
    });

    const responseData = await response.json();

    if (response.ok) {
      closeSingleTaskOverlay();
      location.reload();
    } else {
      console.error("Error deleting task:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelector(".inputfieldfindtask")
    .addEventListener("input", findTask);
});


function findTask() {
  let searchInput = document
    .querySelector(".inputfieldfindtask")
    .value.toLowerCase();

  document.getElementById("todo").innerHTML = "";
  document.getElementById("inprogress").innerHTML = "";
  document.getElementById("done").innerHTML = "";
  document.getElementById("awaitingfeedback").innerHTML = "";

  let keys = Object.keys(tasks);
  let tasksFound = false;

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    let task = tasks[key];
    let taskTitle = task.task.toLowerCase();
    let taskDescription = task.description.toLowerCase();

    if (
      taskTitle.includes(searchInput) ||
      taskDescription.includes(searchInput)
    ) {
      tasksFound = true;
      let progress = task.progress;

      if (progress === "todo") {
        document.getElementById("todo").innerHTML += renderDivTodo(task, key);
      }
      if (progress === "inProgress") {
        document.getElementById("inprogress").innerHTML += renderDivInprogress(
          task,
          key
        );
      }
      if (progress === "done") {
        document.getElementById("done").innerHTML += renderDivDone(task, key);
      }
      if (progress === "AwaitingFeedback") {
        document.getElementById("awaitingfeedback").innerHTML +=
          renderDivawaitingfeedback(task, key);
      }
    }
  }

  
  if (!tasksFound) {
    document.getElementById("inprogress").innerHTML =
      '<div class="no-tasksfound-banner">No tasks found</div>';
  }

  
  if (searchInput === "") {
    renderData(taskAPI);
  }
}


async function pushInToDo(key) {
  let data = {
    progress: "todo",
  };
  updateData(taskAPI, key, data);
}


async function pushInProgress(key) {
  let data = {
    progress: "inProgress",
  };
  updateData(taskAPI, key, data);
}


async function pushInAwaitFeedback(key) {
  let data = {
    progress: "AwaitingFeedback",
  };
  updateData(taskAPI, key, data);
}


async function pushInDone(key) {
  let data = {
    progress: "done",
  };
  updateData(taskAPI, key, data);
}

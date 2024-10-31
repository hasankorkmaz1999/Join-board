const svgIcons = {
  urgent: `
      <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_209288_4288)">
          <path d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"/>
          <path d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"/>
          </g>
          <defs>
          <clipPath id="clip0_209288_4288">
          <rect width="20" height="14.5098" fill="white" transform="translate(0.748535 0.745117)"/>
          </clipPath>
          </defs>
      </svg>
  `,
  medium: `
      <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.1526 7.72528H1.34443C1.05378 7.72528 0.775033 7.60898 0.569514 7.40197C0.363995 7.19495 0.248535 6.91419 0.248535 6.62143C0.248535 6.32867 0.363995 6.0479 0.569514 5.84089C0.775033 5.63388 1.05378 5.51758 1.34443 5.51758H19.1526C19.4433 5.51758 19.722 5.63388 19.9276 5.84089C20.1331 6.0479 20.2485 6.32867 20.2485 6.62143C20.2485 6.91419 20.1331 7.19495 19.9276 7.40197C19.722 7.60898 19.4433 7.72528 19.1526 7.72528Z" fill="#FFA800"/>
          <path d="M19.1526 2.48211H1.34443C1.05378 2.48211 0.775033 2.36581 0.569514 2.1588C0.363995 1.95179 0.248535 1.67102 0.248535 1.37826C0.248535 1.0855 0.363995 0.804736 0.569514 0.597724C0.775033 0.390712 1.05378 0.274414 1.34443 0.274414L19.1526 0.274414C19.4433 0.274414 19.722 0.390712 19.9276 0.597724C20.1331 0.804736 20.2485 1.0855 20.2485 1.37826C20.2485 1.67102 20.1331 1.95179 19.9276 2.1588C19.722 2.36581 19.4433 2.48211 19.1526 2.48211Z" fill="#FFA800"/>
      </svg>
  `,
  low: `
      <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.2485 9.50589C10.0139 9.5063 9.7854 9.43145 9.59655 9.29238L0.693448 2.72264C0.57761 2.63708 0.47977 2.52957 0.405515 2.40623C0.33126 2.28289 0.282043 2.14614 0.260675 2.00379C0.217521 1.71631 0.290421 1.42347 0.463337 1.1897C0.636253 0.955928 0.895022 0.800371 1.18272 0.757248C1.47041 0.714126 1.76347 0.786972 1.99741 0.95976L10.2485 7.04224L18.4997 0.95976C18.6155 0.874204 18.7471 0.812285 18.8869 0.777538C19.0266 0.742791 19.1719 0.735896 19.3144 0.757248C19.4568 0.7786 19.5937 0.82778 19.7171 0.901981C19.8405 0.976181 19.9481 1.07395 20.0337 1.1897C20.1194 1.30545 20.1813 1.43692 20.2161 1.57661C20.2509 1.71629 20.2578 1.86145 20.2364 2.00379C20.215 2.14614 20.1658 2.28289 20.0916 2.40623C20.0173 2.52957 19.9195 2.63708 19.8036 2.72264L10.9005 9.29238C10.7117 9.43145 10.4831 9.5063 10.2485 9.50589Z" fill="#7AE229"/>
          <path d="M10.2485 15.2544C10.0139 15.2548 9.7854 15.18 9.59655 15.0409L0.693448 8.47117C0.459502 8.29839 0.30383 8.03981 0.260675 7.75233C0.217521 7.46485 0.290421 7.17201 0.463337 6.93824C0.636253 6.70446 0.895021 6.54891 1.18272 6.50578C1.47041 6.46266 1.76347 6.53551 1.99741 6.7083L10.2485 12.7908L18.4997 6.7083C18.7336 6.53551 19.0267 6.46266 19.3144 6.50578C19.602 6.54891 19.8608 6.70446 20.0337 6.93824C20.2066 7.17201 20.2795 7.46485 20.2364 7.75233C20.1932 8.03981 20.0376 8.29839 19.8036 8.47117L10.9005 15.0409C10.7117 15.18 10.4831 15.2548 10.2485 15.2544Z" fill="#7AE229"/>
      </svg>
  `,
};

/**
* Returns the avatar color associated with the given ID. If no color is associated, generates and stores a new one.
* 
* @param {string} id - The ID for which to get the avatar color.
* @returns {string} The avatar color in hex format.
*/
function getAvatarColor(id) {
  if (!avatarColorsMap[id]) {
      avatarColorsMap[id] = avatarColors();
  }
  return avatarColorsMap[id];
}

const avatarColorsMap = {};

/**
* Generates initials from a given name. The initials are created from the first letter of each word in the name.
* 
* @param {string} name - The name from which to generate initials.
* @returns {string} The generated initials.
*/
function getInitials(name) {
  return name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");
}

/**
* Cycles through a predefined set of colors and returns the next color in the sequence.
* 
* @returns {string} The next avatar color in hex format.
*/
function avatarColors() {
  const colors = [
      "#FF7A00",
      "#FF5EB3",
      "#6E52FF",
      "#00BEE8",
      "#C3FF2B",
      "#FF4646",
  ];
  lastColorIndex = (lastColorIndex + 1) % colors.length;
  return colors[lastColorIndex];
}

let lastColorIndex = -1;

/**
* Renders a task card HTML based on the given task data.
* 
* @param {object} task - The task object containing details about the task.
* @param {string} key - The key of the task.
* @param {string} categoryClass - The CSS class representing the task's category.
* @param {object} svgIcons - The object containing SVG icons for different priority levels.
* @returns {string} The HTML string for the task card.
*/
function renderTaskCard(task, key, categoryClass, svgIcons) {
  const priorityIcon = task.priority ? (svgIcons[task.priority.toLowerCase()] || "") : "";
  const typHTML = `<span class="${categoryClass}">${task.category}</span>`;
  const progress = calculateProgress(task.subtasks);
  const subtasksHTML = renderSubtasks(task.subtasks, key);
  const assignedToHTML = renderAssignedTo(task.assignedto, key, false);
  const progressHTML = renderProgress(task.subtasks, key, progress);
  const assignedToFullHTML = renderAssignedTo(task.assignedto, key, true);
  const taskData = prepareTaskData(task, priorityIcon, typHTML, subtasksHTML, assignedToHTML, assignedToFullHTML);
  
  return buildTaskCardHTML(key, taskData, typHTML, progressHTML, assignedToHTML, priorityIcon);
}

/**
* Renders the HTML for the subtasks of a given task.
* 
* @param {Array} subtasks - The array of subtasks.
* @param {string} key - The key of the task to which the subtasks belong.
* @returns {string} The HTML string for the subtasks.
*/
function renderSubtasks(subtasks, key) {
  let subtasksHTML = "";
  if (subtasks && subtasks.length > 0) {
      subtasks.forEach((subtask, i) => {
          subtasksHTML += `
              <div class="subtask-item">
                  <label>
                      <input class="styled-checkbox" type="checkbox" id="subtask-checkbox-${key}-${i}" 
                          ${subtask.itsdone ? "checked" : ""} 
                          onclick="toggleSubtaskStatus(&#39;${key}&#39;, ${i}, this.checked)">
                      <span class="subtasktitles">${subtask.title}</span>
                  </label>
              </div>`;
      });
  }
  return subtasksHTML;
}

/**
* Renders the HTML for the assigned-to section of a task.
* 
* @param {Array} assignedToList - The list of people to whom the task is assigned.
* @param {string} key - The key of the task.
* @param {boolean} full - Whether to render the full list or a limited preview.
* @returns {string} The HTML string for the assigned-to section.
*/
function renderAssignedTo(assignedToList, key, full = false) {
  let assignedToHTML = "";
  if (assignedToList && assignedToList.length > 0) {
      assignedToHTML = assignedToList.slice(0, full ? assignedToList.length : 3).map((assignedTo, j) => {
          const initials = getInitials(assignedTo.name);
          const avatarColor = getAvatarColor(assignedTo.name);
          return `
              <div class="assignedtoItem" style="background-color: ${avatarColor}; border-radius: 50%; width: 40px; height: 40px; 
              display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                  <span class="assignedtoavatar">${initials}</span>
              </div>`;
      }).join("");

      if (!full && assignedToList.length > 3) {
          assignedToHTML += `
              <div class="assignedtoItem" style="background-color: #ccc; border-radius: 50%; width: 40px; height: 40px; 
              display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                  <span class="assignedtoavatar">+${assignedToList.length - 3}</span>
              </div>`;
      }
  }
  return assignedToHTML;
}

/**
* Renders the progress bar for the task based on the completed subtasks.
* 
* @param {Array} subtasks - The array of subtasks.
* @param {string} key - The key of the task to which the subtasks belong.
* @param {number} progress - The progress percentage.
* @returns {string} The HTML string for the progress bar.
*/
function renderProgress(subtasks, key, progress) {
  if (!subtasks || subtasks.length === 0) return "";
  const completedSubtasks = subtasks.filter(subtask => subtask.itsdone).length;
  return `
      <div class="Progress">
            <span class="progress-bar-container">
              <div id="progress-bar-${key}" class="progress-bar" style="width: ${progress}%;"></div>
          </span>
          <span id="subtask-progress-${key}" class="subtask-progress">${completedSubtasks}/${subtasks.length} Subtasks</span>
          <span class="tooltiptext">${completedSubtasks} of ${subtasks.length} done</span>
      </div>`;
}

/**
* Prepares the task data for rendering into the task card.
* 
* @param {object} task - The task object containing details about the task.
* @param {string} priorityIcon - The SVG icon representing the task's priority.
* @param {string} typHTML - The HTML string for the task's category.
* @param {string} subtasksHTML - The HTML string for the task's subtasks.
* @param {string} assignedToHTML - The HTML string for the task's assigned-to section.
* @param {string} assignedToFullHTML - The full HTML string for the task's assigned-to section.
* @returns {object} An object containing the prepared task data.
*/
function prepareTaskData(task, priorityIcon, typHTML, subtasksHTML, assignedToHTML, assignedToFullHTML) {
  return {
      taskTitle: task.task,
      taskDescription: task.description,
      taskPriorityIcon: priorityIcon,
      taskPriority: task.priority,
      taskCategoryHTML: typHTML,
      dueDate: task.duedate,
      subtasksHTML: subtasksHTML,
      assignedToHTML: assignedToHTML,
      assignedToFullNameHTML: assignedToFullNameHTML(task.assignedto, "", true),
      assignedToFullHTML: assignedToFullHTML,
  };
}

function assignedToFullNameHTML(assignedToList, key, full = false) {
  let assignedToHTML = "";
  if (assignedToList && assignedToList.length > 0) {
      assignedToHTML = assignedToList.slice(0, full ? assignedToList.length : 3).map((assignedTo, j) => {
          return `
                  <span class="fullnames" >${assignedTo.name}</span>`;
      }).join("");

      if (!full && assignedToList.length > 3) {
          assignedToHTML += `
                  <span class="fullnames">+${assignedToList.length - 3}</span>`;
      }
  }
  return assignedToHTML;
}

/**
* Builds the HTML string for the task card using the provided task data.
* 
* @param {string} key - The key of the task.
* @param {object} taskData - The task data object prepared by `prepareTaskData`.
* @param {string} typHTML - The HTML string for the task's category.
* @param {string} progressHTML - The HTML string for the task's progress bar.
* @param {string} assignedToHTML - The HTML string for the task's assigned-to section.
* @param {string} priorityIcon - The SVG icon representing the task's priority.
* @returns {string} The HTML string for the task card.
*/
/* function buildTaskCardHTML(key, taskData, typHTML, progressHTML, assignedToHTML, priorityIcon) {
  // Check if the dots element already exists
  const dotsId = `responsive-dots-${key}`;
  const existingDots = document.getElementById(dotsId);

  return `
    <div id="task-card-${key}" onclick='openSingleTaskOverlay(${JSON.stringify(taskData)}, "${key}")' 
        draggable="true" ondragstart="startDragging('${key}')" class="task-cards no-copy">
        ${typHTML}
        <div class="task-title">${taskData.taskTitle}</div>
        <div class="task-description">${taskData.taskDescription}</div>
        ${progressHTML}
        <div class="taskpriority">
            <div class="assignedToHTML">${assignedToHTML}</div>
            ${priorityIcon}
        </div>
    </div>
    ${!existingDots ? `<img id="${dotsId}" onclick="openMobileMenu('${key}')" class="responsive-dots" 
        src="../../IMGicons/three-dots-vertical.svg" alt="dotsResponsive">` : ""}
    <div style="display: none" class="miniMenu" id="${key}">
        <span class="featTxt" style="text-decoration:none;cursor:unset;">Move to:</span>
        <span class="mini-menu" onclick="pushInToDo('${key}')">To-Do</span>
        <span class="mini-menu" onclick="pushInProgress('${key}')">In Progress</span>
        <span class="mini-menu" onclick="pushInAwaitFeedback('${key}')">Await feedback</span>
        <span class="mini-menu" onclick="pushInDone('${key}')">Done</span>
    </div>`;
}
 */


function buildTaskCardHTML(key, taskData, typHTML, progressHTML, assignedToHTML, priorityIcon) {
  return `
    <div id="task-card-${key}" onclick='openSingleTaskOverlay(${JSON.stringify(taskData)}, "${key}")' 
        draggable="true" ondragstart="startDragging('${key}')" class="task-cards no-copy">
        
        <!-- Overlay, das beim Öffnen des Menüs angezeigt wird -->
        <div class="overlay" id="overlay-${key}" onclick="closeMiniMenu(event, '${key}')"></div>
        
        ${typHTML}
        <div class="task-title">${taskData.taskTitle}</div>
        <div class="task-description">${taskData.taskDescription}</div>
        ${progressHTML}
        <div class="taskpriority">
            <div class="assignedToHTML">${assignedToHTML}</div>
            ${priorityIcon}
        </div>
        
        <!-- Responsive Dots Icon -->
        <img id="responsive-dots-${key}" onclick="toggleMobileMenu(event, '${key}')" class="responsive-dots" 
            src="../../IMGicons/three-dots-vertical.svg" alt="dotsResponsive">
        
        <!-- Mini Menu -->
        <div class="miniMenu" id="miniMenu-${key}">
            <span class="featTxt">Move to:</span>
            <span class="mini-menu" onclick="pushInToDo(event, '${key}')">To-Do</span>
            <span class="mini-menu" onclick="pushInProgress(event, '${key}')">In Progress</span>
            <span class="mini-menu" onclick="pushInAwaitFeedback(event, '${key}')">Await feedback</span>
            <span class="mini-menu" onclick="pushInDone(event, '${key}')">Done</span>
        </div>
    </div>`;
}



function toggleMobileMenu(event, key) {
  event.stopPropagation(); // Verhindert das Öffnen des Task-Overlays
  
  const menu = document.getElementById(`miniMenu-${key}`);
  const overlay = document.getElementById(`overlay-${key}`);
  
  // Schließe andere offene Menüs und Overlays
  document.querySelectorAll(".miniMenu.show").forEach((openMenu) => {
      if (openMenu !== menu) {
          openMenu.classList.remove("show");
      }
  });
  document.querySelectorAll(".overlay.show").forEach((openOverlay) => {
      if (openOverlay !== overlay) {
          openOverlay.classList.remove("show");
      }
  });

  // Toggle die Anzeige des Menüs und des Overlays
  menu.classList.toggle("show");
  overlay.classList.toggle("show");

  // Wenn das Menü geöffnet ist, füge einen globalen Klick-Event-Listener hinzu
  if (menu.classList.contains("show")) {
    document.addEventListener("click", (e) => closeMiniMenuOnOutsideClick(e, key));
  } else {
    document.removeEventListener("click", (e) => closeMiniMenuOnOutsideClick(e, key));
  }
}

// Funktion zum Schließen des Menüs und des Overlays beim Klick außerhalb des Menüs
function closeMiniMenu(event, key) {
  event.stopPropagation(); // Verhindert andere Klick-Events
  document.getElementById(`miniMenu-${key}`).classList.remove("show");
  document.getElementById(`overlay-${key}`).classList.remove("show");
}

// Funktion, die das Menü schließt, wenn außerhalb geklickt wird
function closeMiniMenuOnOutsideClick(event, key) {
  const menu = document.getElementById(`miniMenu-${key}`);
  const overlay = document.getElementById(`overlay-${key}`);
  const dots = document.getElementById(`responsive-dots-${key}`);

  if (!menu.contains(event.target) && !dots.contains(event.target)) {
    menu.classList.remove("show");
    overlay.classList.remove("show");
    document.removeEventListener("click", (e) => closeMiniMenuOnOutsideClick(e, key));
  }
}





/**
* Opens the mobile menu for the given task key, positioning it correctly on the screen.
* 
* @param {string} key - The key of the task for which to open the mobile menu.
*/
/* function openMobileMenu(key) {
  const menu = document.getElementById(key);
  document.querySelectorAll(".miniMenu.show").forEach((openMenu) => {
      if (openMenu !== menu) {
          openMenu.classList.remove("show");
          setTimeout(() => hideMenu(openMenu), 300);
      }
  });
  if (menu.classList.contains("show")) {
      menu.classList.remove("show");
      setTimeout(() => hideMenu(menu), 300);
  } else {
      positionMenu(menu, key);
  }
} */

/**
* Hides the specified menu element by setting its display style to none.
* 
* @param {HTMLElement} menu - The menu element to hide.
*/
function hideMenu(menu) {
  menu.style.display = "none";
  menu.style.left = "";
}

/**
* Positions the specified menu element relative to the associated task card on the screen.
* 
* @param {HTMLElement} menu - The menu element to position.
* @param {string} key - The key of the task for which to position the menu.
*/
/* function positionMenu(menu, key) {
  const imgElement = document.querySelector(`img[onclick="openMobileMenu('${key}')"]`);
  const imgRect = imgElement.getBoundingClientRect();

  // Entferne `window.scrollY` und prüfe die Positionierung
  menu.style.top = `${imgRect.top}px`;
  menu.style.left = `${imgRect.left - menu.offsetWidth}px`;

  menu.style.display = "flex";
  setTimeout(() => menu.classList.add("show"), 100);
} */




/**
* Renders a task card for a task in the To-Do section.
* 
* @param {object} task - The task object containing details about the task.
* @param {string} key - The key of the task.
* @returns {string} The HTML string for the task card in the To-Do section.
*/
function renderDivTodo(task, key) {
  return renderTaskCard(task, key, getCategoryClass(task), svgIcons);
}

/**
* Renders a task card for a task in the In Progress section.
* 
* @param {object} task - The task object containing details about the task.
* @param {string} key - The key of the task.
* @returns {string} The HTML string for the task card in the In Progress section.
*/
function renderDivInprogress(task, key) {
  return renderTaskCard(task, key, getCategoryClass(task), svgIcons);
}

/**
* Renders a task card for a task in the Done section.
* 
* @param {object} task - The task object containing details about the task.
* @param {string} key - The key of the task.
* @returns {string} The HTML string for the task card in the Done section.
*/
function renderDivDone(task, key) {
  return renderTaskCard(task, key, getCategoryClass(task), svgIcons);
}

/**
* Renders a task card for a task in the Awaiting Feedback section.
* 
* @param {object} task - The task object containing details about the task.
* @param {string} key - The key of the task.
* @returns {string} The HTML string for the task card in the Awaiting Feedback section.
*/
function renderDivawaitingfeedback(task, key) {
  return renderTaskCard(task, key, getCategoryClass(task), svgIcons);
}

/**
* Returns the appropriate CSS class for the task category.
* 
* @param {object} task - The task object containing details about the task.
* @returns {string} The CSS class for the task's category.
*/
function getCategoryClass(task) {
  return task.category === "Technical Task" ? "technical-green" : "user-story-blue";
}

/**
* Toggles the status of a subtask between completed and not completed.
* 
* @param {string} taskKey - The key of the task containing the subtask.
* @param {number} subtaskIndex - The index of the subtask to toggle.
* @param {boolean} isChecked - Whether the subtask is marked as completed.
*/
function toggleSubtaskStatus(taskKey, subtaskIndex, isChecked) {
  let task = tasks[taskKey];
  task.subtasks[subtaskIndex].itsdone = isChecked;

  updateProgressBar(taskKey, calculateProgress(task.subtasks));
  updateSubtaskProgress(taskKey, task.subtasks);
  updateTaskOnServer(taskKey, task);
}

/**
* Updates the progress bar for a task based on the current progress percentage.
* 
* @param {string} taskKey - The key of the task for which to update the progress bar.
* @param {number} progress - The current progress percentage.
*/
function updateProgressBar(taskKey, progress) {
  let progressBar = document.getElementById(`progress-bar-${taskKey}`);
  if (progressBar) progressBar.style.width = `${progress}%`;
}

/**
* Updates the subtask progress text for a task based on the number of completed subtasks.
* 
* @param {string} taskKey - The key of the task for which to update the subtask progress.
* @param {Array} subtasks - The array of subtasks for the task.
*/
function updateSubtaskProgress(taskKey, subtasks) {
  let subtaskProgress = document.getElementById(`subtask-progress-${taskKey}`);
  if (subtaskProgress) {
      let completedSubtasks = subtasks.filter(subtask => subtask.itsdone).length;
      subtaskProgress.innerText = `${completedSubtasks}/${subtasks.length} Subtasks`;
  }
}

/**
* Calculates the progress percentage for a task based on the number of completed subtasks.
* 
* @param {Array} subtasks - The array of subtasks for the task.
* @returns {number} The progress percentage.
*/
function calculateProgress(subtasks) {
  if (!subtasks || subtasks.length === 0) return 0;
  const completedTasks = subtasks.filter(subtask => subtask.itsdone).length;
  return (completedTasks / subtasks.length) * 100;
}

/**
* Updates the task data on the server using a PATCH request.
* 
* @param {string} taskKey - The key of the task to update.
* @param {object} updatedTask - The updated task data.
*/
function updateTaskOnServer(taskKey, updatedTask) {
  fetch(
      `https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/demoUser/users/user1ID/notes/${taskKey}.json`,
      {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
      }
  )
  .then(response => { if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); return response.json(); })
  .catch(error => { console.error("Error updating task on server:", error); });
}

const PB_API =
  "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/users";

/**
 * Initializes the header by attempting to load the user's initials and display them.
 * If the user cannot be loaded, retries the initialization after 2 seconds, up to 2 attempts.
 *
 * @param {number} [attempt=1] - The current attempt number. Defaults to 1.
 * @returns {Promise<void>} A promise that resolves when the header initialization is complete.
 */
async function initHeader(attempt = 1) {
  let check = document.getElementById("PB");
  const userID1 = sessionStorage.getItem("userId");
  const userId = localStorage.getItem("userId");
  const guestToken = sessionStorage.getItem("guestToken");
  checkClickIcon(userID1, userId, guestToken);
  if (check) {
    try {
      checkClickIcon(userID1, userId, guestToken);
      let user = null;

      if (userID1) {
        user = await loadData(`${PB_API}/${userID1}`);
      } else if (userId) {
        user = await loadData(`${PB_API}/${userId}`);
      } else if (guestToken) {
        user = await loadData(`${PB_API}/${guestToken}`);
      }

      if (!user || !user.name) {
        throw new Error("User or user name could not be loaded");
      }

      const initials = getInitials(user.name);
      document.getElementById("PB").innerHTML = initials;
    } catch (error) {
      if (attempt < 2) {
        setTimeout(() => initHeader(attempt + 1), 2000);
      } else {
      }
    }
  } else {
    if (attempt < 2) {
      setTimeout(() => initHeader(attempt + 1), 2000);
    } else {
    }
  }
}

/**
 * Generates initials from a full name.
 * The initials are created from the first letter of the first and last names.
 *
 * @param {string} fullName - The full name of the user.
 * @returns {string} The initials generated from the full name.
 */
function getInitials(fullName) {
  const nameParts = fullName.trim().split(/\s+/);
  let initials = "";

  if (nameParts.length > 0) {
    initials += nameParts[0].charAt(0).toUpperCase();
  }

  if (nameParts.length > 1) {
    initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }

  return initials.substring(0, 2);
}

/**
 * Toggles the visibility of the information dropdown.
 * If the dropdown is visible, it hides it; if hidden, it shows it.
 */
function infoTap() {
  let infoDIV = document.getElementById("dropdown-content");
  let checkClass = infoDIV.classList.contains("dropdown-content");
  if (checkClass) {
    infoDIV.classList.remove("dropdown-content");
    infoDIV.classList.add("d-none");
  } else {
    infoDIV.classList.add("dropdown-content");
    infoDIV.classList.remove("d-none");
  }
}

/**
 * Logs the user out by removing their ID from localStorage and sessionStorage,
 * then redirects to the login page with a logout message.
 * If an error occurs, it redirects to the login page with an error message.
 */
function logout() {
  try {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("guestToken");
    window.location.href = "./login.html?msg=logout";
  } catch (error) {
    window.location.href = "./login.html?msg=error_localStorage";
  }
}

/**
 * Checks whether the user is logged in and replaces the onclick on the logo
 * @param userID1 - User token in session Storage
 * @param userId - User token in local Storage
 * @param guestToken - guest Token in session Storage (true = OK)
 */
function checkClickIcon(userID1, userId, guestToken) {
  setTimeout(function () {
    let elseHTML = document.getElementById("logoClick");
    if (userID1 === null && userId === null && guestToken === null) {
      elseHTML.innerHTML = `
            <img class="join_logo" onclick="window.close()" src="IMGicons/headericons/joinlogo.png" alt="Logo Join">
                
                <div class="sidebar-nav headericons">
                    <p class="sidebarlist active" id="nav-summary"><a class ="active_summary abc" href="summary.html">Summary</a></p>
                    <p class="sidebarlist active" id="nav-add-task"><a class ="active_addtask abc" href="add_task.html">Add Task</a></p>
                    <p class="sidebarlist active" id="nav-board"><a class ="active_board abc" href="board.html">Board</a></p>
                    <p class="sidebarlist active" id="nav-contacts"><a class ="active_contacts abc" href="contacts.html">Contacts</a></p>
                </div>
        `;
    }
  }, 100);
}

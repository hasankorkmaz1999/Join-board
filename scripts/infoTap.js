/**
 * A boolean flag to track the state of the menu.
 * @type {boolean}
 */
let menuOpen = false;

/**
 * Toggles the visibility of the dropdown menu.
 * If the menu is currently closed, it will be displayed.
 * If the menu is currently open, it will be hidden.
 */
function toggleMenu() {
  const menu = document.getElementById('dropdown-content');
  if (menu) {
    if (!menuOpen) {
      menu.style.display = 'block'; 
      menuOpen = true;
    } else {
      menu.style.display = 'none';
      menuOpen = false;
    }
  }
}

/**
 * Event listener for document click events.
 * Toggles the dropdown menu if the menu button is clicked.
 * Hides the dropdown menu if a click occurs outside the menu while it is open.
 * 
 * @param {MouseEvent} event - The click event.
 */
document.addEventListener('click', function(event) {
  const menu = document.getElementById('dropdown-content');
  const menuButton = document.getElementById('PB');

  if (menu && menuButton) {
    if (event.target === menuButton) {
      event.stopPropagation();
      toggleMenu();
    } else if (!menu.contains(event.target) && menuOpen) {
      menu.style.display = 'none';
      menuOpen = false;
    }
  }
});

/**
 * Another event listener for document click events.
 * (Note: This seems to be an incomplete function and might need further implementation.)
 * 
 * @param {MouseEvent} event - The click event.
 */
document.addEventListener('click', function(event) {
  const menu = document.getElementById('dropdown-content');
});
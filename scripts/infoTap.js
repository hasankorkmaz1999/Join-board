/**
 * A flag to track the state of the menu (open or closed).
 * @type {boolean}
 */
let menuOpen = false;

/**
 * Toggles the display state of the dropdown menu.
 * If the menu is currently closed, it will be opened and vice versa.
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
 * Event listener for document clicks.
 * Toggles the menu if the menu button is clicked.
 * Closes the menu if a click occurs outside the menu while it is open.
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
 * Event listener for document clicks.
 * Stops propagation if the click occurs inside the menu.
 */
document.addEventListener('click', function(event) {
  const menu = document.getElementById('dropdown-content');
  if (menu && menu.contains(event.target)) {
    event.stopPropagation();
  }
});

/**
 * Event listener for DOM content loaded.
 * Ensures the menu is hidden when the page is first loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('dropdown-content');
  if (menu) {
    menu.style.display = 'none';
  }
});
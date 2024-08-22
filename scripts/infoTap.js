// blendet das kleine Menu bei klick auf die Seite aus
let menuOpen = false;


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


document.addEventListener('click', function(event) {
  const menu = document.getElementById('dropdown-content');
  if (menu && menu.contains(event.target)) {
    event.stopPropagation();
  }
});


document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('dropdown-content');
  if (menu) {
    menu.style.display = 'none';
  }
});

/**
 * Toggles the visibility of the mobile edit contacts button based on the viewport width.
 * @param {boolean} viewquery - The query to check if the view is big or small.
 */
function mobileButtonChange(viewquery) {
    let divElement = document.getElementById('editContactsMobile')
    if (viewquery === true) {
        if (window.innerWidth <= 550) {
            divElement.classList.remove('d-non');
            divElement.classList.add('edit-contact-mobile');
        }
    }
    if (viewquery === false) {
        if (window.innerWidth <= 550) {
            divElement.classList.add('d-non');
            divElement.classList.remove('edit-contact-mobile');
        }
    }
}

/**
 * Adjusts the contact view for responsive design based on the viewport width.
 * @param {string} id - The unique ID of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 */
function contactResponsive(id, name, email, phone) {
    if (window.innerWidth <= 850) {

    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';

    let currentHighlightedDiv = document.querySelector('.contact-item.active');
    if (currentHighlightedDiv) {
        currentHighlightedDiv.classList.add('active');
    }
    } else {
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('main-content').style.display = 'block'; 
    }
}

/**
 * Closes the single contact view and adjusts the layout.
 */
function closeSingleContact() {
    let contactContainer = document.getElementById('contact-container');
    document.getElementById('sidebar').style.display = 'block';
    mobileButtonChange(false);
    contactContainer.classList.add('slide-out-right');
    setTimeout(() => {
        contactContainer.classList.add('d-none');
        contactContainer.classList.remove('show'); // entfernt die Animationsklasse
        contactContainer.classList.remove('slide-in-right');
        contactContainer.classList.remove('slide-out-right');
        contactContainer.innerHTML = ``;
    }, 650); // sicherstellen, dass dies mit der Dauer der Animation übereinstimmt
}

/**
 * Opens the single contact view and adjusts the layout.
 */
window.addEventListener('resize', function() {
if (window.innerWidth < 850) {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    }
});
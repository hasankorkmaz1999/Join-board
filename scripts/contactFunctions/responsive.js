/**
 * Changes the visibility of the mobile edit contacts button based on the viewport size.
 * @param {boolean} viewquery - Indicates whether the view query is true or false.
 */


function mobileButtonChange(viewquery) {
    let divElement = document.getElementById('editContactsMobile');
    if (viewquery === true) {
        if (window.innerWidth <= 550) {
            divElement.classList.remove('d-none');
            divElement.classList.add('edit-contact-mobile');
        }
    }
    if (viewquery === false) {
        if (window.innerWidth <= 550) {
            divElement.classList.add('d-none');
            divElement.classList.remove('edit-contact-mobile');
        }
    }
}


/**
 * Adjusts the contact view for responsiveness based on the viewport size.
 * @param {string} id - The ID of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 */


function contactResponsive(id, name, email, phone) {
    if (window.innerWidth <= 1000) {
        document.getElementById('sidebar').style.display = 'd-none';
        // document.getElementById('main-content').style.display = 'block';

        let currentHighlightedDiv = document.querySelector('.contact-item.active');
        if (currentHighlightedDiv) {
            currentHighlightedDiv.classList.add('active');
        }
    } else {
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('main-content').style.display = 'none';
    }
}


/**
 * Closes the single contact view and resets the view to show the sidebar.
 */


function closeSingleContact() {
    document.getElementById('addNewContactMobile').style.display = 'block';
    let contactContainer = document.getElementById('contact-container');
    document.getElementById('sidebar').style.display = 'block';
    document.getElementById('main-content').style.display = 'd-none';
    document.getElementById('main-content').style.display = 'none';
    mobileButtonChange(false);
    contactContainer.classList.add('slide-out-right');
    contactContainer.classList.add('contact-container');
    setTimeout(() => {
        contactContainer.classList.remove('slide-in-right');
        contactContainer.classList.remove('contact-container');
        contactContainer.classList.remove('slide-out-right');
        contactContainer.innerHTML = ``;
    }, 650);
}


window.addEventListener('resize', function() {
    if (window.innerWidth < 1000) {
        document.getElementById('main-content').style.display = 'none';
        document.getElementById('sidebar').style.display = 'block';
    }
});


/**
 * Opens the mobile edit contacts window.
 */


function editContactsMobile() {
    let mobileEditWindow = document.getElementById('mobileEditorDeleteWindow');
    let overlay = document.getElementById('overlayformobile');

    mobileEditWindow.innerHTML = renderResponsiveEditButtons();
    mobileEditWindow.classList.remove('d-none');
    mobileEditWindow.classList.add('slide-in-right');
    overlay.classList.remove('d-non');
    overlay.classList.add('overlayformobile');

    setTimeout(() => {
        mobileEditWindow.classList.add('mobileEditorDeleteWindow');
    }, 50);
}


/**
 * Renders the responsive edit buttons for the mobile view.
 * @returns {string} The HTML string for the edit buttons.
 */


function renderResponsiveEditButtons() {
    let id = document.getElementById('fullID');
    let fullID = id.innerText;
    return /*html*/`
        <span onclick="editContacts('${fullID}'); closeOverlayButton();" class="mobileEditorButtons"><img class="mobileEditorButtons" src="./IMGicons/edit.svg" alt="edit icon"> Edit</span>
        <span onclick="deletContacts('${fullID}'); closeOverlayButton();" class="mobileEditorButtons"><img class="mobileEditorButtons" src="./IMGicons/delete.svg" alt="delete icon"> Delete</span>
    `;
}


/**
 * Closes the mobile edit contacts window.
 */


function closeOverlayButton() {
    let mobileEditWindow = document.getElementById('mobileEditorDeleteWindow');
    let overlay = document.getElementById('overlayformobile');

    mobileEditWindow.classList.remove('slide-in-right');
    mobileEditWindow.classList.add('slide-out-right');
    overlay.classList.remove('overlayformobile');

    setTimeout(() => {
        mobileEditWindow.classList.add('d-none');
        mobileEditWindow.classList.remove('mobileEditorDeleteWindow');
        mobileEditWindow.classList.remove('slide-out-right');
        overlay.classList.add('d-non');
    }, 200);
}


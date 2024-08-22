/**
 * Opens the overlay to add a new contact.
 */
function addNewContact() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove("d-none");
    overlay.classList.add('slide-in-right');
}


/**
 * Closes the overlay.
 */
function closeOverlay() {
    let divID = document.getElementById('overlay');
    divID.classList.add('slide-out-right');
    setTimeout(() => {
        let divID = document.getElementById('overlay');
        divID.classList.add('d-none');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}
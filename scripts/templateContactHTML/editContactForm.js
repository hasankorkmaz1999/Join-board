/**
 * Generates the HTML form to edit a contact.
 * @param {string} name - The name of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} id - The unique ID of the contact.
 * @returns {string} The HTML form for editing the contact.
 */
function editContactForm(name, phone, email, id) {
    return /*html*/`
        <div class="contactForm">
            <div class="contactFormLeft contactFormLeftFluid">
                <div class="mobile-icon-corner-right"></div>
                <img class="logo-overlay" src="./icons/logo_with_blue.svg" alt="Join Logo">
                <h1 class="mobile">Edit contact</h1>
                <p class="subheader-edit-mobile">Tasks are better with a team!</p>
                <div class="mobile-edit-underline"></div>
            </div>
            <form class="contactFormRight" onsubmit="finishEditContact('${id}'); return false;">
                <img src="./icons/contacticons/kontak.png" alt="">
                <div class="contactinputfields">
                    <img onclick="closeEditOverlay()" class="closeX" src="./icons/close.svg" alt="Icon close">
                    <span id="name-error-edit" class="error-messagename"></span>
                    <input value="${name}" id="nameValue"  class="inputfiledsname" placeholder="Name" type="text" name="name">


                    <span id="email-error-edit" class="error-messageemail"></span>
                    <input value="${email}" id="emailValue" class="inputfiledsemail" placeholder="Email" type="text" name="email">


                    <span id="phone-error-edit" class="error-messagephone"></span>
                    <input value="${phone}" id="phoneValue" class="inputfiledsphone" placeholder="Phone" type="text" name="phone">

                    
                    <div class="contactbuttons">
                        <button type="button" onclick="closeEditOverlay()" class="cancelbutton">Delete</button>
                        <button type="submit" class="saveButton">Save<img class="check-icon-mobile" src="./icons/check.svg" alt="Icon check"></button>
                    </div>
                </div>
            </form>
        </div>
    `
}
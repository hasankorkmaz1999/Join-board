/**
 * Generates the HTML form to edit a contact.
 * @param {string} name - The name of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} id - The unique ID of the contact.
 * @returns {string} The HTML form for editing the contact.
 */


function editContactForm(name, phone, email, id) {
    let delID = document.getElementById('fullID');
    let fullDelID = delID.innerText;
    
    return /*html*/`
        <div class="contactForm">
            <div class="contactFormLeft contactFormLeftFluid">
                <div class="mobile-icon-corner-right"></div>
                <img class="logo-overlay" src="./IMGicons/logo_with_blue.svg" alt="Join Logo">
                <h1 class="mobile">Edit contact</h1>
                <p class="subheader-edit-mobile">Tasks are better with a team!</p>
                <div class="mobile-edit-underline"></div>
            </div>
          
            <form class="contactFormRight" onsubmit="finishEditContact('${id}'); return false;">
                <img src="./IMGicons/contacticons/kontak.png" alt="">
                <div class="contactinputfieldsedit">
                    <img onclick="closeEditOverlay()" class="closeX" src="./IMGicons/close.svg" alt="Icon close">


                    <div class="form-group">
                    <input value="${name}" id="nameValue"  class="inputfiledsname" placeholder="Name" type="text" name="name">
                    <span id="name-error-edit" class="error-messagename"></span>
                    </div>

                    <div class="form-group">
                    <input value="${email}" id="emailValue" class="inputfiledsemail" placeholder="Email" type="text" name="email">
                    <span id="email-error-edit" class="error-messageemail"></span>
                    </div>


                    <div class="form-group">
                    <input value="${phone}" id="phoneValue" class="inputfiledsphone" placeholder="Phone" type="text" name="phone">
                    <span id="phone-error-edit" class="error-messagephone"></span>
                    </div>


                    <div class="contactbuttons">
                        <button type="button" onclick="closeEditOverlay(); deletContacts('${fullDelID}')" class="cancelbuttonEdit">Delete</button>
                        <button type="submit" class="saveButton">Save<img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check"></button>
                    </div>
                </div>
            </form>
            
        </div>
    `

}
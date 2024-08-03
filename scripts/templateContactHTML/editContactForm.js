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
                    <span id="name-error-edit" class="error-message"></span>
                    <input value="${name}" id="nameValue"  class="inputfiledsname" placeholder="Name" type="text" name="name">
                    <span id="email-error-edit" class="error-message"></span>
                    <input value="${email}" id="emailValue" class="inputfiledsemail" placeholder="Email" type="text" name="email">
                    <span id="phone-error-edit" class="error-message"></span>
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
function editContactForm(name, phone, email, id) {
    return /*html*/`
        <div class="contactForm">
        <div class="contactFormLeft">
            <img class="joinnnlogocontact" src="./icons/Capa2Edit.svg" alt="">
            <img class="addcontacttext" src="./icons/Frame211Edit.svg" alt="">
        </div>
        <form class="contactFormRight" onsubmit="finishEditContact('${id}'); return false;">
            <img src="./icons/contacticons/kontak.png" alt="">
            <div class="contactinputfields">
                <img onclick="closeEditOverlay()" class="closeX" src="./icons/close.svg" alt="">
                <input value="${name}" id="nameValue"  class="inputfiledsname" placeholder="Name" type="text" name="name">
                <input value="${email}" id="emailValue" class="inputfiledsemail" placeholder="Email" type="text" name="email">
                <input value="${phone}" id="phoneValue" class="inputfiledsphone" placeholder="Phone" type="text" name="phone">
                <div class="contactbuttons">
                    <button type="button" onclick="closeEditOverlay()" class="cancelbutton">Cancel X</button>
                    <button type="submit" class="createbutton">Edit contact<img src="./icons/check.svg" alt=""></button>
                </div>
            </div>
        </form>
    `
}
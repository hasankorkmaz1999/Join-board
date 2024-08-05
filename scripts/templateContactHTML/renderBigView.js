/**
 * 
 * @param {string} id - The unique ID of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color of the contact.
 * @returns {string} The HTML for the big view of the contact.
 */
function renderBigView(id, name, email, phone, color) {
    return /*html*/`
        <div id="fullID" class="d-none">${id}</div>
        <div class="contact-details-big">
            <div class="avatar" style="background-color: ${color};">${getInitials(name)}</div>
                <div class="contact-info">
                    <div class="contact-name-big">${name}</div>
                    <div class="flex-card-big">
                        <div onclick="editContacts('${id}')" class="edit-big">Edit</div>
                        <div onclick="deletContacts('${id}')" class="delete-big">Delete</div>
                    </div>
                </div> 
            </div>
            <div class="contact-container-big">
                <div class="info-big">Contact Information</div>
                <div class="email-big">Email</div>
                <div class="contact-email-big"><a href="mailto:${email}">${email}</a></div>
                <div class="phone-big">Phone</div>
                <div class="contact-phone-big">${phone || ''}</div>
            </div>
        </div>
    `
}
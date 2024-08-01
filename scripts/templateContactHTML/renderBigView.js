function renderBigView(id, name, email, phone, color) {
    return /*html*/`
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
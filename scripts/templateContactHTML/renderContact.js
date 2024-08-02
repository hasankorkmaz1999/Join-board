/**
 * Rendert einen einzelnen Kontakt als HTML.
 * @param {Object} element - Die Kontaktdaten.
 * @param {string} id - Die ID des Kontakts.
 * @returns {string} Der HTML-Code des Kontakts.
 */
function renderContact(element, id) {
    const color = getAvatarColor(id); // Holt die Farbe für diesen Kontakt
    return /*html*/`
        <div class="contact-item" id="contact-${id}" data-color="${color}" onclick="openContact('${id}', '${element.name}', '${element.email}', '${element.phone}')">
            <div class="avatar" style="background-color: ${color};">${getInitials(element.name)}</div>
            <div class="contact-info">
                <div class="contact-name">${element.name}</div>
                <div class="contact-email">${element.email}</div>
            </div>
        </div>
    `;
}
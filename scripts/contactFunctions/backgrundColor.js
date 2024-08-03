/**
 * Funktion zum Generieren einer zufälligen Hintergrundfarbe.
 */
const avatarColorsMap = {};

/**
 * Funktion zum Abrufen oder Generieren einer Hintergrundfarbe für einen Kontakt.
 * @param {string} id - Die ID des Kontakts.
 * @returns {string} Die Hintergrundfarbe des Avatars.
 */
function getAvatarColor(id) {
    if (!avatarColorsMap[id]) {
        avatarColorsMap[id] = avatarColors();
    }
    return avatarColorsMap[id];
}
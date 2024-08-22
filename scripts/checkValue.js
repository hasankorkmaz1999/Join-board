/**
 * Checks if all provided values have a length less than or equal to 30.
 * @param {...string} values - The values to check.
 * @returns {boolean} True if all values are less than or equal to 30 characters, otherwise false.
 */
function isValidLength(...values) {
    return values.every(value => value.length <= 30);
}


/**
 * Validates an email address.
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email address is valid, otherwise false.
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


/**
 * Validates a phone number.
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} True if the phone number is valid, otherwise false.
 */
function isValidPhone(phone) {
    const phonePattern = /^[\d+]+$/;
    return phonePattern.test(phone);
}


/**
 * Sanitizes the input to prevent HTML injection.
 * @param {string} input - The input string to sanitize.
 * @returns {string} The sanitized input string.
 */
function sanitizeInput(input) {
    return input
        .replace(/&/g, " ")
        .replace(/</g, " ")
        .replace(/>/g, " ")
        .replace(/"/g, " ")
        .replace(/'/g, " ");
}
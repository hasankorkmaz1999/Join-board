//Überprüft die max. Länge
function isValidLength(...values) {
    return values.every(value => value.length <= 30);
}

// Funktion zur Validierung der Email-Adresse
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Funktion zur Validierung der Telefonnummer
function isValidPhone(phone) {
    const phonePattern = /^[\d+]+$/;
    return phonePattern.test(phone);
}

// Funktion zur Sanitisierung der Eingaben
function sanitizeInput(input) {
    let element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}
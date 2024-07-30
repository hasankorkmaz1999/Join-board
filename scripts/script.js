window.onload = init;

function init() {
    disableButtonLogin();
    showLogin('loginWindow');
}

// Fehlermeldung für Login
function disableButtonLogin() {
    let mailInput = document.getElementById("signup-email").value;
    let passwordInput = document.getElementById("signup-password").value;
    let button = document.getElementById("loginButton");

    if (mailInput.length > 1 && passwordInput.length > 1) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-email').addEventListener('input', disableButtonLogin);
    document.getElementById('signup-password').addEventListener('input', disableButtonLogin);
    disableButtonLogin(); 
});


function showLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('scale-up-hor-center', 'd-flex', 'align-items-center', 'justify-content-center', 'hundertVh');
        }
    }, 1000);
}

// Login Form Validation (echte E-Mail Adresse mit mindestens 6 Zeichen)
document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();

    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    let errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.innerText = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
        errorMessage.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorMessage.innerText = 'Passwort muss mindestens 6 Zeichen lang sein.';
        errorMessage.style.display = 'block';
        return;
    }

    // form.submit(); // bei Bedarf ....
});


window.onload = init;

let register_API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";

function init() {
    disableButtonLogin();
    showLogin('loginWindow');
    showFooterLogin('footerAnimation');
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

//Animation für das öffnen der loginseite
function showLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('scale-up-hor-center', 'd-flex', 'align-items-center', 'justify-content-center', 'hundertVh');
        }
    }, 1000);
}

function showFooterLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-non');
            element.classList.add('scale-up-hor-center', 'footer-links');
        }
    }, 1000);
}

document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();

    let email = document.getElementById('signup-email').value;
    let name = document.getElementById('signup-name').value;
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

    // Prepare data to be sent to the API
    let userData = {
        "email": email,
        "name": name,
        "password": password
    };

    // Make the API call to register the user
    fetch(register_API + '/users.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            // Redirect to login.html with a success message
            window.location.href = 'login.html?msg=signup_success';
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Registration failed');
            });
        }
    })
    .catch(error => {
        errorMessage.innerText = 'Fehler bei der Registrierung: ' + error.message;
        errorMessage.style.display = 'block';
    });
});

function showPassword() {
    let image = document.getElementById('signup-password-Image');
    let passwordInput = document.getElementById('signup-password');
    if (passwordInput.type === 'password') {
        image.src = './IMGicons/visibility.svg';
        passwordInput.type = 'text';
    } else {
        image.src = './IMGicons/visibility_off.svg';
        passwordInput.type = 'password';
    }
}

function showConfirmPassword() {
    let image = document.getElementById('confirm-signup-password-Image');
    let confirmPasswordInput = document.getElementById('confirm-signup-password');
    if (confirmPasswordInput.type === 'password') {
        image.src = './IMGicons/visibility.svg';
        confirmPasswordInput.type = 'text';
    } else {
        image.src = './IMGicons/visibility_off.svg';
        confirmPasswordInput.type = 'password';
    }
}
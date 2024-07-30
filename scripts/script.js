window.onload = init;

function init() {
    disableButtonLogin();
    showLogin('loginWindow');
}

// Fehlermeldung für Login
function disableButtonLogin() {
    let mailInput = document.getElementById("login-email").value;
    let passwordInput = document.getElementById("login-password").value;
    let button = document.getElementById("loginButton");

    if (mailInput.length > 1 && passwordInput.length > 1) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-email').addEventListener('input', disableButtonLogin);
    document.getElementById('login-password').addEventListener('input', disableButtonLogin);
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


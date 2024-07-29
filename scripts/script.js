window.onload = init;

function init() {
    disableButtonLogin();
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

document.getElementById('login-email').addEventListener('input', disableButtonLogin);
document.getElementById('login-password').addEventListener('input', disableButtonLogin);
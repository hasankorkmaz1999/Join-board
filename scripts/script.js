// Fehlermeldung für Login

function disableButtonLogin() {
    let mailInput = document.getElementById("DUMMY").value;
    let passwordInput = document.getElementById("DUMMY").value;
    let button = document.getElementById("DUMMY");
    if (mailInput.length > 1 && passwordInput.length > 1) {
        dummy3.disabled = false;
    } else {
        button.disabled = true;
    }
}


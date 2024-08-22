let login_API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/users";


window.onload = init;


function init() {
    showLogin('loginWindow');
    showFooterLogin('footerAnimation');
    checkRememberedUser();
    checkRegister();
    disableButtonLogin();
};


function disableButtonLogin() {
    let mailInput = document.getElementById("signup-email").value;
    let passwordInput = document.getElementById("signup-password").value;
    let button = document.getElementById("loginButton");

    if (mailInput.length > 1 && passwordInput.length > 1) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
};


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signup-email').addEventListener('input', disableButtonLogin);
    document.getElementById('signup-password').addEventListener('input', disableButtonLogin);
    disableButtonLogin(); 
});


function checkRememberedUser() {
    let userId = localStorage.getItem('userId');
    if (userId) {
        fetch(`${login_API}/${userId}.json`)
            .then(response => response.json())
            .then(userData => {
                if (userData) {
                    document.getElementById('signup-email').value = userData.email;
                    document.getElementById('signup-password').value = userData.password;
                    document.getElementById('loginButton').click();
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
};


function showLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('scale-up-hor-center', 'd-flex', 'align-items-center', 'justify-content-center', 'hundertVh');
        }
    }, 1000);
};


function showFooterLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-non');
            element.classList.add('scale-up-hor-center', 'footer-links');
        }
    }, 1000);
};


function checkRegister() {
    let urlParams = new URLSearchParams(window.location.search);
    let msg = urlParams.get('msg');
    if (msg === 'signup_success') {
        toastMessage("Registration successful. You can now log in.");
    }
    if (msg === 'login_required') {
        toastMessage("You need to log in to access the page.");
    };
    if (msg === 'error_localStorage') {
        toastMessage("There was a problem with auttherification.");
    };
    if (msg === 'logout') {
        toastMessage("You have been successfully logged out.");
    };
};


document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();

    let email = document.getElementById('signup-email').value;
    let password = document.getElementById('signup-password').value;
    let rememberMe = document.querySelector('.remember-login input').checked;
    let errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    fetch(login_API + '.json')
        .then(response => response.json())
        .then(users => {
            for (let userId in users) {
                if (users[userId].email === email && users[userId].password === password) {
                    if (rememberMe) {
                        localStorage.setItem('userId', userId);
                    } else {
                        sessionStorage.setItem('userId', userId); // Speichern der ID in der Session
                    }
                    window.location.href = './summary.html'; // Redirect to the summary or dashboard page
                    return;
                }
            }
            errorMessage.innerText = 'Email or password is incorrect.';
            errorMessage.style.display = 'block';
        })
        .catch(error => {
            errorMessage.innerText = 'An error occurred during login: ' + error.message;
            errorMessage.style.display = 'block';
        });
});


document.getElementById('guestLoginButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    sessionStorage.setItem('guestToken', 'true');
    
    window.location.href = './summary.html';
});
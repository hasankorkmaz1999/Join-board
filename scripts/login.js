let login_API = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/users";

/**
 * Initializes the login page by displaying the login window and footer, checking for a remembered user, 
 * and handling registration messages. Disables the login button if the inputs are empty.
 */
window.onload = init;

function init() {
    showLogin('loginWindow');
    showFooterLogin('footerAnimation');
    checkRememberedUser();
    checkRegister();
    disableButtonLogin();
};

/**
 * Disables the login button if the email or password fields are empty.
 * Enables the login button if both fields contain text.
 */
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

/**
 * Checks if there is a remembered user in localStorage and attempts to log them in automatically.
 * Fills in the email and password fields if the user is found.
 */
function checkRememberedUser() {
    let userId = localStorage.getItem('userId');
    if (userId) {
        fetch(`${login_API}/${userId}.json`)
            .then(response => response.json())
            .then(userData => {
                if (userData) {
                    document.querySelector('.remember-login input').checked = true;
                    document.getElementById('signup-email').value = userData.email;
                    document.getElementById('signup-password').value = userData.password;
                    disableButtonLogin();
                    document.getElementById('loginButton').click();
                }
            })
            .catch(error => console.error('Error fetching user data:', error));
    }
};

/**
 * Displays the login window by removing the 'd-none' class and adding animation classes after a delay.
 * 
 * @param {string} elementId - The ID of the login window element to display.
 */
function showLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('scale-up-hor-center', 'd-flex', 'align-items-center', 'justify-content-center', 'hundertVh');
        }
    }, 1000);
};

/**
 * Displays the footer animation by removing the 'd-non' class and adding animation classes after a delay.
 * 
 * @param {string} elementId - The ID of the footer element to display.
 */
function showFooterLogin(elementId) {
    setTimeout(() => {
        let element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-non');
            element.classList.add('scale-up-hor-center', 'footer-links');
        }
    }, 1000);
};

/**
 * Checks the URL parameters for specific messages and displays toast messages accordingly.
 */
function checkRegister() {
    let urlParams = new URLSearchParams(window.location.search);
    let msg = urlParams.get('msg');
    if (msg === 'signup_success') {
        toastMessage("Registration successful. You can now log in.");
    }
    if (msg === 'login_required') {
        toastMessage("You need to log in to access the page.");
    }
    if (msg === 'error_localStorage') {
        toastMessage("There was a problem with authentication.");
    }
    if (msg === 'logout') {
        toastMessage("You have been successfully logged out.");
    }
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
                        sessionStorage.setItem('userId', userId); // Store the ID in the session
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

/**
 * Handles guest login by setting a guest token in sessionStorage and redirecting to the summary page.
 */
document.getElementById('guestLoginButton').addEventListener('click', function(event) {
    event.preventDefault();
    
    sessionStorage.setItem('guestToken', 'true');
    
    window.location.href = './summary.html';
});

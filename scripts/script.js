window.onload = init;

const register_API = "https://join-c6967-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Initializes the registration page by setting up the form listeners, displaying the login window and footer, 
 * and checking the form validity to disable or enable the submit button.
 */
function init() {
    showLogin('loginWindow');
    showFooterLogin('footerAnimation');
    setupFormListeners();
    // Initial check to disable the button
    checkFormValidity();
}

/**
 * Displays the login window by removing the 'd-none' class and adding animation classes after a delay.
 * 
 * @param {string} elementId - The ID of the login window element to display.
 */
function showLogin(elementId) {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-none');
            element.classList.add('scale-up-hor-center', 'd-flex', 'align-items-center', 'justify-content-center', 'hundertVh');
        }
    }, 1000);
}

/**
 * Displays the footer animation by removing the 'd-non' class and adding animation classes after a delay.
 * 
 * @param {string} elementId - The ID of the footer element to display.
 */
function showFooterLogin(elementId) {
    setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('d-non');
            element.classList.add('scale-up-hor-center', 'footer-links');
        }
    }, 1000);
}

/**
 * Sets up event listeners for the form fields to check form validity when the user inputs data.
 */
function setupFormListeners() {
    const fields = ['signup-name', 'signup-email', 'signup-password', 'confirm-signup-password', 'privacy-checkbox'];
    fields.forEach(field => {
        document.getElementById(field).addEventListener('input', checkFormValidity);
    });
}

/**
 * Checks the validity of the form by ensuring all required fields are filled.
 * Enables or disables the submit button based on the form's completeness.
 */
function checkFormValidity() {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('confirm-signup-password').value.trim();

    // Check if name, email, and both passwords are filled
    const isFormFilled = name !== '' && email !== '' && password !== '' && confirmPassword !== '';

    // Enable button only if the form is filled
    document.getElementById('loginButton').disabled = !isFormFilled;
}

/**
 * Validates the form data by checking the name length, email format, password length, password match, and privacy checkbox.
 * Displays an error message if validation fails.
 * 
 * @returns {boolean} Returns true if the form is valid; otherwise, false.
 */
function validateForm() {
    const nameInput = document.getElementById("signup-name");
    const mailInput = document.getElementById("signup-email");
    const passwordInput = document.getElementById("signup-password");
    const confirmPasswordInput = document.getElementById("confirm-signup-password");
    const privacyCheckbox = document.getElementById("privacy-checkbox");
    const errorMessage = document.getElementById('error-message');

    let errorText = "";

    if (nameInput.value.length < 3) {
        errorText += "· Name must be at least 3 characters long.\n";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(mailInput.value)) {
        errorText += "· Please enter a valid e-mail address.\n";
    }

    if (passwordInput.value.length < 6) {
        errorText += "· The password must be at least 6 characters long.\n";
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        errorText += "· Passwords do not match.\n";
    }

    if (!privacyCheckbox.checked) {
        errorText += "· Please accept the Privacy Policy.\n";
    }

    if (errorText) {
        errorMessage.innerText = errorText;
        errorMessage.style.display = 'block';
        return false;
    } else {
        errorMessage.style.display = 'none';
        return true;
    }
}

/**
 * Handles the form submission by validating the form and sending the user data to the server.
 * If the registration is successful, redirects to the login page with a success message.
 * If an error occurs, displays an error message.
 */
document.getElementById('loginButton').addEventListener('click', function(event) {
    event.preventDefault();

    if (validateForm()) {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        const userData = {
            "email": email,
            "name": name,
            "password": password
        };

        fetch(register_API + '/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'login.html?msg=signup_success';
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Registration failed');
                });
            }
        })
        .catch(error => {
            const errorMessage = document.getElementById('error-message');
            errorMessage.innerText = 'Fehler bei der Registrierung: ' + error.message;
            errorMessage.style.display = 'block';
        });
    }
});

/**
 * Toggles the visibility of the password field by changing its type and updating the associated image.
 */
function showPassword() {
    const image = document.getElementById('signup-password-Image');
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput.type === 'password') {
        image.src = './IMGicons/visibility.svg';
        passwordInput.type = 'text';
    } else {
        image.src = './IMGicons/visibility_off.svg';
        passwordInput.type = 'password';
    }
}

/**
 * Toggles the visibility of the confirm password field by changing its type and updating the associated image.
 */
function showConfirmPassword() {
    const image = document.getElementById('confirm-signup-password-Image');
    const confirmPasswordInput = document.getElementById('confirm-signup-password');
    if (confirmPasswordInput.type === 'password') {
        image.src = './IMGicons/visibility.svg';
        confirmPasswordInput.type = 'text';
    } else {
        image.src = './IMGicons/visibility_off.svg';
        confirmPasswordInput.type = 'password';
    }
}

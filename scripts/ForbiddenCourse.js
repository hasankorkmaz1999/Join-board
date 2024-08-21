window.onload = function() {
    try {
        let userID = localStorage.getItem('userId');
        if (userID === null || userID === undefined) {
            window.location.href = './login.html?msg=login_required';
        }
    } catch (error) {
        console.error("Kein Zugriff auf localStorage möglich: ", error);
        window.location.href = './login.html?msg=error_localStorage';
    }
};
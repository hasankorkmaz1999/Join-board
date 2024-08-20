const PB_API = 'https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/users';

/* window.onload = initHeader;

async function initHeader() {
    try {
        const userID1 = sessionStorage.getItem('userId');
        const userId = localStorage.getItem('userId');
        const guestToken = sessionStorage.getItem('guestToken');

        let user = null;

        if (userID1) {
            user = await loadData(`${PB_API}/${userID1}`);
        } else if (userId) {
            user = await loadData(`${PB_API}/${userId}`);
        } else if (guestToken) {
            user = await loadData(`${PB_API}/${guestToken}`);
        }

        if (!user || !user.name) {
            throw new Error("User or user name could not be loaded");
        }

        const initials = getInitials(user.name);
        document.getElementById('PB').innerHTML = initials;

    } catch (error) {
        console.warn("Error initializing the header (Demo Login):", error);
    }
}

function getInitials(fullName) {
    const nameParts = fullName.trim().split(/\s+/); // Teilt den Namen in Teile, basierend auf Leerzeichen
    let initials = '';

    if (nameParts.length > 0) {
        initials += nameParts[0].charAt(0).toUpperCase(); // Erster Buchstabe des ersten Namens
    }
    
    if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase(); // Erster Buchstabe des letzten Namens
    }

    return initials.substring(0, 2); // Stellt sicher, dass nur maximal 2 Buchstaben zurückgegeben werden
} */

function infoTap() {
    let infoDIV = document.getElementById('dropdown-content');
    let checkClass = infoDIV.classList.contains('dropdown-content');
    if (checkClass) {
        infoDIV.classList.remove('dropdown-content');
        infoDIV.classList.add('d-none');
    } else {
        infoDIV.classList.add('dropdown-content');
        infoDIV.classList.remove('d-none');
    }
}

function logout() {
    try {
        localStorage.removeItem('userId');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('guestToken');
        window.location.href = './login.html?msg=logout';
    } catch (error) {
        console.error("Kein Zugriff auf localStorage oder sessionStorage möglich: ", error);
        window.location.href = './login.html?msg=error_localStorage';
    }
};


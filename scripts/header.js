const PB_API = 'https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/users';


async function initHeader(attempt = 1) {
    let check = document.getElementById('PB');
    if (check) {
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
            console.warn(`Error initializing the header (Demo Login):`, error);
            
            if (attempt < 2) {
                console.warn("Fail: Initiation of profile picture in 2 seconds...");
                setTimeout(() => initHeader(attempt + 1), 2000);
            } else {
                console.warn("2nd attempt failed. Abort.");
            }
        }
    } else {
        console.warn(`No header element found, try ${attempt} of 2`);
        
        if (attempt < 2) {
            console.warn("Another attempt to find the header in 2 seconds...");
            setTimeout(() => initHeader(attempt + 1), 2000);
        } else {
            console.warn("2nd attempt failed. Abort.");
        }
    }
}


function getInitials(fullName) {
    const nameParts = fullName.trim().split(/\s+/); 
    let initials = '';

    if (nameParts.length > 0) {
        initials += nameParts[0].charAt(0).toUpperCase(); 
    }
    
    if (nameParts.length > 1) {
        initials += nameParts[nameParts.length - 1].charAt(0).toUpperCase(); 
    }

    return initials.substring(0, 2); 
}


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
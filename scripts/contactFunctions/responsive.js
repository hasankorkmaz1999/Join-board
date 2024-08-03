function mobileButtonChange(viewquery) {
    let divElement = document.getElementById('editContactsMobile')
    if (viewquery === true) {
        if (window.innerWidth <= 550) {
            divElement.classList.remove('d-non');
            divElement.classList.add('edit-contact-mobile');
        }
    }
    if (viewquery === false) {
        if (window.innerWidth <= 550) {
            divElement.classList.add('d-non');
            divElement.classList.remove('edit-contact-mobile');
        }
    }
}

function contactResponsive(id, name, email, phone) {
    if (window.innerWidth <= 850) {

    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';

    let currentHighlightedDiv = document.querySelector('.contact-item.active');
    if (currentHighlightedDiv) {
        currentHighlightedDiv.classList.add('active');
    }
    } else {
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('main-content').style.display = 'block'; 
    }
}

function closeSingleContact() {
    let contactContainer = document.getElementById('contact-container');
    document.getElementById('sidebar').style.display = 'block';
    mobileButtonChange(false);
    contactContainer.classList.add('slide-out-right');
    setTimeout(() => {
        contactContainer.classList.add('d-none');
        contactContainer.classList.remove('show'); // entfernt die Animationsklasse
        contactContainer.classList.remove('slide-in-right');
        contactContainer.classList.remove('slide-out-right');
        contactContainer.innerHTML = ``;
    }, 650); // sicherstellen, dass dies mit der Dauer der Animation übereinstimmt
}

window.addEventListener('resize', function() {
if (window.innerWidth < 850) {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    }
});
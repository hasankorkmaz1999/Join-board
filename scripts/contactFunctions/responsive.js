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

    document.getElementById('sidebar').style.display = 'd-none';
    // document.getElementById('main-content').style.display = 'block';

    let currentHighlightedDiv = document.querySelector('.contact-item.active');
    if (currentHighlightedDiv) {
        currentHighlightedDiv.classList.add('active');
    }
    } else {
        document.getElementById('sidebar').style.display = 'block';
        document.getElementById('main-content').style.display = 'none';
    }
}

function closeSingleContact() {
    let contactContainer = document.getElementById('contact-container')
    document.getElementById('sidebar').style.display = 'block';
    document.getElementById('main-content').style.display = 'd-none';
    document.getElementById('main-content').style.display = 'none';
    mobileButtonChange(false);
    contactContainer.classList.add('slide-out-right');
    contactContainer.classList.add('contact-container');
    setTimeout(() => {
        contactContainer.classList.add('d-non');
        contactContainer.classList.remove('slide-in-right');
        contactContainer.classList.remove('contact-container');
        contactContainer.classList.remove('slide-out-right');
        contactContainer.innerHTML = ``;
    }, 650);
}

window.addEventListener('resize', function() {
if (window.innerWidth < 850) {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('sidebar').style.display = 'block';
    }
});
/* mobileEditorDeleteWindow */
function editContactsMobile() {
    let mobileEditWindow = document.getElementById('mobileEditorDeleteWindow');
    mobileEditWindow.innerHTML = renderResponsiveEditButtons();
    mobileEditWindow.classList.remove('d-non');
    mobileEditWindow.classList.add('slide-in-right');
    setTimeout(() => {
        mobileEditWindow.classList.add('mobileEditorDeleteWindow');
    }, 50);
}

function renderResponsiveEditButtons() {
    let id = document.getElementById('dummyID');
    let fullID = id.innerText;
    return /*html*/`
        <span onclick="editContacts('${fullID}')" class="mobileEditorButtons"><img class="mobileEditorButtons" src="./icons/edit.svg" alt="edit icon"> Edit</span>
        <span onclick="deletContacts('${fullID}')" class="mobileEditorButtons"><img class="mobileEditorButtons" src="./icons/delete.svg" alt="delete icon"> Delete</span>
    `
}

function dummyClose() {
    let mobileEditWindow = document.getElementById('mobileEditorDeleteWindow');
    mobileEditWindow.classList.remove('slide-in-right');
    mobileEditWindow.classList.add('slide-out-right');
    setTimeout(() => {
        mobileEditWindow.classList.add('d-non');
        mobileEditWindow.classList.remove('mobileEditorDeleteWindow');
        mobileEditWindow.classList.remove('slide-out-right');
        mobileEditWindow.innerHTML = ``;
    }, 200);
}

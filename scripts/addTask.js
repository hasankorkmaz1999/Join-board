
/* Auswahlbutton in addTask: Low, Medium, Urgent
*******************************************************/
function setActive(button, priority) {

    let buttons = document.querySelectorAll('.addTaskPrioButton');
    buttons.forEach(btn => {
        btn.classList.remove('active-urgent', 'active-medium', 'active-low');
    });

    button.classList.add(`active-${priority}`);

    let priorityInput = document.getElementById('priority');
    priorityInput.value = priority;
}


function showAddTaskOverlay() {
    let editWindow = document.getElementById('overlayEdit');
    editWindow.classList.remove('d-none');
    editWindow.classList.add('slide-in-right');
}

function closeAddTaskOverlay() {
    let divID = document.getElementById('overlayEdit');
    divID.classList.add('slide-out-right');
    setTimeout(() => {
        let divID = document.getElementById('overlayEdit');
        divID.classList.add('d-none');
        divID.classList.remove('slide-in-right');
        divID.classList.remove('slide-out-right');
    }, 500);
}
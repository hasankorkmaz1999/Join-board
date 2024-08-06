
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

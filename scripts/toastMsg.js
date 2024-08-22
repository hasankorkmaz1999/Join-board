/* 
    <div id="toast-div" class="d-none">
        <div class="toast-text" id="toast-text"></div>
    </div>
*/

/**
 * Displays a toast message with the specified text.
 * @param {string} msg - The message to display in the toast.
 */
function toastMessage(msg) {
    let toastBox = document.getElementById('toast-div');
    let toastMsg = document.getElementById('toast-text');
    toastMsg.innerHTML = `${msg}`;
    toastBox.classList.remove('d-none');
    toastBox.classList.add('slide-in-right');
    toastBox.classList.add('toast');
    setTimeout(() => {
        toastBox.classList.add('slide-out-right');
        toastBox.classList.remove('slide-in-right');
    }, 3000);
    setTimeout(() => {
        toastBox.classList.add('d-none');
        toastBox.classList.remove('slide-out-right');
        toastBox.classList.remove('slide-in-right');
        toastBox.classList.remove('toast');
    }, 3500);
}
/**
 * Reloads the current page after a specified delay.
 * 
 * This function sets a timeout to reload the current page after 3600 milliseconds (3.6 seconds).
 */
function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 3600);
}
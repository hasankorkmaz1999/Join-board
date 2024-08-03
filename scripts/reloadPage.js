/**
 * Reloads the page after a specified timeout.
 * The page reloads after 3600 milliseconds (3.6 seconds).
 */
function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 3600);
}
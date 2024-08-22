/**
 * Redirects the browser to the specified URL after a delay.
 * @param {string} URL - The URL to which the browser will be redirected.
 */
function forward(URL) {
    setTimeout(function() {
      window.location.href = URL;
    }, 3600);
  }
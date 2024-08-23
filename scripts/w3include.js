/**
 * Function to include HTML content from external files into elements with the attribute `w3-include-html`.
 * 
 * This function searches for all elements in the document that have the attribute `w3-include-html`.
 * For each element found, it makes an HTTP GET request to fetch the content of the file specified in the attribute.
 * If the request is successful (status 200), the content of the file is inserted into the element.
 * If the file is not found (status 404), the element's content is set to "Page not found.".
 * After processing, the `w3-include-html` attribute is removed from the element.
 * The function then recursively calls itself to process any newly included content.
 */
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
let API = "https://joinapi-ad635-default-rtdb.europe-west1.firebasedatabase.app/";
let userAPI = "";
let demoAPI = "dummy-user/";
window.onload = init;

function init() {
    renderData(API);
}

async function loadData(URL) {
    try {
        let response = await fetch(URL + ".json");
        let responseToJson = await response.json();
        console.log(responseToJson);
        return responseToJson;
    } catch (error) {
        console.error("Error in loadData function:", error);
        return null;
    }
}

async function renderData (URL) {
    let data = await loadData(URL);
    /* let content = document.getElementById("ID NAME"); */
    /* content.innerHTML = ``; */
    if (data && data.users && data.users.user1ID && data.users.user1ID.contact1ID) {
        for (let i = 0; i < data.demo-userAPI.users.user1ID.contact1ID.length; i++) {
            const element = data.demo-userAPI.users.user1ID.contact1ID[i];
            console.log(element);
        }
    }
}



// w3 include
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
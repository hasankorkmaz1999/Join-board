////////////////////////////////////////////////////////////////////////////////
//  Hier coden wir die Toast msg, ich habe mir überlegt das wir eine function //
//  Machen die so aussieht:                                                   //
//  toastMessage("Hier kommt der text der msg");                              //
//  dabei können wir das js überall nutzen                                    //
////////////////////////////////////////////////////////////////////////////////


function toastMessage(msg) {
    let toastBox = document.getElementById('dummy');
    toastBox.innerHTML = `${msg}`;
    toastBox.classList.remove('d-none');
    toastBox.classList.add('slide-in-right');
    setTimeout(() => {
        toastBox.classList.add('slide-out-right');
    }, 2000);
    setTimeout(() => {
        toastBox.classList.add('d-none');
        toastBox.classList.remove('slide-out-right');
        toastBox.classList.remove('slide-in-right');
    }, 3000);
}
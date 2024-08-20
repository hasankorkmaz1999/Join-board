function infoTap() {
    let infoDIV = document.getElementById('dropdown-content');
    let checkClass = infoDIV.classList.contains('show');
    if (checkClass) {
        infoDIV.classList.remove('d-none');
        infoDIV.classList.add('d-none');
    } else {
        infoDIV.classList.add('dropdown-content');
        infoDIV.classList.remove('d-none');
    }
}
///////////////////////////////////////////////////////
//      DO NOT ADD THIS SCRIPT TO ADDTASK.HTML!     //
/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    let params = getQueryParams();
    if (params.progress !== null) {  // Überprüfen, ob der Parameter existiert
        switch (params.progress) {
            case '0':
                handleProgress0();
                break;
            case '1':
                handleProgress1();
                break;
            case '2':
                handleProgress2();
                break;
            case '3':
                handleProgress3();
                break;
            default:
                alert('Ungültiger Parameter! Bitte einen Wert zwischen 0 und 3 verwenden.');
        }
    } else {
        alert('Kein Parameter angegeben.');
    }
});

function getQueryParams() {
    let params = new URLSearchParams(window.location.search);
    return {
        progress: params.get('progress')
    };
}

function handleProgress0() {
    alert('Der aktive Parameter ist: 0');
    // Weitere Logik für Progress 0
}

function handleProgress1() {
    alert('Der aktive Parameter ist: 1');
    // Weitere Logik für Progress 1
}

function handleProgress2() {
    alert('Der aktive Parameter ist: 2');
    // Weitere Logik für Progress 2
}

function handleProgress3() {
    alert('Der aktive Parameter ist: 3');
    // Weitere Logik für Progress 3
}

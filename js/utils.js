'use strict'

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timer() {
    gGame.secsPassed++
        var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time: ' + gGame.secsPassed
}

window.addEventListener('contextmenu', function(e) { // Disable Right-Click
    e.preventDefault();
})
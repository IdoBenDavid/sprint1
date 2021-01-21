'use strict'
console.log('testing');

const startEmoji = '😃'
const winEmoji = '😎'
const gameOverEmoji = '🤯'
const mineEmoji = '💣'
const markedEmoji = '🚩'
var boardValues = []
var gGameInterval;
var gClicksCounter = 1

var gBoard = {
    minesAroundCount: 4,
    isShown: false,
    isMine: false,
    isMarked: true
}
var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gLevels = {
    'begginer': { SIZE: 4, MINES: 2 },
    'pro': { SIZE: 8, MINES: 12 },
    'master': { SIZE: 12, MINES: 30 }
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gBoard = buildBoard(gLevel);
    boardValues = buildBoard(gLevel)
    renderBoard(gBoard)
    clearInterval(gGameInterval)
}

function buildBoard(gLevel) {
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            // console.log(board);
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    var rendonMinds = placeRandomMines(gBoard, gLevel)
    for (var i = 0; i < rendonMinds.length; i++) {
        var num1 = rendonMinds[i][0]
        var num2 = rendonMinds[i][1]
        board[num1][num2] = {
            minesAroundCount: 0,
            isShown: true,
            isMine: true,
            isMarked: false
        }
    }
    return board
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var CurrCell = board[i][j]
                // if(currCell.isShown=== true)
            CurrCell.minesAroundCount = checkHowManyNegs(board, i, j)
        }
    }
    return board
}

function checkHowManyNegs(board, iIdx, jIdx) {
    var countNegs = 0
    for (var i = iIdx - 1; i <= iIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = jIdx - 1; j <= jIdx + 1; j++) {
            var currCell = board[i][j]
            if (j < 0 || j > board.length - 1) continue
            if (i === iIdx && j === jIdx) continue
            if (currCell.isMine === true) {
                countNegs++
            }
        }
        // console.log('currcell :', countNegs);
    }
    return countNegs
}

function renderBoard(board) {
    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            boardValues[i][j] = cellValue(currCell)
            var cellId = `cell-${i}-${j}`
            strHTML += `<td oncontextmenu="cellMarked(${i},${j})" id="${cellId}" class="cells-before-click ${i}-${j}" onclick="cellClicked(this,${i}, ${j})"></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table> '
    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML
}

function cellClicked(elCell, i, j) {
    var cellNum = document.getElementById(`cell-${i}-${j}`)
    console.log(elCell);
    cellNum.innerHTML = boardValues[i][j]
    gBoard[i][j].isShown = true
    elCell.classList.remove('cells-before-click')
    elCell.classList.add('cell-after-click')
    var elCounter = document.querySelector('.counter')
    gGameInterval = setInterval(timer, 1000)
    elCounter.innerText = 'Clicks Counter: ' + gClicksCounter++
        // at the moment it's starting after first click but incrrese pace after each click!
        var gameOver = checkGameOver(elCell, i, j)
    gameOver
}

window.addEventListener('contextmenu', function(e) { // Disable Right-Click
    e.preventDefault();
})

function cellMarked(i, j) {
    var elCellMarked = document.getElementById(`cell-${i}-${j}`)

    if (!elCellMarked.innerHTML) {
        elCellMarked.innerHTML = markedEmoji
    } else if (elCellMarked.innerHTML === markedEmoji) {
        elCellMarked.innerHTML = null
    }
}

function checkGameOver(elCell) {
    if (elCell === boardValues.isMine === true) console.log('yes!!');
    // clearInterval(gGameInterval)
    // if(gBoard.isMine === true) gameover

}

function expandShown(board, elCell, i, j) {

}

function pickLevel(gLevel) {
    gLevel.SIZE = board
    var elEasy = document.querySelector('.easy')
    var elMedium = document.querySelector('.medium')
    var elExpert = document.querySelector('.expert')
    if (gLevel.SIZE === 4) {
        gLevel = {
            SIZE: 4,
            MINES: 2
        }
    } else if (gLevel.SIZE === 8) {
        gLevel = {
            SIZE: 8,
            MINES: 12
        }
    } else if (gLevel.SIZE === 12) {
        gLevel = {
            SIZE: 12,
            MINES: 30
        }
    }
}

function cellValue(currCell) {
    if (currCell.isShown === true && currCell.isMine === true) {
        return mineEmoji
    }
    setMinesNegsCount(gBoard)
    if (currCell.minesAroundCount === 0) {
        return 0
    } else if (currCell.minesAroundCount > 0) {
        return currCell.minesAroundCount
    }
    // else if (currCell.isMine === true){
    //     checkGameOver()
    // }
}

function timer() {
    gGame.secsPassed++
        var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time: ' + gGame.secsPassed
}

function placeRandomMines(gBoard, gLevel) {
    var randomPositionMine = [];
    while (randomPositionMine.length !== gLevel.MINES) {
        var iIdx = getRndInteger(0, gLevel.SIZE - 1);
        var jIdx = getRndInteger(0, gLevel.SIZE - 1);
        randomPositionMine.push([iIdx, jIdx]);
    }
    console.log(randomPositionMine);
    return (randomPositionMine)
}
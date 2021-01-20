'use strict'
console.log('testing');


const startEmoji = '😃'
const winEmoji = '😎'
const gameOverEmoji = '🤯'
const mineEmoji = '💣'
const hiddenEmoji = '🔳'

var gBoard = { // the Model
    minesAroundCount: 4,
    isShown: true,
    isMine: false,
    isMarked: true
}
var gLevel = { // the difficulty of the level
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard)
}

function buildBoard(gLevel) {
    // var SIZE = 4  need to update to level picked function later
    var board = []
    for (var i = 0; i < 4; i++) { // NEED TO CHECK WHY NOT WORKIGN WITH gLevel.SIZE
        board.push([])
        for (var j = 0; j < 4; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }
    board[2][2] = {
        minesAroundCount: 0,
        isShown: true,
        isMine: true,
        isMarked: false
    }
    board[1][1] = {
        minesAroundCount: 0,
        isShown: true,
        isMine: true,
        isMarked: false
    }
    if (i === 2 && j === 2 || i === 1 && j === 2) {
        board[i][j] = mineEmoji
    }
    // console.log(board);
    return board
}
// var res = setMinesNegsCount(gBoard)
// console.log(res);
var res = checkHowManyNegs(buildBoard(), 2, 1)
console.log(res);

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

function checkHowManyNegs(board, iIdx, jIdx) { // how many negbs each cell have
    var countNegs = 0
    for (var i = iIdx - 1; i <= iIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue // if not passing- skip
        for (var j = jIdx - 1; j <= jIdx + 1; j++) {
            var currCell = board[i][j]
            if (j < 0 || j > board.length - 1) continue
            if (i === i && j === j) continue
            if (currCell.isMine === true) {
                countNegs++
            }
        }
    }
    return countNegs
}



function renderBoard(board) {
    var strHTML = '<table border="1"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]
            var checkCellValue = cellValue(currCell)
            var cellId = `cell-${i}-${j}`
            strHTML += `<td id="${cellId}" onclick="cellClicked(this)">${cellId} ${checkCellValue}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
        // console.log(strHTML);
    var elBoard = document.querySelector('.board-container')
    elBoard.innerHTML = strHTML

}

function cellClicked(elCell, i, j) {
    // need to take care after added to renderboard!!! 
}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}

function pickLevel(size) {

}

function cellValue(currCell) {
    if (currCell.isShown === true && currCell.isMine === true) return mineEmoji
        // maybe to use it again later and add more senarios


}
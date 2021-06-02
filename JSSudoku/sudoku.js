// Author: Chaz Peterson
// Alias: CheTranqui

function $(id) { return document.getElementById(id); }

window.onload = init();

function init() {
    activateDarkMode();
    loadNumbers();
}

function loadNumbers() {
    // for each row
    for (i = 1; i < 10; i++) {
        // for each cell (i.e. column) in row
        for (j = 1; j < 10; j++) {
            myCellId = getIdOfSudokuCell(i, j);
            $(myCellId).innerHTML = (Math.floor(Math.random() * 9)) + 1;
        }
    }
}

function getIdOfSudokuCell(row, column) {
    return "r" + (row) + "c" + (column);
}
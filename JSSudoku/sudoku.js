// Author: Chaz Peterson
// Alias: CheTranqui

function $(id) { return document.getElementById(id); }

const board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

window.onload = init();

function init() {
    activateDarkMode();
    //do
    //{
    clearBoard();
    generateBoard();
    //}while (!validBoard());
    loadValuesIntoCells();
}

function clearBoard() {
    clearThreeRows(0);
    clearThreeRows(3);
    clearThreeRows(6);
}

function clearThreeRows(offset) {
    for (let i = (0 + offset); i < (3 + offset); i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = 0;
        }
    }
}

function generateBoard() {
    console.log("Entering generateBoard()")
    getThreeRows(0);
    getThreeRows(3);
    getThreeRows(6)
}

function getThreeRows(offset) {
    console.log("Entering getThreeRows()")
    for (let i = (0 + offset); i < (3 + offset); i++) { // for each row
        for (let j = 0; j < 9; j++) { // for each cell (i.e. column) in row
            console.log("i + offset = " + (i + offset) + "  /  J = " + j);
            determineCellValue(i, j); // i = row, j = column
        }
    }
}

function loadValuesIntoCells(){
    for (let i = 0; i < 9; i++) {
        // for each cell (i.e. column) in row
        for (let j = 0; j < 9; j++) {
            let myCellValue = board[i][j];
            let myCellId = getIdOfSudokuCell(i, j);
            $(myCellId).innerHTML = myCellValue;
            console.log("Cell " + myCellId + " : " + myCellValue);
        }
    }
}

function getIdOfSudokuCell(row, column) {
    return "r" + (row) + "c" + (column);
}

function determineCellValue(row, column) {
    let rowArray = board[row];
    let columnArray = getColumnArray(column);
    let squareArray = getSquareArray(row, column);
    console.log("rowArray:  " + rowArray.join(",") +
        "  /  columnArray:  " + columnArray.join(","));
    const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let possibleNumbers = [];
    numList.forEach(function (num) {
        if (!rowArray.includes(num)
            && !columnArray.includes(num)
            && !squareArray.includes(num)) {
            possibleNumbers.push(num);

        }
    });
    console.log("possibleNumbers: " + possibleNumbers.join(","));
    if (possibleNumbers.length > 0) {
        newNumberIndex = Math.floor(Math.random() * possibleNumbers.length);
        newNumber = possibleNumbers[newNumberIndex];
        console.log("Row " + row + " / Column " + column + " :  newNumber = " + newNumber);
        board[row][column] = newNumber;
    }
}

function getColumnArray(column) {
    let arr = [];
    for (let k = 0; k < 9; k++) {
        arr[k] = board[k][column];
    }
    return arr;
}

function getSquareArray(row, column) {
    let square = [0,0,0,0,0,0,0,0,0];
    let startRow = getStarting(row);
    let startColumn = getStarting(column);
    square[0] = board[startRow][startColumn];
    square[1] = board[startRow][startColumn+1];
    square[2] = board[startRow][startColumn+2];
    square[3] = board[startRow+1][startColumn];
    square[4] = board[startRow+1][startColumn + 1];
    square[5] = board[startRow+1][startColumn + 2];
    square[6] = board[startRow+2][startColumn];
    square[7] = board[startRow+2][startColumn + 1];
    square[8] = board[startRow + 2][startColumn + 2];
    return square;
}

function getStarting(rowOrColumn) {
    switch (rowOrColumn) {
        case 0:
        case 1:
        case 2:
            return 0;
        case 3:
        case 4:
        case 5:
            return 3;
        case 6:
        case 7:
        case 8:
            return 6;
    }
}

function validBoard() {
    let validRows = checkRows();
    let validColumns = checkColumns();

    return (validRows && validColumns);
}

function checkRows() {
    return true;
}

function checkColumns() {
    return true;
}
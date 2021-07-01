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
const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let filled = [];

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
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = 0;
        }
    }
    filled = [];
}

function generateBoard() {
    // setting up the first square - this is our baseline for the puzzle.
    let squareOne = determineFirstSquare();
    assignBoardValues(squareOne, 1);
    console.log(squareOne);
    // need to follow up first square with squares 2 and 4
    let squareTwo = determineSecondSquare(squareOne);
    assignBoardValues(squareTwo, 2);
    let squareThree = determineThirdSquare();
    assignBoardValues(squareThree, 3);
    // then squares 3 and 7... this will finish the top row and left column of squares.

    // then follow up with square 5
    
    // then squares 6, 8, and 9
    
    loadValuesIntoCells();
}

// squareValues must be an array of 9 numbers, squareNumber must be a number 1-9.
// squareNumbers go 1, 2, 3 top row, 4, 5, 6 middle, 7, 8, 9 bottom.
function assignBoardValues(squareValues, squareNumber){
    let row = 0;
    let column = 0;
    switch (squareNumber){
        case 1:
        case 2:
        case 3:
            row = 0;
            break;
        case 4:
        case 5:
        case 6:
            row = 3;
            break;
        case 7:
        case 8:
        case 9:
            row = 6;
            break;
    }
    switch (squareNumber){
        case 1:
        case 4:
        case 7:
            column = 0;
            break;
        case 2:
        case 5:
        case 8:
            column = 3;
            break;
        case 3:
        case 6:
        case 9:
            column = 6;
            break;
    }
    console.log("Row " + row + "  |  Column: " + column);
    board[row][column] = squareValues[0];
    board[row][column+1] = squareValues[1];
    board[row][column+2] = squareValues[2];
    board[row+1][column] = squareValues[3];
    board[row+1][column+1] = squareValues[4];
    board[row+1][column+2] = squareValues[5];
    board[row+2][column] = squareValues[6];
    board[row+2][column+1] = squareValues[7];
    board[row+2][column+2] = squareValues[8];
}

function determineFirstSquare() {
    let possibilities = [...numList];
    let squareOne = [];
    for (let i = 8; i >= 0; i--) {
        // splice random index out of possibilities, push it into squareOne.
        let randomIndex = getRandom(possibilities.length);
        squareOne.push(possibilities[randomIndex]);
        possibilities.splice(randomIndex, 1);
    }
    // put each number into place on the board.
    return squareOne;
}

function determineSecondSquare(squareOne){
    // s2 middle row = get 1 or 2 from s1 top:
    // SQUARE STATUS:  empty
    const totalTopNumbersForS2Middle = getRandom(4); //getRandom is based on getting an index from a length - 4 can never occur, 3 is max here
    // s1Top only contains values that need placed in s2Middle or s2Bottom
    let s1Top = [squareOne[0], squareOne[1], squareOne[2]];
    let s2Middle = [0,0,0];
    // whatever value is left in s2Possibilities is an unfilled index in s2Middle
    let s2MiddlePossibilities = [0,1,2]
    for (i = 0; i < totalTopNumbersForS2Middle; i++){
        let randomPossibilitiesIndex = getRandom(s2MiddlePossibilities.length); // get random index of options
        let randomS1TopIndex = getRandom(s1Top.length-1); // get random index from top
        // set appropriate s2Middle value to s1value
        s2Middle[s2MiddlePossibilities[randomPossibilitiesIndex]] = s1Top[randomS1TopIndex];
        // splice index out of possibile s2Middle indexes and out of s1Top numbers
        s2MiddlePossibilities.splice(randomPossibilitiesIndex,1);
        s1Top.splice(randomS1TopIndex, 1)
    }
    // SQUARE STATUS:  top empty, middle partial, bottom empty

    let s2Bottom = [0,0,0];
    let s2BottomPossibilities = [0,1,2];
    const s1TopLength = s1Top.length;
    for (i = 0; i < s1TopLength; i++){
        // toss remaining top numbers into random bottom index
        let randomS1TopIndex = getRandom(s1Top.length);
        let randomPossibilitiesIndex = getRandom(s2BottomPossibilities.length);
        s2Bottom[s2BottomPossibilities[randomPossibilitiesIndex]] = s1Top[randomS1TopIndex];
        s2BottomPossibilities.splice(randomPossibilitiesIndex, 1);
        s1Top.splice(randomS1TopIndex, 1);
    }

    // SQUARE STATUS:  top empty, middle partial, bottom partial

    // fill remaining spaces in Middle with random indexes from s1 bottom
    let s1Bottom = [squareOne[6], squareOne[7], squareOne[8]]
    const s2MiddleLength = s2MiddlePossibilities.length;
    for (i = 0; i < s2MiddleLength; i++){
        let randomS1BottomIndex = getRandom(s1Bottom.length);
        let randomPossibilitiesIndex = getRandom(s2MiddlePossibilities.length);
        s2Middle[s2MiddlePossibilities[randomPossibilitiesIndex]] = s1Bottom[randomS1BottomIndex];
        s2MiddlePossibilities.splice(randomPossibilitiesIndex, 1);
        s1Bottom.splice(randomS1BottomIndex, 1);
    }

    // SQUARE STATUS:  top empty, middle full, bottom partial

    // any remaining s1Bottom must go into s2Top.
    let s2Top = [0,0,0];
    let s2TopPossibilities = [0,1,2];
    const s1BottomLength = s1Bottom.length;
    for (i = 0; i < s1BottomLength; i++){
        randomS1BottomIndex = getRandom(s1Bottom.length);
        randomPossibilitiesIndex = getRandom(s2TopPossibilities.length);
        s2Top[s2TopPossibilities[randomPossibilitiesIndex]] = s1Bottom[randomS1BottomIndex];
        s2TopPossibilities.splice(randomPossibilitiesIndex, 1);
        s1Bottom.splice(randomS1BottomIndex, 1);
    }

    // SQUARE STATUS:  top partial, middle full, bottom partial

    // fill in remaining s2Top from s1Middle
    let s1Middle = [squareOne[3], squareOne[4], squareOne[5]];
    const s2TopLength = s2TopPossibilities.length;
    for (i = 0; i < s2TopLength; i++){
        let randomS1MiddleIndex = getRandom(s1Middle.length);
        let randomPossibilitiesIndex = getRandom(s2TopPossibilities.length);
        s2Top[s2TopPossibilities[randomPossibilitiesIndex]] = s1Middle[randomS1MiddleIndex];
        s2TopPossibilities.splice(randomPossibilitiesIndex, 1);
        s1Middle.splice(randomS1MiddleIndex, 1);
    }

    // SQUARE STATUS:  top full, middle full, bottom partial

    // fill in remaining s2Bottom from s1Middle
    const s2BottomLength = s2BottomPossibilities.length;
    for (i = 0; i < s2BottomLength; i++){
        let randomS1MiddleIndex = getRandom(s1Middle.length);
        let randomPossibilitiesIndex = getRandom(s2BottomPossibilities.length);
        s2Bottom[s2BottomPossibilities[randomPossibilitiesIndex]] = s1Middle[randomS1MiddleIndex];
        s2BottomPossibilities.splice(randomPossibilitiesIndex, 1);
        s1Middle.splice(randomS1MiddleIndex, 1);
    }

    // SQUARE STATUS:  top full, middle full, bottom full

    return [s2Top[0], s2Top[1], s2Top[2],
            s2Middle[0], s2Middle[1], s2Middle[2],
            s2Bottom[0], s2Bottom[1], s2Bottom[2]];
}

function determineThirdSquare(){
    let ending1 = determineRowEnding(0);
    let ending2 = determineRowEnding(1);
    let ending3 = determineRowEnding(2);
    return [ending1[0], ending1[1], ending1[2],
            ending2[0], ending2[1], ending2[2],
            ending3[0], ending3[1], ending3[2],]
}

function determineRowEnding(row){
    let possibilities = [...numList];
    for (i = possibilities.length-1; i >= 0; i--){
        console.log(board[row].includes(possibilities[i]));
        if (board[row].includes(possibilities[i])){
            possibilities.splice(i,1);
        }
    }
    let ending = [];
    for (i = 3; i > 0; i--){
        randomIndex = getRandom(i);
        ending.push(possibilities[randomIndex]);
        possibilities.splice(randomIndex, 1);
    }
    return ending;
}


function setCellValue(num, row, column) {
    console.log("Number:  " + num + " Going into C" + column + " / R"+ row);
    board[row][column] = num;
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

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function getRandomArrayIndex(possibleResults) {
    let randomIndex = Math.floor(Math.random() * possibleResults.length);
    return possibleResults[randomIndex];
}
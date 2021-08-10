// Author: Chaz Peterson
// Alias: CheTranqui

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

let goodBoards = 0;
let badBoards = 0;
let goodBoardPercentage = 0;
let won = false;

window.onload = init();
function init() {
    activateDarkMode();
    initializeFeatures();
    loadNewSudoku();
}

function loadNewSudoku(){
    hideGameMenu();
    setTimeout(showGameMenu,500);
    setTimeout(resetPuzzleHighlighting,550);
    setTimeout(continueLoading,850);
}

function continueLoading(){
    setWon(false);
    getNewBoard();
    adjustBoardToDifficulty();
    resetPuzzleTimer();
    loadValuesIntoCells();
}

function getNewBoard(){
    let validBoard = false;
    do {
        clearBoard(0);
        setDifficulty();
        setHintLevel();
        generateBoard();
        validBoard = getStatistics();
    } while (!validBoard);
}

function clearBoard(value) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = value;
        }
    }
}

function generateBoard() {
    // setting up the first square - this is our baseline for the puzzle.
    let squareOne = determineSquareOne();
    assignBoardValues(squareOne, 1);
    // need to follow up first square with squares 2 and 3
    let squareTwo = determineSquare(2);
    assignBoardValues(squareTwo, 2);
    let squareThree = determineSquare(3);
    assignBoardValues(squareThree, 3);
    // then squares 4 and 7... this will finish the top row and left column of squares.
    let squareFour = determineSquare(4);
    assignBoardValues(squareFour, 4);
    let squareSeven = determineSquare(7);
    assignBoardValues(squareSeven, 7);
    // squares 5, 6, 8, and 9 are all highly complex, requiring horizontal and vertical matching
    
    let squareFive = determineSquare(5);
    assignBoardValues(squareFive, 5);

    let squareSix = determineSquare(6);
    assignBoardValues(squareSix, 6);

    let squareEight = determineSquare(8);
    assignBoardValues(squareEight, 8);

    let squareNine = determineSquare(9);
    assignBoardValues(squareNine, 9);
}

// squareValues must be an array of 9 numbers, squareNumber must be a number 1-9.
// squareNumbers go 1, 2, 3 top row, 4, 5, 6 middle, 7, 8, 9 bottom.
// the switches determine the 1st cell of the square and assigns
// square values into the board
function assignBoardValues(squareValues, squareNumber){
    let startingPosition = getSquareStartingPosition(squareNumber);
    let row = startingPosition[0];
    let column = startingPosition[1];
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

function getSquareStartingPosition(squareNumber){
    let row = 0;
    let column = 0;
    switch (squareNumber){
    // first three squares start at row 0
        case 1:
        case 2:
        case 3:
            row = 0;
            break;
    // middle three squares start at row 3
        case 4:
        case 5:
        case 6:
            row = 3;
            break;
    // bottom three squares start at row 6
        case 7:
        case 8:
        case 9:
            row = 6;
            break;
    }
    switch (squareNumber){
    // first column of squares is 1,4,7, they start at column 0
        case 1:
        case 4:
        case 7:
            column = 0;
            break;
    // middle three start at column 3
        case 2:
        case 5:
        case 8:
            column = 3;
            break;
    // final three on the right start at column 6
        case 3:
        case 6:
        case 9:
            column = 6;
            break;
    }
    return [row, column];
}

function determineSquareOne() {
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

function randomlyAssignPossibleValues(loopConstraint, source, destination, possibilities){
    // loop constraint = how many spaces need filled - determined by either:
    // available numbers in source or available space in destination
    // source = originating array of up to 3 numbers
    // destination = array that numbers are being assigned into
    // possibilities = array listing unassigned indexes in destination that still may be filled
    for (i = 0; i < loopConstraint; i++){
        let possibilitiesIndex = getRandom(possibilities.length);
        let sourceIndex = getRandom(source.length);
        // set appropriate destination index equal to source index
        destination[possibilities[possibilitiesIndex]] = source[sourceIndex];
        // splice index out of possibilities and from source to keep them from getting reused
        console.log("Setting destionation: " + destination[possibilities[possibilitiesIndex]] + " = " + source[sourceIndex]);
        possibilities.splice(possibilitiesIndex,1);
        console.log(possibilities);
        source.splice(sourceIndex, 1);
        console.log(source);
    }
    return [source, destination, possibilities];
}

function determineSquare(squareNumber){
    let startingPosition = getSquareStartingPosition(squareNumber)
    let startingRow = startingPosition[0];
    let startingColumn = startingPosition[1];
    //go through same process as we did for squareTwo, but using squareTwo columns as constraints
    // to filter what can be placed where (make sure smallest set of options is assigned first)
    let squareOptions = getSquareOptions(startingRow, startingColumn);
    let square = assignValuesFromOptions(squareOptions);

    return square;
}


// each square input will be used as:
// sq1 and sq2 are used as horizontal row values to avoid (0,1,2)
// sq3 and sq4 are used as vertical column values to avoid (0,1,2)
function getSquareOptions(startingRow, startingColumn){
    let options = [[],[],[],[],[],[],[],[],[]];
    
    for (let i = 0; i < 3; i++){
        let row = (board[startingRow + i]);
        for (let j = 0; j < 3; j++){
            let column = getColumnArray(startingColumn + j);
            options[(i*3) + j] = determineCellOptions(column, row);
        }
    }
    return options;
}

function assignValuesFromOptions(squareOptions){
    let square = zeroOutArray();
    for (let i = 0; i < 9; i++){
        // determine which cell has the fewest options available
        let smallestCell = getSmallestCellFromSquareOptions(squareOptions);
        // determine which number in that cell has the fewest placement options
        let numberToAssign = getNumberWithFewestOptions(squareOptions[smallestCell], squareOptions);
        // assign that number
        square[smallestCell] = numberToAssign;
        // remove that number from all other cell options
        squareOptions = removeNumberFromOtherOptions(numberToAssign, squareOptions);
        // remove that array-index from options
        squareOptions[smallestCell] = [];
    }
    return square;
}

function getSmallestCellFromSquareOptions(squareOptions){
    // find which cell has the fewest options available - return that index
    let smallestIndex = 0;
    let smallestLength = 10;
    for (let j = 0; j < squareOptions.length; j++){
        if (squareOptions[j].length < smallestLength && squareOptions[j].length > 0){
            smallestIndex = j;
            smallestLength = squareOptions[j].length;
        }
    }
    return smallestIndex;
}

function getNumberWithFewestOptions(arrayOfCellOptions, squareOptions){
    // count up how indexes include each number
    let results = [0,0,0,0,0,0,0,0,0,0];
    for (let j = 0; j < arrayOfCellOptions.length; j++){
        for (let k = 0; k < 9; k++){
            if (squareOptions[k].includes(arrayOfCellOptions[j])){
                results[j]++;
            }
        }
    }
    // check those results and find out which number has the fewest options for placement
    let smallestIndex = 0;
    let smallestTotal = 10;
    for (let j = 0; j < results.length; j++){
        if (results[j] < smallestTotal && results[j] > 0){
            smallestIndex = j;
            smallestTotal = results[j];
        }
    }
    // using that smallestTotal, get all options that have the same number of options
    let smallestOptions = [];
    for (let j = 0; j < results.length; j++){
        if (results[j] == smallestTotal){
            smallestOptions.push(j);
        }
    }
    // return one of those indexes at random
    return arrayOfCellOptions[smallestOptions[getRandom(smallestOptions.length)]];
}

function determineCellOptions(columnArray, rowArray){
    let available = [...numList];
    // remove any numbers that are already placed in the relevant column or row
    for (let k = 8; k >= 0; k--){
        if (columnArray.includes(available[k])){
            available.splice(k,1)
        }
        else if (rowArray.includes(available[k])) {    
            available.splice(k,1)
        }
    }
    // return an array of numbers that are available for placement
    return available;
}

function removeNumberFromOtherOptions(numberToRemove, cellOptions){
    // iterate through cellOptions and remove this number from all arrays
    for (let j = cellOptions.length-1; j >= 0; j--){
        for (let k = cellOptions[j].length-1; k >= 0; k--){
            if (cellOptions[j][k] == numberToRemove){
                cellOptions[j].splice(k,1);
            }
        }
    }
    // return the modified cellOptions
    return cellOptions;
}

function getColumnArray(col){
    arr = [];
    for (let i = 0; i < 9; i++){
        arr.push(board[i][col]);
    }
    return arr;
}


function getStatistics(){
    let goodBoard = true;
    for (let i = 0; i < 9; i++){
        if (board[i].includes(0) || board[i].includes(null)){
            goodBoard = false;
            break;
        }
    }
    if (goodBoard){
        goodBoards++
    }
    else{
        badBoards++
    }
    goodBoardPercentage = goodBoards / (goodBoards + badBoards);
    return goodBoard;
}


function zeroOutArray(){
    // returns an array of 9 zeroes
    let arr = [0,0,0,0,0,0,0,0,0];
    return arr;
}

// determines the HTML table cell for this particular number
function setCellValue(num, row, column) {
    // console.log("Number:  " + num + " Going into C" + column + " / R"+ row);
    board[row][column] = num;
}

function loadValuesIntoCells(){
    for (let i = 0; i < 9; i++) {
        // for each column
        for (let j = 0; j < 9; j++) {
            // set value of cell (i.e. row within column)
            // values are loaded into the board as the square is determined
            let myCellValue = board[i][j];
            let myCellId = getIdOfSudokuCell(i, j);
            $(myCellId).textContent = myCellValue;
            // console.log("Cell " + myCellId + " : " + myCellValue);
        }
    }
}

function getIdOfSudokuCell(row, column) {
    return "r" + (row) + "c" + (column);
}

// getRandom is built to manage indexes (it's max-exclusive)
function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function highlightValues(){
    if ($("r0c0").style.backgroundColor == "var(--color-primaryBackground)"){
        activateHighlight();
    }
    else{
        removeHighlight();
    }
}

function removeHighlight(){
    // resets highlights to default colors
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let myCellId = getIdOfSudokuCell(i, j);
            $(myCellId).style.backgroundColor = "var(--color-primaryBackground)";
            $(myCellId).style.color = "var(--color-primaryText)";
        }
    }
}

function activateHighlight(){
    // obnoxious highlighting that was used for development purposes only
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let myCellId = getIdOfSudokuCell(i, j);
            let newColor = "black";
            switch ($(myCellId).textContent){
                case "1": break;
                case "2": newColor = "royalblue"; break;
                case "3": newColor = "gray"; break;
                case "4": newColor = "teal"; break;
                case "5": newColor = "purple"; break;
                case "6": newColor = "darkorange"; break;
                case "7": newColor = "tan"; break;
                case "8": newColor = "lightgreen"; break;
                case "9": newColor = "darkgreen"; break;
                default: newColor = "";
            }
            $(myCellId).style.backgroundColor = newColor;
        }
    }
}

// either true or false
function setWon(boardComplete){
    won = boardComplete;
}

function getWon(){
    return won;
}
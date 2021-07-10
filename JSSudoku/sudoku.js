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

let goodBoards = 0;
let badBoards = 0;
let boardPercentage = 0;

window.onload = init();
function init() {
    activateDarkMode();
    loadNewSudoku();
}

function loadNewSudoku(){
    getNewBoard();
}

function clearBoard() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = 0;
        }
    }
}

function getNewBoard(){
    let validBoard = false;
    do {
        clearBoard();
        generateBoard();
        validBoard = getStatistics();
    } while (!validBoard);

    loadValuesIntoCells();
    activateHighlight();
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
        possibilities.splice(possibilitiesIndex,1);
        source.splice(sourceIndex, 1);
    }
    return [source, destination, possibilities];
}

// function determineSquareTwo(squareOne){
//     // s2 middle row = get 1 or 2 from s1 top:
//     // SQUARE STATUS:  empty
//     //get returns a number from 0-3 (this is how many from s1Top will be put in s2Middle)
//     const totalTopNumbersForS2Middle = getRandom(4);
//     // s1Top only contains values that need placed in s2Middle or s2Bottom
//     let s1Top = [squareOne[0], squareOne[1], squareOne[2]];      // the two arrays indicate a new, empty destination and all possibilities
//     let results = randomlyAssignPossibleValues(totalTopNumbersForS2Middle, s1Top, [0,0,0], [0,1,2]);
//     s1Top = results[0];
//     let s2Middle = results[1];
//     let s2MiddlePossibilities = results[2];
//     // whatever values are left in s2Possibilities is an unfilled index in s2Middle
    
//     // SQUARE STATUS:  top empty, middle partial, bottom empty

//     // assign remaining values in s1Top to s2Bottom      the two arrays indicate a new, empty destination and all possibilities
//     results = randomlyAssignPossibleValues(s1Top.length, s1Top, [0,0,0], [0,1,2]);
//     s1Top = results[0]; // should be empty array
//     let s2Bottom = results[1];
//     let s2BottomPossibilities = results[2];
//     // s1Top is empty

//     // SQUARE STATUS:  top empty, middle partial, bottom partial

//     // fill remaining spaces in Middle with s1 bottom
//     let s1Bottom = [squareOne[6], squareOne[7], squareOne[8]];
//     results = randomlyAssignPossibleValues(s2MiddlePossibilities.length, s1Bottom, s2Middle, s2MiddlePossibilities);
//     s1Bottom = results[0];
//     s2Middle = results[1]; // should be full (array length 3)
//     s2MiddlePossibilities = results[2];  // should be an empty array now

//     // SQUARE STATUS:  top empty, middle full, bottom partial

//     // any remaining s1Bottom must go into s2Top.      the two arrays indicate a new, empty destination and all possibilities
//     results = randomlyAssignPossibleValues(s1Bottom.length, s1Bottom, [0,0,0], [0,1,2]);
//     s1Bottom = results[0]; // should be empty
//     let s2Top = results[1];
//     let s2TopPossibilities = results[2];

//     // SQUARE STATUS:  top partial, middle full, bottom partial

//     // fill in remaining s2Top from s1Middle
//     let s1Middle = [squareOne[3], squareOne[4], squareOne[5]];
//     results = randomlyAssignPossibleValues(s2TopPossibilities.length, s1Middle, s2Top, s2TopPossibilities);
//     s1Middle = results[0];
//     s2Top = results[1]; // should be full (array length 3)
//     s2TopPossibilities = results[2]; // should be empty

//     // SQUARE STATUS:  top full, middle full, bottom partial

//     // fill in remaining s2Bottom from s1Middle
//     results = randomlyAssignPossibleValues(s2BottomPossibilities.length, s1Middle, s2Bottom, s2BottomPossibilities);
//     s1Middle = results[0]; // should be empty
//     s2Bottom = results[1]; // should be full
//     s2BottomPossibilities = results[2]; // should be empty

//     // squareTwo results:
//     return [s2Top[0], s2Top[1], s2Top[2],
//             s2Middle[0], s2Middle[1], s2Middle[2],
//             s2Bottom[0], s2Bottom[1], s2Bottom[2]];
// }

// since only the row matters at this point, we simply figure out
// what three numbers are required to finish the row and assign them
function determineSquareByRowEnding(squareNumber){
    let startingPosition = getSquareStartingPosition(squareNumber)
    let startingRow = startingPosition[0];
    let startingColumn = startingPosition[1];
    let ending1 = determineRowEnding(startingRow, startingColumn);
    let ending2 = determineRowEnding(startingRow + 1, startingColumn);
    let ending3 = determineRowEnding(startingRow + 2, startingColumn);
    // return array as third square
    return [ending1[0], ending1[1], ending1[2],
            ending2[0], ending2[1], ending2[2],
            ending3[0], ending3[1], ending3[2],];
}

// removes numbers already present in the row from possibilities
// assigns the remaining possibilities randomly to the ending
function determineRowEnding(rowNumber, startingColumn){
    let possibilities = [...numList];
    let row = [...board[rowNumber]];
    for (i = 8; i >= 0; i--){
        if (row.includes(possibilities[i])){
            possibilities.splice(i,1);
        }
    }
    let ending = [];
    for (i = 3; i > 0; i--){
        randomIndex = getRandom(possibilities.length);
        ending.push(possibilities[randomIndex]);
        possibilities.splice(randomIndex, 1);
    }
    return ending;
}

// same as determineThirdSquare, but returning columns rather than rows
function determineSquareByColumnEnding(squareNumber){
    let startingPosition = getSquareStartingPosition(squareNumber)
    let startingRow = startingPosition[0];
    let startingColumn = startingPosition[1];
    let ending1 = determineColumnEnding(startingRow, startingColumn);
    let ending2 = determineColumnEnding(startingRow, startingColumn + 1);
    let ending3 = determineColumnEnding(startingColumn + 2);
    // return array as third square
    return [ending1[0], ending2[0], ending3[0],
            ending1[1], ending2[1], ending3[1],
            ending1[2], ending2[2], ending3[2],];
}

// creates a column[] based on row[i][index]
// returns final 3 numbers to complete 1-9 sequence for that column
function determineColumnEnding(rowNumber, columnNumber){
    let column = getColumnArray(columnNumber);

    let possibilities = [...numList];
    for (i = 8; i >= 0; i--){
        if (column.includes(possibilities[i])){
            possibilities.splice(i,1);
        }
    }
    let ending = [];
    for (i = 2; i >= 0; i--){
        randomIndex = getRandom(possibilities.length);
        ending.push(possibilities[randomIndex]);
        possibilities.splice(randomIndex, 1);
    }
    return ending;
}

// squareFive is first of highly complex squares:

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
    let results = [0,0,0,0,0,0,0,0,0,0];
    for (let j = 0; j < arrayOfCellOptions.length; j++){
        for (let k = 0; k < 9; k++){
            if (squareOptions[k].includes(arrayOfCellOptions[j])){
                results[j]++;
            }
        }
    }
    let smallestIndex = 0;
    let smallestTotal = 10;
    for (let j = 0; j < results.length; j++){
        if (results[j] < smallestTotal && results[j] > 0){
            smallestIndex = j;
            smallestTotal = results[j];
        }
    }
    return arrayOfCellOptions[smallestIndex];
}

function determineCellOptions(columnArray, rowArray){
    let available = [...numList];
    for (let k = 8; k >= 0; k--){
        if (columnArray.includes(available[k])){
            available.splice(k,1)
        }
        else if (rowArray.includes(available[k])) {    
            available.splice(k,1)
        }
    }
    return available;
}

function removeNumberFromOtherOptions(numberToRemove, cellOptions){
    for (let j = cellOptions.length-1; j >= 0; j--){
        for (let k = cellOptions[j].length-1; k >= 0; k--){
            if (cellOptions[j][k] == numberToRemove){
                cellOptions[j].splice(k,1);
            }
        }
    }
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
    boardPercentage = goodBoards / (goodBoards + badBoards);
    return goodBoard;
}


function zeroOutArray(){
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
            $(myCellId).innerHTML = myCellValue;
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
    if ($("r0c0").style.background == ""){
        activateHighlight();
    }
    else{
        removeHighlight();
    }
}

function removeHighlight(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let myCellId = getIdOfSudokuCell(i, j);
            $(myCellId).style.background = "";
        }
    }
}

function activateHighlight(){
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
            $(myCellId).style.background = newColor;
        }
    }
}
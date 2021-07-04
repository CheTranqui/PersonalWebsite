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

let squareFive = [];
let squareSix = [];
let squareEight = [];
let squareNine = [];

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
}

function generateBoard() {
    // setting up the first square - this is our baseline for the puzzle.
    let squareOne = determineFirstSquare();
    assignBoardValues(squareOne, 1);
    // need to follow up first square with squares 2 and 3
    let squareTwo = determineSecondSquare(squareOne);
    assignBoardValues(squareTwo, 2);
    let squareThree = determineThirdSquare();
    assignBoardValues(squareThree, 3);
    // then squares 4 and 7... this will finish the top row and left column of squares.
    let squareFour = determineSquareFour(squareOne);
    assignBoardValues(squareFour, 4);
    let squareSeven = determineSquareSeven();
    assignBoardValues(squareSeven, 7);
    // squares 5, 6, 8, and 9 are all highly complex, requiring horizontal and vertical matching
    // these must be completed together as they are highly interdependent
    // validCompletion will confirm that they work and backtrack a solution until they do
    // failsafe kills loop after 23 failed attempts
    let validCompletion = false;
    let finalFourSquaresAttempts = 0;
    
    // do{
        squareFive = determineSquareFive();
        squareSix = determineSquareSix();
        squareEight = determineSquareEight();
        squareNine = determineSquareNine();
        // if (check(squareNine)){
        //     if (check(squareEight)){
        //         if (check(squareSix)){
        //             if (check(squareFive)){
        //                 validCompletion = true;
        //             }
        //         }
        //     }
        // }
    // } while (!validCompletion || finalFourSquaresAttempts == 23);
    assignBoardValues(squareFive, 5);
    assignBoardValues(squareSix, 6);
    assignBoardValues(squareEight, 8);
    assignBoardValues(squareNine, 9);
    
    loadValuesIntoCells();
}

// squareValues must be an array of 9 numbers, squareNumber must be a number 1-9.
// squareNumbers go 1, 2, 3 top row, 4, 5, 6 middle, 7, 8, 9 bottom.
// the switches determine the 1st cell of the square and assigns
// square values into the board
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
    console.log("Square " + squareNumber + " begins at:  Row " + row + "  |  Column: " + column);
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

function assignDestinationValues(loopConstraint, source, destination, possibilities){
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

function determineSecondSquare(squareOne){
    // s2 middle row = get 1 or 2 from s1 top:
    // SQUARE STATUS:  empty
    //get returns a number from 0-3 (this is how many from s1Top will be put in s2Middle)
    const totalTopNumbersForS2Middle = getRandom(4);
    // s1Top only contains values that need placed in s2Middle or s2Bottom
    let s1Top = [squareOne[0], squareOne[1], squareOne[2]];      // the two arrays indicate a new, empty destination and all possibilities
    let results = assignDestinationValues(totalTopNumbersForS2Middle, s1Top, [0,0,0], [0,1,2]);
    s1Top = results[0];
    let s2Middle = results[1];
    let s2MiddlePossibilities = results[2];
    // whatever values are left in s2Possibilities is an unfilled index in s2Middle
    
    // SQUARE STATUS:  top empty, middle partial, bottom empty

    // assign remaining values in s1Top to s2Bottom      the two arrays indicate a new, empty destination and all possibilities
    results = assignDestinationValues(s1Top.length, s1Top, [0,0,0], [0,1,2]);
    s1Top = results[0]; // should be empty array
    let s2Bottom = results[1];
    let s2BottomPossibilities = results[2];
    // s1Top is empty

    // SQUARE STATUS:  top empty, middle partial, bottom partial

    // fill remaining spaces in Middle with s1 bottom
    let s1Bottom = [squareOne[6], squareOne[7], squareOne[8]];
    results = assignDestinationValues(s2MiddlePossibilities.length, s1Bottom, s2Middle, s2MiddlePossibilities);
    s1Bottom = results[0];
    s2Middle = results[1]; // should be full (array length 3)
    s2MiddlePossibilities = results[2];  // should be an empty array now

    // SQUARE STATUS:  top empty, middle full, bottom partial

    // any remaining s1Bottom must go into s2Top.      the two arrays indicate a new, empty destination and all possibilities
    results = assignDestinationValues(s1Bottom.length, s1Bottom, [0,0,0], [0,1,2]);
    s1Bottom = results[0]; // should be empty
    let s2Top = results[1];
    let s2TopPossibilities = results[2];

    // SQUARE STATUS:  top partial, middle full, bottom partial

    // fill in remaining s2Top from s1Middle
    let s1Middle = [squareOne[3], squareOne[4], squareOne[5]];
    results = assignDestinationValues(s2TopPossibilities.length, s1Middle, s2Top, s2TopPossibilities);
    s1Middle = results[0];
    s2Top = results[1]; // should be full (array length 3)
    s2TopPossibilities = results[2]; // should be empty

    // SQUARE STATUS:  top full, middle full, bottom partial

    // fill in remaining s2Bottom from s1Middle
    results = assignDestinationValues(s2BottomPossibilities.length, s1Middle, s2Bottom, s2BottomPossibilities);
    s1Middle = results[0]; // should be empty
    s2Bottom = results[1]; // should be full
    s2BottomPossibilities = results[2]; // should be empty

    // squareTwo results:
    return [s2Top[0], s2Top[1], s2Top[2],
            s2Middle[0], s2Middle[1], s2Middle[2],
            s2Bottom[0], s2Bottom[1], s2Bottom[2]];
}

// since only the row matters at this point, we simply figure out
// what three numbers are required to finish the row and assign them
function determineThirdSquare(){
    let ending1 = determineRowEnding(0);
    let ending2 = determineRowEnding(1);
    let ending3 = determineRowEnding(2);
    // return array as third square
    return [ending1[0], ending1[1], ending1[2],
            ending2[0], ending2[1], ending2[2],
            ending3[0], ending3[1], ending3[2],];
}

// removes numbers already present in the row from possibilities
// assigns the remaining possibilities randomly to the ending
function determineRowEnding(row){
    let possibilities = [...numList];
    for (i = possibilities.length-1; i >= 0; i--){
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

// same as determineSecondSquare, but customized for columns rather than rows
function determineSquareFour(squareOne){
    const totalLeftNumbersForS4Center = getRandom(4); //getRandom is max-exclusive
    // s1Left only contains values that need placed in s4Center or s2Right
    let s1Left = [squareOne[0], squareOne[3], squareOne[6]];
    let results = assignDestinationValues(totalLeftNumbersForS4Center, s1Left, [0,0,0], [0,1,2]);
    s1Left = results[0];
    let s4Center = results[1];
    let s4CenterPossibilities = results[2];

    // set remaining s1Left values into s4Right
    results = assignDestinationValues(s1Left.length, s1Left, [0,0,0], [0,1,2]);
    s1Left = results[0]; // should be empty
    let s4Right = results[1];
    let s4RightPossibilities = results[2];
    
    // SQUARE STATUS:  s4Left is empty, s4Center is partial, s4Right is partial
    
    // finish filling s4Right using S1Center
    let s1Center = [squareOne[1], squareOne[4], squareOne[7]];
    results = assignDestinationValues(s4RightPossibilities.length, s1Center, s4Right, s4RightPossibilities);
    s1Center = results[0];
    s4Right = results[1]; // should be full (array length 3)
    s4RightPossibilities = results[2]; // should be empty
    
    // set remaining numbers from s1Center into s4Left
    results = assignDestinationValues(s1Center.length, s1Center, [0,0,0], [0,1,2]);
    s1Center = results[0]; // should be empty
    let s4Left = results[1];
    let s4LeftPossibilities = results[2];

    // SQUARE STATUS:  s4Left is partial, s4Center is partial, s4Right is full
    //                 s1Left is empty, s1Center is empty, s1Right is full

    // fill remaining s4Center from s1Right
    let s1Right = [squareOne[2], squareOne[5], squareOne[8]];
    results = assignDestinationValues(s4CenterPossibilities.length, s1Right, s4Center, s4CenterPossibilities);
    s1Right = results[0];
    s4Center = results[1]; // should be full (array length 3)
    s4CenterPossibilities = results[2]; // should be empty

    // set remaining numbers from s1Right into s4Left
    // this will fill all remaining squares for squareFour
    results = assignDestinationValues(s4LeftPossibilities.length, s1Right, s4Left, s4LeftPossibilities);
    s1Right = results[0]; // should be empty
    s4Left = results[1]; // should be full (array length 3)
    s4LeftPossibilities = results[2]; // should be empty

    // squareFour results:
    return [s4Left[0], s4Center[0],s4Right[0],
            s4Left[1], s4Center[1], s4Right[1],
            s4Left[2], s4Center[2], s4Right[2]];
}

// same as determineThirdSquare, but returning columns rather than rows
function determineSquareSeven(){
    let ending1 = determineColumnEnding(0);
    let ending2 = determineColumnEnding(1);
    let ending3 = determineColumnEnding(2);
    // return array as third square
    return [ending1[0], ending2[0], ending3[0],
            ending1[1], ending2[1], ending3[1],
            ending1[2], ending2[2], ending3[2],]
}

// creates a column[] based on row[i][index]
// returns final 3 numbers to complete 1-9 sequence for that column
function determineColumnEnding(columnNumber){
    let column = [];
    for (i = 0; i < 9; i++){
        column[i] = board[i][columnNumber];
    }

    let possibilities = [...numList];
    for (i = possibilities.length-1; i >= 0; i--){
        if (column.includes(possibilities[i])){
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

// squareFive is first of highly complex squares:

function determineSquareFive(){
    let squareFive = zeroOutArray();
    // must not overlap left or top, while also leaving room for bottom and right squares
    // give each cell of the square an array.
    // fill each cell's array with what is permitted in each cell according to SquareFour and SquareTwo
    
    // remember these possibilities for potential brute force retries

    // check length of each array - if any are size 1, place that number and remove the number from other cell's possibilities
    // keep doing this until there are no more size 1 arrays
    
    // continue to work from shortest array to longest
    
    return squareFive;
}

function determineSquareSix(){
    let squareSix = zeroOutArray();
    return squareSix;
}

function determineSquareEight(){
    let squareEight = zeroOutArray();
    return squareEight;
}

function determineSquareNine(){
    let squareNine = zeroOutArray();
    return squareNine;
}

function check(){
    return true;
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
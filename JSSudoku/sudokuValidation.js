let winningBoard = [];
let startingBoard = [];

function adjustBoardToDifficulty(){
    setWinningBoard();  // copies board into winningBoard for win comparisons
    numberOfCellsToRemove = determineHowManyCellsToRemove();
    removeNumbersFromCells(numberOfCellsToRemove);
}

function setWinningBoard(){
    winningBoard = [];
    for (let i = 0; i < 9; i++){
        winningBoard.push(board[i].slice());
    }
}

function determineHowManyCellsToRemove(){
    let numberOfCellsToRemove;
    switch (getDifficulty()){
        default:
        case ("Easy"):
            numberOfCellsToRemove = 40 - getRandom(6);
            break;
        case ("Medium"):
            numberOfCellsToRemove = 58 - getRandom(6);
            break;
        case ("Hard"):
            numberOfCellsToRemove = 56 - getRandom(6);
            break;
        case ("Devious"):
            // 17 is the least you can have and still only have one possible solution
            // that would be removing 64.
            numberOfCellsToRemove = 60;
            break;
    }
    return numberOfCellsToRemove;
}

function removeNumbersFromCells(numberOfCellsToRemove){
    // this sets the 'onfocus' attribute of a cell to blur() if user is on a mobile device
    // value: it disables the on-screen keyboard when user interacts with the sudokuBoard
    let onfocus = "";
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        onfocus = "blur()";
    }
    for (let i = 0; i < 9; i++){
        for (let j= 0; j < 9; j++){
            // defaults contentEditable to false
            $(getIdOfSudokuCell(i, j)).setAttribute("contentEditable",false);
            $(getIdOfSudokuCell(i, j)).setAttribute("onfocus", onfocus);
        }
    }

    for (let i = 0; i < numberOfCellsToRemove; i++){
        cellPlaced = false;
        do{
            let index1 = getRandom(9);
            let index2 = getRandom(9);
            if (board[index1][index2] != ""){
                board[index1][index2] = "";
                // if there is a number currently set and this cell should be deleted
                // then player must be allowed to edit it and insert a number into the cell:
                $(getIdOfSudokuCell(index1, index2)).setAttribute("contentEditable", true);
                cellPlaced = true;
            }
        } while (!cellPlaced);
    }
    // adding the modified board's arrays to startingBoard
    for (let i = 0; i < 9; i++){
        startingBoard.push(...board[i]);
    }
}

function checkSudoku(source){
    let missmatch = false;
    let complete = true;
    for (let i = 0; i < 9; i++){
        if (missmatch){
            break;
        }
        // checks to see if values are equal and cell is filled
        for (let j = 0; j < 9; j++){
            if (board[i][j] != winningBoard[i][j] && board[i][j] != "" && !isNaN(board[i][j])){
                missmatch = true;
                // "newNumberInput" will only check for actual completion
                // this feedback should only come if the checkSudoku button is pressed
                if (source != "newNumberInput"){
                    $("checkSudokuButton").style.backgroundColor = "maroon";
                    $(getIdOfSudokuCell(i,j)).style.backgroundColor = "maroon";
                    setTimeout(function(){
                        $("checkSudokuButton").style.backgroundColor = "var(--color-secondaryBackground)";
                        $(getIdOfSudokuCell(i,j)).style.backgroundColor = "var(--color-primaryBackground)";
                    },750);
                }
                break;
            }
            else if (board[i][j] == "" || isNaN(board[i][j])){
                board[i][j] = "";
                complete = false;
            }
        }
    }
    if (!missmatch && complete){
        stopPuzzleTimer();
        setWon(true);
        successfulCompletion();
    }
    // this provides positive feedback in the case that no error is found when the checkSudoku button is pressed
    else if (!missmatch && source != "newNumberInput"){
        $("sudokuBoard").classList.add("rainbowBorder");
        setTimeout(function(){
            $("sudokuBoard").classList.remove("rainbowBorder");
        },600);
    }
}
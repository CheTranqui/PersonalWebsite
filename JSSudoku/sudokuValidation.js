let winningBoard = [];
let startingBoard = [];

function adjustBoardToDifficulty(){
    copyFinalBoard();
    numberOfCellsToRemove = determineHowManyCellsToRemove();
    removeNumbersFromCells(numberOfCellsToRemove);
}

function copyFinalBoard(){
    for (let i = 0; i < 9; i++){
        winningBoard.push(board[i].slice());
    }
}

function determineHowManyCellsToRemove(){
    let numberOfCellsToRemove;
    switch (getDifficulty()){
        default:
        case ("Easy"):
            numberOfCellsToRemove = 42;
            break;
        case ("Medium"):
            numberOfCellsToRemove = 50;
            break;
        case ("Hard"):
            numberOfCellsToRemove = 58;
            break;
        case ("Devious"):
            numberOfCellsToRemove = 64;
            break;
    }
    return numberOfCellsToRemove;
}

function removeNumbersFromCells(numberOfCellsToRemove){
    for (let i = 0; i < numberOfCellsToRemove; i++){
        cellPlaced = false;
        do{
            let index1 = getRandom(9);
            let index2 = getRandom(9);
            if (board[index1][index2] != ""){
                board[index1][index2] = "";
                $(getIdOfSudokuCell(index1, index2)).contentEditable = true;
                cellPlaced = true;
            }
        } while (!cellPlaced);
    }
    for (let i = 0; i < 9; i++){
        startingBoard.push(...board[i]);
    }
}

function checkSudoku(){
    let missmatch = false;
    for (let i = 0; i < 9; i++){
        if (missmatch){
            break;
        }
        // checks to see if values are equal and cell is filled
        for (let j = 0; j < 9; j++){
            if (board[i][j] != winningBoard[i][j] && board[i][j] != ""){
                $("checkSudokuButton").style.backgroundColor = "maroon";
                $(getIdOfSudokuCell(i,j)).style.backgroundColor = "maroon";
                missmatch = true;
                setTimeout(function(){
                    $("checkSudokuButton").style.backgroundColor = "var(--color-secondaryBackground)";
                    $(getIdOfSudokuCell(i,j)).style.backgroundColor = "var(--color-primaryBackground)";
                },750);
                break;
            }
        }
    }
}
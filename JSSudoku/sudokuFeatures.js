// Author: Chaz Peterson
// Alias: CheTranqui

let lastCell;
let currentCell;
let difficulty = "Easy";
let hintLevel = "None";

function $(id) { return document.getElementById(id); }

function initializeFeatures(){
    loadCellListeners();
    loadBoardListener();
}

function loadCellListeners(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let cell = $(getIdOfSudokuCell(i,j));
            cell.onclick = hintHighlighting;
        }
    }
}

function updateCurrentCell(cell){
    lastCell = currentCell;
    currentCell = cell;
}  


function hintHighlighting(){
	updateCurrentCell(this);
    removeHighlight();
    this.style.background = "black";
}

function loadBoardListener(){
    $("sudokuBoard").onkeyup = updateCellValue;
}

function updateCellValue(event){
    if (currentCell != undefined && currentCell != null && currentCell.textContent.length > 0){
        let inputNumber = event.key;
        if (isNaN(inputNumber)){
            let lastCharacter = currentCell.textContent.substring(currentCell.textContent.length-1);
            if (!isNaN(lastCharacter)){
                currentCell.textContent = lastCharacter;
                updateBoard(currentCell, lastCharacter);
            }
            else{
                currentCell.textContent = "";
                updateBoard(currentCell, "");
            }
        }
        else {
            currentCell.textContent = inputNumber;
            updateBoard(currentCell, inputNumber);
        }
    }
}

function successfulCompletion(){
    makeItRainbow();
}

function makeItRainbow(){
    for (let i = 0; i < 9; i++){
        let color;
        switch (i){
            default:
            case 0: color = "red"; break;
            case 1: color = "orange"; break;
            case 2: color = "yellow"; break;
            case 3: color = "green"; break;
            case 4: color = "blue"; break;
            case 5: color = "indigo"; break;
            case 6: color = "violet"; break;
            case 7: color = "red"; break;
            case 8: color = "orange"; break;
            case 9: color = "yellow"; break;
        }
        for (let j = 0; j < 9; j++){
            $(getIdOfSudokuCell(i,j)).style.backgroundColor = color;
        }
    }
    let seventh = 143; // milliseconds
    for (let i = 1; i < 25; i++){
        // alternates colors every 143 milliseconds for 20 iterations (2 seconds)
        let waitPeriod = i * seventh;
        setTimeout(updateRainbowColors, waitPeriod);
    }
}

function updateRainbowColors(){
    for (let j = 0; j < 9; j++){
        for (let k = 0; k < 9; k++){
            let color = $(getIdOfSudokuCell(j,k)).style.backgroundColor;
            let newColor;
            switch (color){
                default:
                case ("red"): newColor = "orange"; break;
                case ("orange"): newColor = "yellow"; break;
                case ("yellow"): newColor = "green"; break;
                case ("green"): newColor = "blue"; break;
                case ("blue"): newColor = "indigo"; break;
                case ("indigo"): newColor = "violet"; break;
                case ("violet"): newColor = "red"; break;
            }
            $(getIdOfSudokuCell(j,k)).style.backgroundColor = newColor;
        }
    }
}

function updateBoard(currentCell, newValue){
    let coords = getBoardCoordinates(currentCell);
    board[coords[0]][coords[1]] = parseInt(newValue);
}

function getBoardCoordinates(cell){
    return [cell.id.substring(1,2), cell.id.substring(3)];
}

function setDifficulty(){
    difficulty = $("difficultyDropdown").value;
}

function getDifficulty(){
    return difficulty;
}

function setHintLevel(){
    hintLevel = $("hintLevelDropdown").value;
}

function getHintLevel(){
    return hintLevel;
}
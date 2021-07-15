// Author: Chaz Peterson
// Alias: CheTranqui

let lastCell;
let currentCell;
let difficulty = "Easy";
let hintLevel = "None";
let numberButtons = [];
let selectedNumber = 0;
let numberSelected = false;

function $(id) { return document.getElementById(id); }

function initializeFeatures(){
    loadCellListeners();
    loadBoardListener();
    fillNumberButtonArray();
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
    if (selectedNumber < 10){
        updateCellValue(selectedNumber);
    }
}  

function hintHighlighting(){
	updateCurrentCell(this);
    updateHighlights();
    let cell = $(currentCell.id);
    cell.style.background = "black";
    setTimeout(() => {(cell.style.background = "var(--color-primaryBackground)");}, 2000);
}

function loadBoardListener(){
    $("sudokuBoard").onkeyup = updateValue;
}

function updateValue(event){
    switch (event.key){
        case "ArrowLeft":
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":

        default:
            updateCellValue(event.key);
    }
    
}

function updateCellValue(inputNumber){
    if (selectedNumber < 1 || selectedNumber > 9){
        if (currentCell != undefined && currentCell != null && currentCell.textContent.length > 0){
            if (isNaN(inputNumber)){
                currentCell.textContent = "";
                updateBoard(currentCell, "");
            }
            else {
                currentCell.textContent = inputNumber;
                updateBoard(currentCell, inputNumber);
            }
        }
    }
    else if (currentCell.contentEditable == "true"){
        currentCell.textContent = selectedNumber;
        updateBoard(currentCell, selectedNumber);
    }
        checkSudoku("newNumberInput");
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
            $(getIdOfSudokuCell(i,j)).style.background = color;
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
            let color = $(getIdOfSudokuCell(j,k)).style.background;
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
            $(getIdOfSudokuCell(j,k)).style.background = newColor;
        }
    }
}

function updateBoard(currentCell, newValue){
    let coords = getBoardCoordinates(currentCell);
    board[coords[0]][coords[1]] = parseInt(newValue);
}

function selectNumber(number){
    let selected = false;
    if ($("numberButton" + number).classList.contains("btnInverse")){
        selected = true;
    }
    for (let i = 0; i < 9; i++){
        numberButtons[i].classList.remove("btnInverse");
        numberButtons[i].classList.add("btn");
    }
    if (selected){
        $("numberButton" + number).classList.remove("btnInverse");
        $("numberButton" + number).classList.add("btn");
        removeHighlight();
        selectedNumber = 10;
        highlightRowsAndColumns();
    }
    else{
        $("numberButton" + number).classList.remove("btn");
        $("numberButton" + number).classList.add("btnInverse");
        selectedNumber = number;
        highlightNumbers();
        highlightRowsAndColumns();
    }
}

function updateHighlights(){
    removeHighlight();
    switch (hintLevel){
        case "Numbers":
            highlightNumbers();
            break;
        case "All":
            highlightNumbers(); //falls through to include RowsAndColumns as well
        case "RowsAndColumns":
            highlightRowsAndColumns();
            break;
        default:
        case "None":
            break;
    }
}

function highlightNumbers(){
    removeHighlight();
    if (hintLevel == "Numbers" || hintLevel == "All"){
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                if ($(getIdOfSudokuCell(i,j)).textContent == selectedNumber){
                    $(getIdOfSudokuCell(i,j)).style.background = "var(--color-sudokuBoardHighlight)";
                }
            }
        }
    }
    else if (hintLevel == "All"){
        highlightRowsAndColumns();
    }
    else{
        removeHighlight();
    }
}

function highlightRowsAndColumns(){
    let boardCoordinates = getBoardCoordinates(currentCell);
    if (hintLevel == "RowsAndColumns" || hintLevel == "All"){
        let row = parseInt(boardCoordinates[0]);
        let column = parseInt(boardCoordinates[1]);
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                if (row == i){
                    $(getIdOfSudokuCell(i,j)).style.background = "var(--color-sudokuBoardHighlight)";
                }
                if (column == j){
                    $(getIdOfSudokuCell(i,j)).style.background = "var(--color-sudokuBoardHighlight)";
                }
            }
        }
    }
}

function fillNumberButtonArray(){
    for (let i = 1; i < 10; i++){
        numberButtons.push($("numberButton" + i));
    }
}

function getBoardCoordinates(cell){
    if (cell == null){
        return [10,10];
    }
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
    if (hintLevel == "None"){
        removeHighlight();
    }
}

function getHintLevel(){
    return hintLevel;
}
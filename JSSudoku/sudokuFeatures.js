// Author: Chaz Peterson
// Alias: CheTranqui

let lastCell;
let currentCell;

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
    clearAllHighlights();
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
            }
            else{
                currentCell.textContent = "";
            }
        }
        else {
            currentCell.textContent = inputNumber;
        }
    }
}

function clearAllHighlights(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            $(getIdOfSudokuCell(i,j)).style.background = "var(--color-primaryBackground)";
        }
    }
}
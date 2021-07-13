// Author: Chaz Peterson
// Alias: CheTranqui

let lastCell;
let currentCell;

function loadCellListeners(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let cell = $(getIdOfSudokuCell(i,j));
            cell.onclick = hintHighlighting;
        }
    }
}

function limitCellToOneDigit(cell){
    if (currentCell != undefined && currentCell != null){
        lastCell = currentCell;
        lastCell.textContent = lastCell.textContent.substring(0,1);
    }
    currentCell = cell;
}

function hintHighlighting(){
	limitCellToOneDigit(this);
    clearAllHighlights();
    this.style.background = "black";
}

function clearAllHighlights(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            $(getIdOfSudokuCell(i,j)).style.background = "var(--color-primaryBackground)";
        }
    }
}
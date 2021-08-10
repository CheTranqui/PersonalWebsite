let hintLevel = "None";



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
    if (selectedNumber > 0){
        if (hintLevel == "Numbers" || hintLevel == "All"){
            for (let i = 0; i < 9; i++){
                for (let j = 0; j < 9; j++){
                    if ($(getIdOfSudokuCell(i,j)).textContent == selectedNumber){
                        $(getIdOfSudokuCell(i,j)).style.backgroundColor = "var(--color-sudokuBoardHighlight)";
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
}

function highlightRowsAndColumns(){
    let boardCoordinates = getBoardCoordinates(currentCell);
    if (hintLevel == "RowsAndColumns" || hintLevel == "All"){
        let row = parseInt(boardCoordinates[0]);
        let column = parseInt(boardCoordinates[1]);
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                if (row == i){
                    $(getIdOfSudokuCell(i,j)).style.backgroundColor = "var(--color-sudokuBoardHighlight)";
                }
                if (column == j){
                    $(getIdOfSudokuCell(i,j)).style.backgroundColor = "var(--color-sudokuBoardHighlight)";
                }
            }
        }
    }
}

function setHintLevel(){
    hintLevel = $("hintLevelDropdown").value;
    if (hintLevel == "None"){
        removeHighlight();
    }
    else{
        updateHighlights();
    }
}

function getHintLevel(){
    return hintLevel;
}

function resetPuzzleHighlighting(){
    selectNumber(0);
    removeHighlight();
    deselectAllNumbers();
}

function successfulCompletion(){
    removeHighlight();
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
        // alternates colors every 143 milliseconds for 25 iterations (2.5 seconds)
        let waitPeriod = (i * seventh);
        setTimeout(updateRainbowColors, waitPeriod);
    }
}

function updateRainbowColors(){
    let color;
    let newColor;
    for (let j = 0; j < 9; j++){
        if (j == 0){
            color = $(getIdOfSudokuCell(j,0)).style.backgroundColor;
        }
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
        color = newColor;
        for (let k = 0; k < 9; k++){
            $(getIdOfSudokuCell(j,k)).style.backgroundColor = newColor;
        }
    }
}
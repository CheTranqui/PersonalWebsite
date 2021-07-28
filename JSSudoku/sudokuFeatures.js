// Author: Chaz Peterson
// Alias: CheTranqui

// TODO:
// allow setting to have 'number' hint only highlight and not place number
// stop it from de-coloring a number that I just placed
// set up arrow keys to change focus
// enable tabbing and currentCell
// add undo, allow for notes
// PC Sudoku.  When I delete a given number, I can't put it or any other num in that space.  Not a biggie just don't del!  
// FOR MOBILE:
// fixed: insertion, deletion, makeItRainbow
// scale puzzle/page properly
// highlight choices don't implement until 2nd button press on mobile, work properly on desktop


let lastCell;
let currentCell;
let difficulty = "Easy";
let numberButtons = [];
let selectedNumber = 0;
let numberButtonsInsertNumber = false;
let numberSelected = false;


function $(id) { return document.getElementById(id); }

function initializeFeatures(){
    loadCellListeners(); // listens for left-click within each cell
    loadBoardListener(); // listens for right-click on board and keyup events
    loadButtonListeners();
    fillNumberButtonArray(); // populates array of numberButtons
}

function loadButtonListeners(){
    $("loadNewSudokuButton").addEventListener("click",loadNewSudoku);
    $("difficultyDropdown").addEventListener("click", setDifficulty);
    $("hintLevelDropdown").addEventListener("click", setHintLevel); // code in sudokuHighlights
    $("checkSudokuButton").addEventListener("click", checkSudoku);
    $("pauseSudokuButton").addEventListener("click", togglePuzzleTimer);
    $("gameStartResumeButton").addEventListener("click", startPuzzleTimer);
    $("numberInsertSettingsButton").addEventListener("click", toggleNumberButtonSetting);
    window.addEventListener("keyup", checkForEscape);
}

function loadCellListeners(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let cell = $(getIdOfSudokuCell(i,j));
            cell.onclick = boardLeftClick;
        }
    }
}

function updateCurrentCell(cell){
    currentCell = cell;
}  

function boardLeftClick(){
	updateCurrentCell(this);
    userModifyingCell = true;
    if (numberButtonsInsertNumber){
        updateCellValue(selectedNumber);
        updateHighlights();
    }
}

function boardRightClick(){
    selectNumber(0);
    updateHighlights();
    return false;
}

function loadBoardListener(){
    $("sudokuBoard").addEventListener("keyup", updateValue);
    $("sudokuBoard").addEventListener("contextmenu", (event) => {
        event.preventDefault();
        boardRightClick()});
}

function checkForEscape(event){
    if (seconds > 0){
        if (event.key == "Escape"){
            keyboardPause();
        }
        else{
            updateValue(event);
        }
    }
}

function updateValue(event){
    switch (event.key){
        case "Escape":
            break;
        case "ArrowLeft": 
        case "ArrowRight":
        case "ArrowUp":
        case "ArrowDown":
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            selectNumber(event.key);
            if (userModifyingCell || numberButtonsInsertNumber){
                updateCellValue(event.key);
            }
            break;
        default:
        case "Delete":
        case "Backspace":
        case "d":
        case "D":
            updateCellValue("D");
            break;
    }
    
}

function updateCellValue(inputNumber){
    if (currentCell != undefined){
        if (currentCell.contentEditable == "true"){
            if (selectedNumber < 1 || selectedNumber > 9){
                if (currentCell != undefined && currentCell != null && currentCell.textContent.length > 0){
                    if (isNaN(inputNumber)){
                        currentCell.textContent = "";
                        updateBoard(currentCell, "");
                    }
                    else if (currentCell.textContent.length > 1){
                        currentCell.textContent = inputNumber;
                        updateBoard(currentCell, inputNumber);
                    }
                    else if (selectedNumber > 0 && selectedNumber < 10){
                        currentCell.textContent = inputNumber;
                        updateBoard(currentCell, inputNumber);
                    }
                    else if (inputNumber > 0 && inputNumber < 10){
                        currentCell.textContent = inputNumber;
                        updateBoard(currentCell, inputNumber);
                    }
                    else{
                        currentCell.textContent = "";
                        updateBoard(currentCell, "");
                    }
                }
                else if (currentCell.textContent.length == 0){
                    currentCell.textContent = "";
                    updateBoard(currentCell, "");
                }
            }
            else if ((selectedNumber > 0 && numberButtonsInsertNumber ) || inputNumber > 0){
                currentCell.textContent = selectedNumber;
                updateBoard(currentCell, selectedNumber);
            }
            else if (selectedNumber == "D" || inputNumber == "D"){
                currentCell.textContent = "";
                updateBoard(currentCell, "");
            }
        }
        currentCell.blur();
        lastCell = currentCell;
        currentCell = undefined;
        userModifyingCell = false;
        checkSudoku("newNumberInput");
    }
}



function updateBoard(currentCell, newValue){
    let coords = getBoardCoordinates(currentCell);
    board[coords[0]][coords[1]] = parseInt(newValue);
}

function toggleNumberButtonSetting(){
        numberButtonsInsertNumber = !numberButtonsInsertNumber;
        if (numberButtonsInsertNumber){
            $("numberInsertSettingsButton").classList.remove("btn");
            $("numberInsertSettingsButton").classList.add("btnInverse");
        }
        else{
            $("numberInsertSettingsButton").classList.remove("btnInverse");
            $("numberInsertSettingsButton").classList.add("btn");
        }
}

function selectNumber(number){
    let selected = false;
    // if selectedNumber is greater than 0:
    if (number > 0 || number == "D"){
        // mark the selected number's button as selected
        if ($("numberButton" + number).classList.contains("btnInverse")){
            selected = true;
        }
        // reset all button colors
        for (let i = 0; i < 10; i++){
            numberButtons[i].classList.remove("btnInverse");
            numberButtons[i].classList.add("btn");
        }
        // if it's already selected, then unselect it
        if (selected){
            $("numberButton" + number).classList.remove("btnInverse");
            $("numberButton" + number).classList.add("btn");
            removeHighlight();
            selectedNumber = 0;
        }
        // otherwise, highlight it and make it active
        else{
            $("numberButton" + number).classList.remove("btn");
            $("numberButton" + number).classList.add("btnInverse");
            selectedNumber = number;
            highlightNumbers();
        }
        for (let i=1; i < 10; i++){
            count = 0;
            for (let j = 0; j < 9; j++){
                for (let k = 0; k < 9; k++){
                    if (board[j][k] == i){
                        count++;
                    }
                }
            }
            if (count == 9){
                numberButtons[i-1].classList.add("numberButtonDepleted")
            }
        }
        highlightRowsAndColumns();
    }
    // if selectedNumber < 1 then remove all highlighting from all number buttons
    else {
        selectedNumber = 0;
        for (let i = 0; i < 10; i++){
            numberButtons[i].classList.remove("btnInverse");
            numberButtons[i].classList.add("btn");
        }
    }
}

function fillNumberButtonArray(){
    for (let i = 1; i < 10; i++){
        numberButtons.push($("numberButton" + i));
    }
    numberButtons.push($("numberButtonD"));
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


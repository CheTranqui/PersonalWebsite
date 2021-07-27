// Author: Chaz Peterson
// Alias: CheTranqui

// TODO:
// allow setting to have 'number' hint only highlight and not place number
// set up arrow keys to change focus
// add undo, allow for notes
// PC Sudoku.  When I delete a given number, I can't put it or any other num in that space.  Not a biggie just don't del!  
// FOR MOBILE:
// fixed: insertion, deletion, makeItRainbow
// scale puzzle/page properly
// highlight choices don't implement until 2nd button press on mobile, work properly on desktop


let lastCell;
let currentCell;
let difficulty = "Easy";
let hintLevel = "None";
let numberButtons = [];
let selectedNumber = 0;
let numberSelected = false;
let userModifyingCell = false;
let seconds = 0;
let minutes = 0;
let puzzleTime;
let previousTime;
let paused = true;

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
    $("hintLevelDropdown").addEventListener("click", setHintLevel);
    $("checkSudokuButton").addEventListener("click", checkSudoku);
    $("pauseSudokuButton").addEventListener("click", togglePuzzleTimer);
    $("gameStartResumeButton").addEventListener("click", startPuzzleTimer);
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
    lastCell = currentCell;
    currentCell = cell;
    updateCellValue(selectedNumber);
}  

function boardLeftClick(){
	updateCurrentCell(this);
    userModifyingCell = true;
    let cell = $(currentCell.id);
    cell.style.background = "black";
    setTimeout(() => {(cell.style.background = "var(--color-primaryBackground)");}, 2000);
    updateHighlights();
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
    if (event.key == "Escape"){
        keyboardPause();
    }
    else{
        updateValue(event);
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
            updateCellValue(event.key);
            break;
        default:
        case "Delete":
        case "Backspace":
        case "d":
        case "D":
            currentCell.textContent = "";
            updateCellValue("D");
            break;
    }
    
}

function updateCellValue(inputNumber){
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
            else if (currentCell.contentEditable == "true" && (inputNumber > 0 && inputNumber < 10)){
                currentCell.textContent = inputNumber;
                updateBoard(currentCell, inputNumber);
            }
            else if (currentCell.contentEditable == "true"){
                currentCell.textContent = "";
                updateBoard(currentCell, "");
            }
        }
    }
    else if (currentCell.contentEditable == "true" && selectedNumber > 0){
        currentCell.textContent = selectedNumber;
        updateBoard(currentCell, selectedNumber);
    }
    else if (currentCell.contentEditable == "true" && inputNumber > 0){
        currentCell.textContent = selectedNumber;
        updateBoard(currentCell, selectedNumber);
    }
    else if (selectedNumber == "D" && currentCell.contentEditable == "true"){
        currentCell.textContent = "";
        updateBoard(currentCell, "");
    }
    userModifyingCell = false;
    checkSudoku("newNumberInput");
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

function updateBoard(currentCell, newValue){
    let coords = getBoardCoordinates(currentCell);
    board[coords[0]][coords[1]] = parseInt(newValue);
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

function startPuzzleTimer(){
    paused = false;
    togglePauseScreen();
    puzzleTimer();
    // create new clock and start timer
}

function resetPuzzleTimer(){
    stopPuzzleTimer();
    previousTime = puzzleTime;
    minutes = 0;
    seconds = 0;
    puzzleTime = "00:00";
    $("timeClock").textContent = puzzleTime;
}

function keyboardPause(){
    currentCell.blur();
    if (userModifyingCell){
        updateCellValue("d");
        userModifyingCell = false;
    }
    else if (puzzleTime != "00:00"){
        togglePuzzleTimer();
    }
    selectNumber(0);
}

function togglePuzzleTimer(){
    paused = !paused;
    togglePauseScreen();
    puzzleTimer();
}

function stopPuzzleTimer(){
    paused = true;
}

function togglePauseScreen(){
    if (paused){
        showGameMenu();
    }
    else{
        hideGameMenu();
    }
}

function showGameMenu(){
    $("gameMenuBackground").classList.remove("hiddenMenu");
    $("gameMenuBackground").classList.add("activeMenu");
}

function hideGameMenu(){
    $("gameMenuBackground").classList.remove("activeMenu");
    $("gameMenuBackground").classList.add("hiddenMenu");
}

function savePuzzleTimer(){
    // save time, stop clock
}

// clock adjusted from original at: https://jsfiddle.net/Daniel_Hug/pvk6p/
function puzzleTimer() {
    if (!paused){
        setTimeout(addToPuzzleTimer, 1000);
    }
}

function addToPuzzleTimer() {
    if (!paused){
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes > 99) {
                minutes = 0;
            }
        }
        puzzleTime = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
        + ":" + (seconds > 9 ? seconds : "0" + seconds);
        $("timeClock").textContent = puzzleTime;

        puzzleTimer();
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

function setHintLevel(){
    hintLevel = $("hintLevelDropdown").value;
    if (hintLevel == "None"){
        removeHighlight();
    }
}

function getHintLevel(){
    return hintLevel;
}


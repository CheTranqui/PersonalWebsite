let userModifyingCell = false;
let seconds = 0;
let minutes = 0;
let puzzleTime;
let previousTime;
let paused = true;

function startPuzzleTimer(){
    $("gameStartResumeButton").textContent = "Resume";
    paused = false;
    togglePauseScreen();
    puzzleTimer();
    // create new clock and start timer
}

function resetPuzzleTimer(){
    stopPuzzleTimer();
    paused = false;
    setWon(false);
    previousTime = puzzleTime;
    minutes = 0;
    seconds = 0;
    puzzleTime = "00:00";
    $("gameStartResumeButton").textContent = "Start";
    $("timeClock").textContent = puzzleTime;
}

function keyboardPause(){
    if (userModifyingCell){
        updateCellValue("d");
        userModifyingCell = false;
    }
    else{
        if (currentCell != undefined){
            currentCell.blur();
            currentCell = undefined;
        }
        if (getWon()){
            if ($("gameMenuBackground").classList.contains("activeMenu")){
                showGameMenu();
            }
            else{
                hideGameMenu();
            }
        }
        else{
            togglePuzzleTimer();
        }
    }
    selectNumber(0);
}

function togglePuzzleTimer(){
    if (!won){
        paused = !paused;
        togglePauseScreen();
        puzzleTimer();
    }
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
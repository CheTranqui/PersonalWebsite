function $(id) { return document.getElementById(id);}

document.addEventListener('DOMContentLoaded', () => {
    $('highLowGuessBtn').addEventListener('click', highLowGuess);
    $('highLowPlayAgainBtn').addEventListener('click', highLowPlayAgain);
    setHighLowNumber();
});

// Two globals to track game attempts & goal number
let highLowNumber = 0;
let highLowCount = 0;

function setHighLowNumber(){
    highLowNumber = (Math.floor(Math.random() * 10))+1;
}

function highLowError(){
    // throw error msg if # is not 1-10
}

function highLowGuess(){
    event.preventDefault();
    let yourGuessText = $('highLowInput').value;
    let yourGuess = parseInt(yourGuessText);
    highLowCount += 1;
    $('highLowResultCount').innerHTML = highLowCount;

    if (yourGuess > 10 || yourGuess < 1 || yourGuess.toString() == "NaN") {
        highLowError()
    }
    else{
        if (yourGuess > highLowNumber){
            $('highLowResultFeedback').innerHTML = "Over";
            $('highLowResultFeedback').style.color = "rgb(241, 68, 15)";
        }
        else if (yourGuess < highLowNumber){
            $('highLowResultFeedback').innerHTML = "Under";
            $('highLowResultFeedback').style.color = "rgb(15, 215, 241)";
        }
        else{
            $('highLowResultFeedback').innerHTML = "Congratulations! " + yourGuess + " is the number!";
            $('highLowResultFeedback').style.color = "silver";
            $('highLowFieldset').style.background = "linear-gradient(-45deg, red, orange, yellow, green, blue, indigo, violet)";
            $('highLowResultLabel').style.background = "rgb(40, 68, 68)";
            $('highLowCountLabel').style.background = "rgb(40, 68, 68)";
        }
    }
}

// resets number, count, and background, etc, to beginning state
function highLowPlayAgain(){
    event.preventDefault();
    setHighLowNumber();
    $('highLowFieldset').style.background = "rgb(40, 68, 68)";
    $('highLowResultFeedback').innerHTML = "";
    $('highLowResultFeedback').style.color = "silver";
    highLowCount = 0;
    $('highLowResultCount').innerHTML = highLowCount;
}
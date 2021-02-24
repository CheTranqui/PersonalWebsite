
// Load comparison listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('comparisonBtnNames').addEventListener('click', compareNames);
    document.getElementById('comparisonBtnNumbers').addEventListener('click', compareNumbers);
    document.getElementById('comparisonBtnReset').addEventListener('click', resetComparisons);
});

// hide results screen
function hideComparisonResult(){
    document.getElementById('comparisonResult').style.display = "none";
}

// wait before hiding results screen
function hideComparisonResultTimeout(ms){
    setTimeout(function(){
        hideComparisonResult();
    }, ms);
}

// shows results screen w/ relevant text
function declareComparison(typeStr, sameStr){
    document.getElementById('comparisonResult').innerHTML = "The " + typeStr + " you entered are " + sameStr + ".";
    document.getElementById('comparisonResult').style.display = "inline-block";
    hideComparisonResultTimeout(2000);
 }

function compareNames(){
    event.preventDefault();
    let name1 = document.getElementById('comparisonName1Input').value;
    let name2 = document.getElementById('comparisonName2Input').value;
    if (name1 === name2){
        declareComparison("names", "the same");
    }
    else{
        declareComparison("names", "distinct");
    }
 }

 function compareNumbers(){
    event.preventDefault();
    let number1 = document.getElementById('comparisonNumber1Input').value;
    let number2 = document.getElementById('comparisonNumber2Input').value;
    if (number1 === number2){
        declareComparison("numbers", "the same")
    }
    else{
        declareComparison("numbers", "distinct")
    }
 }

//  blanks out name and number fields
function resetComparisons(){
    document.getElementById('comparisonName1Input').value = "";
    document.getElementById('comparisonName2Input').value = "";
    document.getElementById('comparisonNumber1Input').value = "";
    document.getElementById('comparisonNumber2Input').value = "";
}
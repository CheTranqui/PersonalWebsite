function $(id) { return document.getElementById(id);}

// Load comparison listeners
document.addEventListener('DOMContentLoaded', () => {
    $('comparisonBtnNames').addEventListener('click', compareNames);
    $('comparisonBtnNumbers').addEventListener('click', compareNumbers);
    $('comparisonBtnReset').addEventListener('click', resetComparisons);
});

// hide results screen
function hideComparisonResult(){
    $('comparisonResult').style.display = "none";
}

// wait before hiding results screen
function hideComparisonResultTimeout(ms){
    setTimeout(function(){
        hideComparisonResult();
    }, ms);
}

// shows results screen w/ relevant text
function declareComparison(typeStr, sameStr){
    $('comparisonResult').innerHTML = "The " + typeStr + " you entered are " + sameStr + ".";
    $('comparisonResult').style.display = "inline-block";
    hideComparisonResultTimeout(2000);
 }

function compareNames(){
    event.preventDefault();
    let name1 = $('comparisonName1Input').value;
    let name2 = $('comparisonName2Input').value;
    if (name1 === name2){
        declareComparison("names", "the same");
    }
    else{
        declareComparison("names", "distinct");
    }
 }

 function compareNumbers(){
    event.preventDefault();
     let number1 = $('comparisonNumber1Input').value;
     let number2 = $('comparisonNumber2Input').value;
    if (number1 === number2){
        declareComparison("numbers", "the same")
    }
    else{
        declareComparison("numbers", "distinct")
    }
 }

//  blanks out name and number fields
function resetComparisons(){
    $('comparisonName1Input').value = "";
    $('comparisonName2Input').value = "";
    $('comparisonNumber1Input').value = "";
    $('comparisonNumber2Input').value = "";
}
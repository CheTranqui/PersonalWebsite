document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loopStartBtn').addEventListener('click', loopFormOpen);
    document.getElementById('loopAddBtn').addEventListener('click', loopFormAdd);
    document.getElementById('loopEndBtn').addEventListener('click', loopFormEnd);
});

// persistent totals to display
let loopAdditionTotal = 0;
let loopAdditionClicks = 0;

// displays input form
function loopFormOpen(){
    event.preventDefault();
    // reset totals and totals displays
    loopAdditionTotal = 0;
    loopAdditionClicks = 0;
    document.getElementById('loopTotal').innerHTML = loopAdditionTotal;
    document.getElementById('loopCount').innerHTML = loopAdditionClicks;
    // show form and move results display
    document.getElementById('loopResultsContainer').style.transform = "translate(4.5em, 0.5em)";
    document.getElementById('loopForm').style.display = "inline-block";
}

function loopAdditionError(){
    // not yet created
}

function showLoopNotification(myStr){
    document.getElementById('loopNotification').textContent = myStr + " has been added.";
    document.getElementById('loopNotification').style.display = "inline-block";
    setTimeout(function(){
        hideLoopNotification();
    }, 2000);
}

function hideLoopNotification(){
    document.getElementById('loopNotification').style.display = "none";
}

// add entered amount to total, update count
function loopFormAdd(){
    event.preventDefault();
    let tempNumberString = document.getElementById('loopInput').value;
    if (tempNumberString == ""){
        loopAdditionError();
    }
    else{
        // get and format number
        loopAdditionTotal += parseInt(tempNumberString);
        let myFormattedTotal = formatNumber(loopAdditionTotal);
        // update form and show notification
        document.getElementById('loopTotal').innerHTML = myFormattedTotal;
        showLoopNotification(tempNumberString);
        // reset form
        document.getElementById('loopInput').value = "";
        // increment and display loop count
        ++loopAdditionClicks;
        document.getElementById('loopCount').innerHTML = loopAdditionClicks;
    }
}

// hides display and moves stuff back where it normally was, empties form
function loopFormEnd(){
    event.preventDefault();
    document.getElementById('loopForm').style.display = "none";
    document.getElementById('loopForm').value = "";
    document.getElementById('loopResultsContainer').style.transform = "translate(-5em, -3em)";
}


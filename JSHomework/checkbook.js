document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('checkbookBtnDeposit').addEventListener('click', checkbookDeposit);
    document.getElementById('checkbookBtnWithdraw').addEventListener('click', checkbookWithdraw);
});

let myAccountBalance = 0;

function getCheckbookTransactionAmount(){
    return parseInt(document.getElementById('checkbookAmountInput').value);
}

function hideCheckbookWarning(){
    document.getElementById('checkbookWarning').style.display = "none";
}

// wait this long before hiding the warning
function hideWarningTimeout(ms){
    setTimeout(function(){
        hideCheckbookWarning();
    }, ms);
}

// if transaction amount is negative..
function checkbookError(){
    document.getElementById('checkbookWarning').innerHTML = "Transaction amount must be positive.";
    document.getElementById('checkbookWarning').style.display = "inline-block";
    hideWarningTimeout(2000);
}

function formatNumber(int){
    let myShrinkingNumber = int.toString();
    let myLength = myShrinkingNumber.length;
    let myFormattedNumber = "";
    let count = 0;
    // parses number to create a clean 1,000,000 figure.
    for (i = 0; i < myLength; i++){
        let myNewNumber = myShrinkingNumber.substring(0,myShrinkingNumber.length-1);
        let myTempNumber = myShrinkingNumber.substring(myShrinkingNumber.length-1);
        myFormattedNumber = myTempNumber + myFormattedNumber;
        myShrinkingNumber = myNewNumber;
        
        ++count
        if (count % 3 == 0 && myShrinkingNumber.length > 0){
            if (myShrinkingNumber.substring(0,1) != "-"){
                myFormattedNumber = "," + myFormattedNumber;
            }
        }
        console.log(myFormattedNumber);
    }
    
    return myFormattedNumber;
}

function updateBalance(amount){
    myAccountBalance += amount;
    myFormattedBalance = formatNumber(myAccountBalance);
    if (myFormattedBalance.substring(0,1) == "-"){
        myFormattedBalance = myFormattedBalance.substring(1,myFormattedBalance.length);
        myFormattedCurrency = "-$" + myFormattedBalance;
    }
    else{
        myFormattedCurrency = "$" + myFormattedBalance;
    }
    document.getElementById('checkbookBalance').innerHTML = myFormattedCurrency;
}

function checkbookDeposit(){
    event.preventDefault();
    let myDeposit = getCheckbookTransactionAmount();
    console.log(myDeposit);
    if (myDeposit <= 0 || isNaN(myDeposit)){
        console.log("throw error - subZero")
        checkbookError();
    }
    else{
        console.log("Updating balance...")
        updateBalance(myDeposit)
    }
}

function checkbookWithdraw(){
    event.preventDefault();
    let myWithdrawal = getCheckbookTransactionAmount();
    if (myWithdrawal <= 0 || isNaN(myWithdrawal)){
        console.log("throw error - subZero")
        checkbookError();
    }
    else{
        console.log("Updating balance...")
        updateBalance(-myWithdrawal)
    }
}

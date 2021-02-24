
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ranGenBtn').addEventListener('click', rollDie);
    document.getElementById('cardAlignLeftButton').addEventListener('click', cardAlignLeft);
    document.getElementById('cardAlignCenterButton').addEventListener('click', cardAlignCenter);
    document.getElementById('cardAlignRightButton').addEventListener('click', cardAlignRight);
    document.getElementById('cardPreviewButton').addEventListener('click', cardPreview);
    document.getElementById('cardResetButton').addEventListener('click', cardReset);
    document.getElementById('cardReverseButton').addEventListener('click', cardReverse);
    document.getElementById('cardRandomButton').addEventListener('click', cardRandom);
    document.getElementById('cardBackgroundColor').addEventListener('change', cardBackgroundColor);
    document.getElementById('cardTextColor').addEventListener('change', cardTextColor);
    document.getElementById('cardAccentColor').addEventListener('change', cardAccentColor);
    document.getElementById('cardBusinessPrimaryColor').addEventListener('change', cardPrimaryColor);
    document.getElementById('cardBusinessSecondaryColor').addEventListener('change', cardSecondaryColor);
});

function getRandomNumber(maxNumber){
    let thisRoll = Math.floor(Math.random() * (maxNumber))+1;
    // console.log(thisRoll);
    return thisRoll;
}

function rollDie(){
    event.preventDefault();
    let myRoll = getRandomNumber(20).toString();
    if (myRoll == undefined ||
        myRoll == null ||
        myRoll == "NaN" ||
        parseInt(myRoll) <= 0
        ){
        myRoll = "ERROR: number must be a positive integer";
    }
    document.getElementById('ranGenTextNumber').innerHTML = myRoll;
}
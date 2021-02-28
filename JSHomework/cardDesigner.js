function $(id) { return document.getElementById(id);}

document.addEventListener('DOMContentLoaded', () => {
    $('cardAlignLeftButton').addEventListener('click', cardAlignLeft);
    $('cardAlignCenterButton').addEventListener('click', cardAlignCenter);
    $('cardAlignRightButton').addEventListener('click', cardAlignRight);
    $('cardPreviewButton').addEventListener('click', cardPreview);
    $('cardResetButton').addEventListener('click', cardReset);
    $('cardReverseButton').addEventListener('click', cardReverse);
    $('cardRandomButton').addEventListener('click', cardRandom);
    $('cardBackgroundColor').addEventListener('change', cardBackgroundColor);
    $('cardTextColor').addEventListener('change', cardTextColor);
    $('cardAccentColor').addEventListener('change', cardAccentColor);
    $('cardBusinessPrimaryColor').addEventListener('change', cardPrimaryColor);
    $('cardBusinessSecondaryColor').addEventListener('change', cardSecondaryColor);
});

let myCard;

function card(business, slogan, name, title, email, phone){
    this.business = business;
    this.slogan = slogan;
    this.name = name;
    this.title = title;
    this.email = email;
    this.phone = phone;
}

// loads text into the card display
function cardPreview(){
    event.preventDefault();
    let myElement = $('cardOptionList');
    myCard = new card(
        myElement.children[0].children[1].value,
        myElement.children[1].children[1].value,
        myElement.children[2].children[1].value,
        myElement.children[3].children[1].value,
        myElement.children[5].children[1].value,
        myElement.children[4].children[1].value
        );
    $('cardDisplayBusinessName').innerHTML = myCard.business;
    $('cardDisplayBusinessSlogan').innerHTML = myCard.slogan;
    $('cardDisplayPersonName').innerHTML = myCard.name;
    $('cardDisplayJobTitle').innerHTML = myCard.title;
    $('cardDisplayEmail').innerHTML = myCard.email;
    $('cardDisplayPhone').innerHTML = myCard.phone;
}

// adds a new class to each element on the card display
// the class is defined in CSS
function addClass(myClass){
    let myElement = $('cardDisplay');
    myElement.children[0].children[0].classList.add(myClass);
    myElement.children[0].children[1].classList.add(myClass);
    myElement.children[2].children[0].children[0].classList.add(myClass);
    myElement.children[2].children[0].children[1].classList.add(myClass);
    myElement.children[2].children[1].children[0].classList.add(myClass);
    myElement.children[2].children[1].children[1].classList.add(myClass);
}

// removes a class from each element on the card display
function removeClass(myClass){
    let myElement = $('cardDisplay');
    myElement.children[0].children[0].classList.remove(myClass);
    myElement.children[0].children[1].classList.remove(myClass);
    myElement.children[2].children[0].children[0].classList.remove(myClass);
    myElement.children[2].children[0].children[1].classList.remove(myClass);
    myElement.children[2].children[1].children[0].classList.remove(myClass);
    myElement.children[2].children[1].children[1].classList.remove(myClass);
}

function cardAlignLeft(){
    event.preventDefault();
    removeClass("align-center")
    removeClass("align-right")
    addClass("align-left")
}

function cardAlignRight(){
    event.preventDefault();
    removeClass("align-center")
    removeClass("align-left")
    addClass("align-right")
}

function cardAlignCenter(){
    event.preventDefault();
    removeClass("align-left")
    removeClass("align-right")
    addClass("align-center")
}

// resets the cards colors, alignment, and flex direction
function cardReset(){
    event.preventDefault();
    removeClass("align-left");
    removeClass("align-right");
    $('cardDisplay').style.background = "#ffffff";
    $('cardDisplayBusinessName').style.color = "#000000";
    $('cardDisplayBusinessSlogan').style.color = "#000000";
    $('cardDisplayPersonName').style.color = "#000000";
    $('cardDisplayJobTitle').style.color = "#000000";
    $('cardDisplayPhone').style.color = "#000000";
    $('cardDisplayEmail').style.color = "#000000";
    $('displayLine').style.background = "#ffffff";
    $('cardDisplay').style.display = "flex";
    $('cardDisplay').style.flexDirection = "column";
    $('cardDisplay').style.justifyContent = "space-evenly";
}

function cardReverse(){
    event.preventDefault();
    if ($('cardDisplay').style.flexDirection == "column-reverse") {
        $('cardDisplay').style.flexDirection = "column"
    }
    else {
        $('cardDisplay').style.flexDirection = "column-reverse";
    }
}

function cardRandom() {
    event.preventDefault();
    switch (Math.floor(Math.random() * 3)) {
        case 0: cardAlignLeft();
            break;
        default:
        case 1: cardAlignCenter();
            break;
        case 2: cardAlignRight();
            break;
    }
    switch (Math.floor(Math.random() * 2)) {
        case 0: cardReverse();
            break;
        default:
            break;
    }
    if (Math.random() > 0.5) {
        $('cardDisplay').style.flexDirection = "column-reverse";
    }
    else {
        cardReverse()
    }
    randomizeColors();
}

function randomizeColors() {
    let codes = getRandomHexCodes();
    $('cardDisplay').style.background = codes[0];
    $('cardDisplayBusinessName').style.color = codes[1];
    $('cardDisplayBusinessSlogan').style.color = codes[2];
    $('cardDisplayPersonName').style.color = codes[3];
    $('cardDisplayJobTitle').style.color = codes[4];
    $('cardDisplayPhone').style.color = codes[5];
    $('cardDisplayEmail').style.color = codes[6];
    $('displayLine').style.background = codes[7];
}

function getRandomHexCodes() {
    let codes = [];
    for (let i = 0; i < 8; i++) {
        let code = "#";
        for (let j = 0; j < 6; j++) {
            if ((Math.floor(Math.random() * 16)) <= 10) {
                code += (Math.floor(Math.random() * 10));
            }
            else {
                let num = (Math.floor(Math.random() * 6));
                switch (num) {
                    case 0: code += "a";
                        break;
                    case 1: code += "b";
                        break;
                    case 2: code += "c";
                        break;
                    case 3: code += "d";
                        break;
                    case 4: code += "e";
                        break;
                    default:
                    case 5: code += "f";
                        break;
                }
            }
        }
        codes.push(code);
    }
    return codes;
}

function cardBackgroundColor(){
    let myColor = $('cardBackgroundColor').value;
    $('cardDisplay').style.background = myColor;
}

function cardTextColor(){
    let myColor = $('cardTextColor').value;
    $('cardDisplayBusinessName').style.color = myColor;
    $('cardDisplayBusinessSlogan').style.color = myColor;
    $('cardDisplayPersonName').style.color = myColor;
    $('cardDisplayJobTitle').style.color = myColor;
    $('cardDisplayPhone').style.color = myColor;
    $('cardDisplayEmail').style.color = myColor;
}

// changes color of HR line down the middle?
function cardAccentColor(){
    let myColor = $('cardAccentColor').value;
    $('displayLine').style.background = myColor;
}

// changes business name and job title color
// also changes slogan color, if slogan color == business color
function cardPrimaryColor(){
    let myColor = $('cardBusinessPrimaryColor').value;
    if ($('cardDisplayBusinessName').style.color ==
        $('cardDisplayBusinessSlogan').style.color){
        $('cardDisplayBusinessSlogan').style.color = myColor;
    }
    $('cardDisplayBusinessName').style.color = myColor;
    $('cardDisplayJobTitle').style.color = myColor;
}

// allows for distinct coloring of slogan
function cardSecondaryColor(){
    let myColor = $('cardBusinessSecondaryColor').value;
    $('cardDisplayBusinessSlogan').style.color = myColor;
}
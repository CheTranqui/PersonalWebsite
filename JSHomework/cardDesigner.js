document.addEventListener('DOMContentLoaded', () => {
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
    let myElement = document.getElementById('cardOptionList');
    myCard = new card(
        myElement.children[0].children[1].value,
        myElement.children[1].children[1].value,
        myElement.children[2].children[1].value,
        myElement.children[3].children[1].value,
        myElement.children[5].children[1].value,
        myElement.children[4].children[1].value
        );
    document.getElementById('cardDisplayBusinessName').innerHTML = myCard.business;
    document.getElementById('cardDisplayBusinessSlogan').innerHTML = myCard.slogan;
    document.getElementById('cardDisplayPersonName').innerHTML = myCard.name;
    document.getElementById('cardDisplayJobTitle').innerHTML = myCard.title;
    document.getElementById('cardDisplayEmail').innerHTML = myCard.email;
    document.getElementById('cardDisplayPhone').innerHTML = myCard.phone;
}

// adds a new class to each element on the card display
// the class is defined in CSS
function addClass(myClass){
    let myElement = document.getElementById('cardDisplay');
    myElement.children[0].children[0].classList.add(myClass);
    myElement.children[0].children[1].classList.add(myClass);
    myElement.children[2].children[0].children[0].classList.add(myClass);
    myElement.children[2].children[0].children[1].classList.add(myClass);
    myElement.children[2].children[1].children[0].classList.add(myClass);
    myElement.children[2].children[1].children[1].classList.add(myClass);
}

// removes a class from each element on the card display
function removeClass(myClass){
    let myElement = document.getElementById('cardDisplay');
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
    document.getElementById('cardDisplay').style.background = "#ffffff";
    document.getElementById('cardDisplayBusinessName').style.color = "#000000";
    document.getElementById('cardDisplayBusinessSlogan').style.color = "#000000";
    document.getElementById('cardDisplayPersonName').style.color = "#000000";
    document.getElementById('cardDisplayJobTitle').style.color = "#000000";
    document.getElementById('cardDisplayPhone').style.color = "#000000";
    document.getElementById('cardDisplayEmail').style.color = "#000000";
    document.getElementById('cardDisplay').style.display = "flex";
    document.getElementById('cardDisplay').style.flexDirection = "column";
    document.getElementById('cardDisplay').style.justifyContent = "space-evenly";
}

function cardReverse(){
    event.preventDefault();
    document.getElementById('cardDisplay').style.flexDirection = "column-reverse";
}

function cardRandom(){
    event.preventDefault();
    // not yet complete
}

function cardBackgroundColor(){
    let myColor = document.getElementById('cardBackgroundColor').value;
    document.getElementById('cardDisplay').style.background = myColor;
}

function cardTextColor(){
    let myColor = document.getElementById('cardTextColor').value;
    document.getElementById('cardDisplayBusinessName').style.color = myColor;
    document.getElementById('cardDisplayBusinessSlogan').style.color = myColor;
    document.getElementById('cardDisplayPersonName').style.color = myColor;
    document.getElementById('cardDisplayJobTitle').style.color = myColor;
    document.getElementById('cardDisplayPhone').style.color = myColor;
    document.getElementById('cardDisplayEmail').style.color = myColor;

}

// changes color of HR line down the middle?
function cardAccentColor(){
    let myColor = document.getElementById('cardAccentColor').value;
    document.getElementById('displayLine').style.background = myColor;
}

// changes business name and job title color
// also changes slogan color, if slogan color == business color
function cardPrimaryColor(){
    let myColor = document.getElementById('cardBusinessPrimaryColor').value;
    if (document.getElementById('cardDisplayBusinessName').style.color ==
    document.getElementById('cardDisplayBusinessSlogan').style.color){
        document.getElementById('cardDisplayBusinessSlogan').style.color = myColor;
    }
   document.getElementById('cardDisplayBusinessName').style.color = myColor;
   document.getElementById('cardDisplayJobTitle').style.color = myColor;
}

// allows for distinct coloring of slogan
function cardSecondaryColor(){
    let myColor = document.getElementById('cardBusinessSecondaryColor').value;
    document.getElementById('cardDisplayBusinessSlogan').style.color = myColor;
}
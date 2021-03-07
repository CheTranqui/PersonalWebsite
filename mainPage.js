// Author: Chaz Peterson
// Alias:  CheTranqui

function $(id) { return document.getElementById(id); }


//handles the CheMedia dropdown
function socialMediaDropdownExpander() {
    event.preventDefault();
    $("socialMediaDropdownDiv").classList.toggle("show");
}

//click anywhere to collapse the social media dropdown
window.onclick = function (event) {
    if (!event.target.matches(".socialMediaDropdownButton")) {
        $("socialMediaDropdownDiv").classList.remove("show");
    }
}

//carousel side buttons get centered to the image and match height on load and resize
window.onload = resizeButtons();
window.onresize = resizeButtons;

function resizeButtons() {
    let idealButtonHeight = $("projectImage").height;
    $("carouselRightButton").style.height = idealButtonHeight + "px";
    $("carouselLeftButton").style.height = idealButtonHeight + "px";
}
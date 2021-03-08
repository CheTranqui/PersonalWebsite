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
window.onresize = resizeButtons;

document.addEventListener('DOMContentLoaded', () => {
    resizeButtons();
    $("emailMeLink").addEventListener("click", copyEmail);
});

function resizeButtons() {
    let idealButtonHeight = $("projectImage").height;
    $("carouselRightButton").style.height = idealButtonHeight + "px";
    $("carouselLeftButton").style.height = idealButtonHeight + "px";
}

function copyEmail() {
    //confirm permission to write to clipboard
    navigator.permissions.query({ name: "clipboard-write" }).then(result => {
        //if so copy email address and let user know
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText("chetranqui@gmail.com").then(function () {
                displayCopyPrompt();
            }).catch(function() {
                //otherwise do nothing
            });
        }
    })
}

function displayCopyPrompt() {
    //get width of navBar - use that width to center notification
    let leftOffset = ($("navContainer").offsetWidth / 2);
    $("copyNotification").style.left = "" + leftOffset + "px";
    $("copyNotification").style.transform = "translateX(-40%)";
    $("copyNotification").style.display = "inline";
    hideElement($("copyNotification"), 4000);
}

// wait before hiding results screen
function hideElement(element, ms) {
    setTimeout(function () {
        element.style.display = "none";
    }, ms);
}
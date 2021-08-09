// Author: Chaz Peterson
// Alias:  CheTranqui

function $(id) { return document.getElementById(id); }
let contactCount = 0;

//click anywhere to collapse the social media dropdown
window.onclick = function (event) {
    if (!event.target.matches(".socialMediaDropdownButton")) {
        $("socialMediaDropdownLink").classList.remove("activeNav");
        $("socialMediaDropdownDiv").classList.remove("show");
    }
}

window.onscroll = function(){
    toggleScrollToTopButton();
}

document.addEventListener('DOMContentLoaded', () => {
    resizeButtons();
    $("emailMeLink").addEventListener("click", copyEmail);
    $("modeCheckbox").addEventListener("click", updateColorScheme);
    $("pageNavButton").addEventListener("click", scrollToTop);
});

//handles the CheMedia dropdown
function socialMediaDropdownExpander() {
    // event.preventDefault();
    $("socialMediaDropdownLink").classList.toggle("activeNav");
    $("socialMediaDropdownDiv").classList.toggle("show");
}

//carousel side buttons get centered to the image and match height on load and resize
window.onload = initializePage;
window.onresize = resizeButtons;

function initializePage(){
    resizeButtons();
    loadProjects();
}

function resizeButtons() {
    let idealButtonHeight = $("projectImage").height;
    $("carouselRightButton").style.height = idealButtonHeight + "px";
    $("carouselLeftButton").style.height = idealButtonHeight + "px";
}

function copyEmail() {
    event.preventDefault();
    contactCount++
    //1st click = notify and copy text, 2nd click opens mail app - but only on desktop
    if (contactCount % 2 == 1 && $("navContainer").offsetWidth > 800) {
        //confirm permission to write to clipboard
            navigator.permissions.query({ name: "clipboard-write" })
            .then(result => {
                //if so copy email address and let user know
                if (result.state == "granted" || result.state == "prompt") {
                    navigator.clipboard.writeText("chetranqui@gmail.com")
                    .then(function () {
                        displayCopyPrompt();
                        //if not on desktop, then always open mail app
                    }).catch(function () {
                        openMailTo();
                    });
                }
                // if checking permissions causes error (i.e. user's on Firefox):
            }).catch(function(){
                displayCopyPrompt();
            })
    }
    else {
        openMailTo();
    }
}

function openMailTo() {
    let mail = document.createElement("a");
    mail.href = "mailto:chetranqui@gmail.com";
    mail.click();
}

function displayCopyPrompt() {
    //get width of navBar - use that width to center notification
    let leftOffset = ($("navContainer").offsetWidth / 2);
    $("copyNotification").style.left = "" + leftOffset + "px";
    $("copyNotification").style.transform = "translateX(-40%)";
    $("copyNotification").style.display = "inline";
    hideElement($("copyNotification"), 3500);
}

// wait before hiding results screen
function hideElement(element, ms) {
    setTimeout(function () {
        element.style.display = "none";
    }, ms);
}

function updateColorScheme() {
    if ($("modeCheckbox").checked == false) {
        // adjust two social media icons
        $("socialMediaDropdownTwitterImage").src = "images/socialMediaIcons/2021-Twitter-logo-blue.png";
        $("socialMediaDropdownGitHubImage").src = "images/socialMediaIcons/GitHub-Mark-120px-plus.png";
        activateLightMode();
    }
    else {
        // adjust two social media icons
        $("socialMediaDropdownTwitterImage").src = "images/socialMediaIcons/2021-Twitter-logo-white.png";
        $("socialMediaDropdownGitHubImage").src = "images/socialMediaIcons/GitHub-Mark-Light-120px-plus.png";
        activateDarkMode();
    }
}

function toggleScrollToTopButton(){
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        $("pageNavButton").style.display = "inline-block";
    }
    else {
        $("pageNavButton").style.display = "none";
    }
}
      
      // When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    toggleScrollToTopButton();
}
// Author: Chaz Peterson
// Alias:  CheTranqui

function $(id) { return document.getElementById(id); }

function socialMediaDropdownExpander() {
    event.preventDefault();
    $("socialMediaDropdownDiv").classList.toggle("show");
}

//click anywhere to collapse the social media dropdown
window.onclick = function (event) {
    if (!event.target.matches(".socialMediaLinkText")) {
        $("socialMediaDropdownDiv").classList.remove("show");
    }
}
// Author: Chaz Peterson
// Alias:  CheTranqui

function $(id) { return document.getElementById(id); }

function socialMediaDropdownExpander() {
    event.preventDefault();
    $("socialMediaDropdownDiv").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches(".socialMediaLinkText")) {
        $("socialMediaDropdownDiv").classList.remove("show");
    }
}


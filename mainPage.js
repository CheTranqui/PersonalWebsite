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
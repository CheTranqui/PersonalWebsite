// JavaScript source code
// Author: Chaz Peterson
// Alias: CheTranqui
// Goal: manage project switching as a result of buttons and scrolling

function $(id) { return document.getElementById(id); }

const track = $('carouselTrack');
const slide0 = [];
const slide1 = [];
const slide2 = [];
const slides = [slide0, slide1, slide2];

function getProjects() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            createSlides(JSON.parse(this.responseText));
        }
    };
    xmlhttp.open("GET", "projects.json", true);
    xmlhttp.send();
}

function createSlides(JSONSlides) {
    slide0.projectTitle = JSONSlides[0]["projectTitle"];
    console.log(slide0.projectTitle);
}
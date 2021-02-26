// JavaScript source code
// Author: Chaz Peterson
// Alias: CheTranqui
// Goal: manage project switching as a result of buttons and scrolling

function $(id) { return document.getElementById(id); }

window.onload = function(){
    getProjects();
}

const track = $('carouselTrack');
const slides = [];
const nextButton = $('carouselRightButton');
const previousButton = $('carouselLeftButton');
const carouselNav = $('carouselNav');
const carouselIndicators = Array.from(carouselNav.children);
const slideWidth = $('projectContainer').width;


function getProjects() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let projectsArray = JSON.parse(this.responseText);
            createSlides(projectsArray);
        }
    };
    xmlhttp.open("GET", "projects.json", true);
    xmlhttp.send();
}

function createSlides(JSONSlides) {
    for (let i = 0; i < 2; i++) {
        console.log(JSONSlides);
        let slide = [];
        slide.projectTitle = JSONSlides["Projects"][i].projectTitle;
        slide.projectImageFile = JSONSlides["Projects"][i].projectImageFile;
        slide.projectDescription = JSONSlides["Projects"][i].projectDescription;
        slide.projectLesson = JSONSlides["Projects"][i].projectLesson;
        console.log(slide);
        let links = [];
        if (JSONSlides["Projects"][i].projectLinkToGithub != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToGithub;
            myLink.text = "Github";
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToYouTube != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToYouTube;
            myLink.text = "YouTube";
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToSteam != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToSteam;
            myLink.text = "Steam";
        }
        console.log(links);
        if (JSONSlides["Projects"][i].projectLinkToDownload != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToDownload;
            myLink.text = "Download";
        }
        if (JSONSlides["Projects"][i].projectLinkToGithubIO != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToGithubIO;
            myLink.text = "GithubIO";
        }
        if (JSONSlides["Projects"][i].projectLinkToWebsite != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToWebsite;
            myLink.text = "Website";
        }
        if (links.length >= 3) {
            slide.projectLink3 = links[2].link;
            slide.projectLink3Text = links[2].text;
        }
        if (links.length >= 2) {
            slide.projectLink2 = links[1].link;
            slide.projectLink2Text = links[1].text;
        }
        slide.projectLink1 = links[0].link;
        slide.projectLink1Text = links[0].text;
        slides.push(slide);
        getImage(slide);
    }

    function getImage(slide) {
        fetch('images/projectImages/' + slide.projectImageFile)
            .then(response => {
                slide.projectImage = response;
            }).catch(error => {
                return console.log(error)
            });
    }
    
    //With only 3 or 4 slides, all images should be preloaded.
    //if we go over that, keep only the current and 1 or 2 to each side loaded.
}


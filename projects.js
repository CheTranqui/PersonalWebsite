// JavaScript source code
// Author: Chaz Peterson
// Alias: CheTranqui
// Goal: manage project switching as a result of buttons and scrolling

function $(id) { return document.getElementById(id); }

window.onload = function () {
    //once page is loaded, get project info separately from server
    getProjects();
    //activate carousel functions
    $('carouselRightButton').addEventListener("click", getNextSlide);
    $('carouselLeftButton').addEventListener("click", getPreviousSlide);
}

const carouselNav = $('carouselNav');
const track = $('carouselTrack');
const slides = [];
const carouselIndicators = [$('bottomButton1'), $('bottomButton2'), $('bottomButton3')];
//const slideWidth = $('projectContainer').width;

let currentSlide = 0;

//getProjects acquires the project text/info from the JSON
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

//parses the projectsArray into a slide object
function createSlides(JSONSlides) {
    for (let i = 0; i < JSONSlides["Projects"].length; i++) {
        let slide = [];
        slide.projectTitle = JSONSlides["Projects"][i].projectTitle;
        slide.projectImageFile = JSONSlides["Projects"][i].projectImageFile;
        slide.projectDescription = JSONSlides["Projects"][i].projectDescription;
        slide.projectLesson = JSONSlides["Projects"][i].projectLesson;
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
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToDownload != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToDownload;
            myLink.text = "Download";
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToGithubIO != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToGithubIO;
            myLink.text = "GithubIO";
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToWebsite != null) {
            let myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToWebsite;
            myLink.text = "Website";
            links.push(myLink);
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
}

    //gets the slide's image from the server
    function getImage(slide) {
        fetch('images/projectImages/' + slide.projectImageFile)
            .then(response => response.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                const image = new Image();
                image.src = objectURL;
                image.classList.add("projectImage");
                slide.projectImage = image;
            }).catch(error => {
                return console.log(error);
            });
    }
    
//these two functions manage the slide number to be loaded
    function getPreviousSlide() {
        if (currentSlide == 0) {
            currentSlide = (slides.length - 1 );
        }
        else {
            currentSlide--;
        }
        loadSlide(currentSlide);
    }

    function getNextSlide() {
        if (currentSlide == (slides.length - 1)) {
            currentSlide = 0;
        }
        else {
            currentSlide++;
        }
        loadSlide(currentSlide);
    }

    //swaps in the new slide's info
    function loadSlide(slideNumber) {
        $("projectTitle").innerHTML = slides[slideNumber].projectTitle;
        $("projectImage").src = slides[slideNumber].projectImage.src;
        $("projectDescription").innerHTML = slides[slideNumber].projectDescription;
        $("projectLesson").innerHTML = slides[slideNumber].projectLesson;
        $("projectLink1").href = slides[slideNumber].projectLink1;
        $("projectLink1").innerHTML = slides[slideNumber].projectLink1Text;
        if (slides[slideNumber].projectLink2) {
            $("projectLink2").href = slides[slideNumber].projectLink2;
            $("projectLink2").innerHTML = slides[slideNumber].projectLink2Text;
            $("projectLink2").style.display = "block";
        }
        else {
            $("projectLink2").style.display = "none";
        }
        if (slides[slideNumber].projectLink3) {
            $("projectLink3").href = slides[slideNumber].projectLink3;
            $("projectLink3").innerHTML = slides[slideNumber].projectLink3Text;
            $("projectLink3").style.display = "block";
        }
        else {
            $("projectLink3").style.display = "none";
        }
    }


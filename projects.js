// JavaScript source code
// Author: Chaz Peterson
// Alias: CheTranqui
// Goal: manage project switching as a result of buttons and scrolling

function $(id) { return document.getElementById(id); }

window.onload = function () {
    getProjects();
    $('carouselRightButton').addEventListener("click", getNextSlide);
    $('carouselLeftButton').addEventListener("click", getPreviousSlide);
}

const carouselNav = $('carouselNav');
const track = $('carouselTrack');
const slides = [];
const carouselIndicators = [$('bottomButton1'), $('bottomButton2'), $('bottomButton3')];
//const slideWidth = $('projectContainer').width;

let currentSlide = 0;

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
        }
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
}

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
    

    function getPreviousSlide() {
        if (currentSlide == 0) {
            currentSlide = slides.length;
        }
        else {
            currentSlide--;
        }
        loadSlide(currentSlide);
    }

    function getNextSlide() {
        if (currentSlide == slides.length) {
            currentSlide = 0;
        }
        else {
            currentSlide++;
        }
        loadSlide(currentSlide);
    }

    function loadSlide(slide) {
        $("projectTitle").innerHTML = slide.projectTitle;
        $("projectImage").src = slide.projectImage.src;
        $("projectDescription").innerHTML = slide.projectDescription;
        $("projectLesson").innerHTML = slide.projectLesson;
        $("projectLink1").href = slide.projectLink1;
        $("projectLink1").innerHTML = slide.projectLink1Text;
        $("projectLink2").href = slide.projectLink2;
        $("projectLink2").innerHTML = slide.projectLink2Text;
        if (slide.projectLink3) {
            $("projectLink3").href = slide.projectLink3;
            $("projectLink3").innerHTML = slide.projectLink3Text;
            $("projectLink3").style.display = "block";
        }
        else {
            $("projectLink3").style.display = "none";
        }
    }


// JavaScript source code
// Author: Chaz Peterson
// Alias: CheTranqui
// Goal: manage project switching as a result of buttons and scrolling

function $(id) { return document.getElementById(id); }

const track = $('carouselTrack');
const slides = [];

function getProjects() {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const projectsArray = JSON.parse(this.responseText);
            createSlides(projectsArray);
        }
    };
    xmlhttp.open("GET", "projects.json", true);
    xmlhttp.send();
}

function createSlides(JSONSlides) {
    for (const i = 0; i < 3; i++) {
        console.log(JSONSlides);
        const slide = [];
        slide.projectTitle = JSONSlides["Projects"][i].projectTitle;
        slide.projectImage = JSONSlides["Projects"][i].projectImage;
        slide.projectDescription = JSONSlides["Projects"][i].projectDescription;
        slide.projectLesson = JSONSlides["Projects"][i].projectLesson;
        console.log(slide);
        const links = [];
        if (JSONSlides["Projects"][i].projectLinkToGithub != null) {
            const myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToGithub;
            myLink.text = "Github";
            links.push(myLink);
        }
        console.log(links);
        if (JSONSlides["Projects"][i].projectLinkToYouTube != null) {
            const myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToYouTube;
            myLink.text = "YouTube";
            links.push(myLink);
        }
        console.log(links);
        if (JSONSlides["Projects"][i].projectLinkToSteam != null) {
            const myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToSteam;
            myLink.text = "Steam";
            links.push(myLink);
        }
        console.log(links);
        if (JSONSlides["Projects"][i].projectLinkToDownload != null) {
            const myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToDownload;
            myLink.text = "Download";
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToGithubIO != null) {
            const myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToGithubIO;
            myLink.text = "GithubIO";
            links.push(myLink);
        }
        if (JSONSlides["Projects"][i].projectLinkToWebsite != null) {
            const myLink = [];
            myLink.link = JSONSlides["Projects"][i].projectLinkToWebsite;
            myLink.text = "Website";
            links.push(myLink);
        }
        if (links.length() == 3) {
            slide.projectLink3 = links[2].link;
            slide.projectLink3Text = links[2].text;
        }
        if (links.length() >= 2) {
            slide.projectLink2 = links[1].link;
            slide.projectLink2Text = links[1].text;
        }
        slide.projectLink1 = links[0].link;
        slide.projectLink1Text = links[0].text;
    }
}
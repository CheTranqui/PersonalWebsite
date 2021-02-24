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
        if (JSONSlides["Projects"][i].projectToGithub != null) {
            const myLink1 = [];
            myLink1.link = JSONSlides["Projects"][i].projectToGithub;
            myLink1.text = "Github";
            links.push(myLink1);
        }
        if (JSONSlides["Projects"][i].projectToYoutube != null) {
            const myLink2 = [];
            myLink2.link = JSONSlides["Projects"][i].projectToYoutube;
            myLink2.text = "YouTube";
            links.push(myLink2);
        }
        if (JSONSlides["Projects"][i].projectToSteam != null) {
            const myLink3 = [];
            myLink3.link = JSONSlides["Projects"][i].projectToSteam;
            myLink3.text = "Steam";
            links.push(myLink3);
        }
        if (JSONSlides["Projects"][i].projectToDownload != null) {
            const myLink4 = [];
            myLink4.link = JSONSlides["Projects"][i].projectToDownload;
            myLink4.text = "Download";
            links.push(myLink4);
        }
        if (JSONSlides["Projects"][i].projectToGithubIO != null) {
            const myLink5 = [];
            myLink5.link = JSONSlides["Projects"][i].projectToGithubIO;
            myLink5.text = "GithubIO";
            links.push(myLink5);
        }
        if (JSONSlides["Projects"][i].projectToWebsite != null) {
            const myLink6 = [];
            myLink6.link = JSONSlides["Projects"][i].projectToWebsite;
            myLink6.text = "Website";
            links.push(myLink6);
        }
        slide.projectLink1 = links[0].link;
        slide.projectLink1Text = links[0].text;
        slide.projectLink2 = links[1].link;
        slide.projectLink2Text = links[1].text;
        slide.projectLink3 = links[2].link;
        slide.projectLink3Text = links[2].text;
        console.log(slide);
    }
}
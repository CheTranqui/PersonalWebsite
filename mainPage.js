// Author: Chaz Peterson
// Alias:  CheTranqui

function $(id) { return document.getElementById(id); }

const canvas = $("drawingBoard");
const ctx = canvas.getContext("2d");
let rect = canvas.getBoundingClientRect();
let lastMove = 0;

function socialMediaDropdownExpander() {
    event.preventDefault();
    $("socialMediaDropdownDiv").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches(".socialMediaLinkText")) {
        $("socialMediaDropdownDiv").classList.remove("show");
    }
}

window.onmousemove = function (e) {
    let current = getCurrentTime();
    if (current - lastMove > 100) {
        lastMove = current;
        drawingLoop(e);
    }
}

function getCurrentTime() {
    return Date.now();
}

function drawingLoop(e) {
    clearCanvas();
    drawLines(getMouseCoord(e));
}


function getMouseCoord(e) {
    rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    let coord = { X: e.clientX - rect.left, Y: e.clientY - rect.top };
    return coord;
}

function drawLines(coord) {
    rect = canvas.getBoundingClientRect();
    if (coord.X > 0 && coord.X < rect.width
        && coord.Y > 0 && coord.Y < rect.height) {
        for (let i = 0; i < 5; i++) {
            let offset = 10 * i;
            ctx.strokeStyle = "#38a2c2";
            ctx.lineWidth = 1;
            ctx.globalCompositeOperation = 'destination-over';
            ctx.moveTo(0, 0 + offset);
            ctx.quadraticCurveTo(coord.X, coord.Y + 50, rect.width, 0 + offset);
            ctx.stroke();
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


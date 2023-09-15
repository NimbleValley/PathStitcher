const canvas = document.getElementById("field-canvas");
const ctx = canvas.getContext("2d");

window.addEventListener('resize', setCanvasDimensions, false);

fieldImage = new Image();
fieldImage.src = 'field23.png';
fieldImage.onload = () => setCanvasDimensions();

const robotTextX = document.getElementById("robot-x-text");
const robotTextY = document.getElementById("robot-y-text");

const coordInputX = document.getElementById("coord-x-input");
const coordInputY = document.getElementById("coord-y-input");

var SCALE = canvas.width / 649;

var lastActive = "";

var ROBOT = {
    length: 30,
    width: 35,
    startX: 50,
    startY: 50,
    posX: 0,
    posY: 0
}

if (localStorage.getItem("robot-length") != null && localStorage.getItem("robot-width") != null) {
    ROBOT.length = localStorage.getItem("robot-length");
    ROBOT.width = localStorage.getItem("robot-width");
}

var initialMouse = {
    x: 0,
    y: 0
}

// Window resize
function setCanvasDimensions() {
    if (window.innerHeight > window.innerWidth) {
        canvas.height = window.innerHeight * 0.825;
        canvas.height = window.innerHeight * 0.825 / 2.06337;
    } else {
        canvas.height = window.innerWidth * 0.825 / 2.06337;
        canvas.width = window.innerWidth * 0.825;
        if (window.innerWidth * 0.825 / 2.06337 > window.innerHeight * (0.85)) {
            canvas.height = window.innerHeight * 0.85;
            canvas.width = window.innerHeight * (0.85 * 2.06337);
        }
    }
    SCALE = canvas.width / 649;
    drawCanvas();
}

function drawCanvas() {
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fieldImage, 0, 0, canvas.width, canvas.height);

    // Draw robot
    ctx.fillStyle = "orange";
    ctx.fillRect(ROBOT.posX * SCALE, ROBOT.posY * SCALE, ROBOT.length * SCALE, ROBOT.width * SCALE);

    robotTextX.innerText = `Robot X: ${Math.round(ROBOT.posX * 0.0254 * 1000) / 1000}`;
    robotTextY.innerText = `Robot Y: ${Math.round(ROBOT.posY * 0.0254 * 1000) / 1000}`;
}

function update() {

}

function startDrag(event) {
    //console.log(Math.abs((event.clientY) / canvas.height * 319 - (ROBOT.posY + (ROBOT.width / 2))));

    // Robot dragged
    if (Math.abs((window.innerWidth - event.clientX) / canvas.width * 649 - (649 - (ROBOT.posX + (ROBOT.length / 2)))) < ROBOT.length / 2 && Math.abs((event.clientY) / canvas.height * 319 - (ROBOT.posY + (ROBOT.width / 2))) < ROBOT.width / 2) {
        initialMouse.x = (window.innerWidth - event.clientX) / canvas.width * 649 - (649 - (ROBOT.posX + (ROBOT.length / 2)));
        initialMouse.y = (event.clientY) / canvas.height * 319 - (ROBOT.posY + (ROBOT.width / 2));

        lastActive = "ROBOT";

        document.onmousemove = doRobotDrag;
    }

    drawCanvas();
}

function doRobotDrag(event) {
    ROBOT.posX = 649 - (((window.innerWidth - event.clientX) / canvas.width) * 649) - ROBOT.length / 2 + initialMouse.x;
    ROBOT.posY = ((((event.clientY) / canvas.height) * 319) - ROBOT.width / 2) - initialMouse.y;

    coordInputX.value = Math.round(ROBOT.posX * 0.0254 * 1000) / 1000;
    coordInputY.value = Math.round(ROBOT.posY * 0.0254 * 1000) / 1000;

    drawCanvas();
}

function removeDrag() {
    document.onmousemove = "";
}

requestAnimationFrame(update);

function setRobotSize() {
    ROBOT.length = prompt("What is robot length, or x-value? (inches)");
    ROBOT.width = prompt("What is robot width, or y-value? (inches)");

    drawCanvas();

    localStorage.setItem("robot-length", ROBOT.length);
    localStorage.setItem("robot-width", ROBOT.width);
}

function setCoords() {
    if (lastActive == "ROBOT") {
        ROBOT.posX = coordInputX.value / 0.0254;
        ROBOT.posY = coordInputY.value / 0.0254;
        drawCanvas();
    }
}
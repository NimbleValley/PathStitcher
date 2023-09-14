const canvas = document.getElementById("field-canvas");
const ctx = canvas.getContext("2d");

window.addEventListener('resize', setCanvasDimensions, false);

fieldImage = new Image();
fieldImage.src = 'field23.png';
fieldImage.onload = () => setCanvasDimensions();

var SCALE = canvas.width / 649;

var ROBOT = {
    length: 30,
    width: 35,
    startX: 50,
    startY: 50,
    posX: 0,
    posY: 50
}

// Window resize
function setCanvasDimensions() {
    if (window.innerHeight > window.innerWidth) {
        canvas.height = window.innerHeight * 0.825;
        canvas.height = window.innerHeight * 0.825 / 2.06337;;
    } else {
        canvas.height = window.innerWidth * 0.825 / 2.06337;
        canvas.width = window.innerWidth * 0.825;
    }
    SCALE = canvas.width / 649;
    drawCanvas();
}

function drawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fieldImage, 0, 0, canvas.width, canvas.height);
    
    // Draw robot
    ctx.fillStyle = "orange";
    ctx.fillRect(ROBOT.posX * SCALE, ROBOT.posY * SCALE, ROBOT.length * SCALE, ROBOT.width * SCALE);
}

function startDrag(event) {
    console.log((window.innerWidth - event.clientX) / canvas.width);
    ROBOT.posX = 649-(((window.innerWidth - event.clientX) / canvas.width) * 649);
    ROBOT.posY = (((event.clientY) / canvas.height) * 319);
    drawCanvas();
}
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext('2d');

let radius = 50;
let x = canvas.width - 10;
let y = canvas.height - 10;
let speed = 10;
let score = 0;
let gameOver = false;
let gameStart = false;

let pR = 10;
let pX = 0;
let pY = 0;
let pSpeed = 1;

let downPressed = false;
let upPressed = false;
let leftPressed = false;
let rightPressed = false;
let mousePressed = false;

//Game Loop
function drawGame(){
    if (!gameOver && gameStart){
        clearScreen();
        inputs();
        boundryCheck();
        drawGreenBlob();
        drawScore();
        score += 1/60;
    }
    else if(!gameStart){
        gameStartScreen();
        //mouseDown();
        inputs();
    }
    else{
        gameOverScreen();
    }
}


function boundryCheck(){
    //top bound
    if(y < radius) {
        y = radius;
    }

    //bottom bound
    if (y > canvas.height - radius) {
        y = canvas.height - radius;
    }

    //left bound
    if(x < radius) {
        x = radius;
    }

    //right bound
    if (x > canvas.width - radius) {
        x = canvas.width - radius;
    }
}

//changes values after key presses
function inputs(){
    if(downPressed){
        y += speed;
    }
    if(upPressed){
        y -= speed;
    }
    if(leftPressed){
        x -= speed;
    }
    if(rightPressed){
        x += speed;
    }
}

//draws the character
function drawGreenBlob(){
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill();
}

//draws and updates the score
function drawScore(){
    ctx.fillStyle = "blue";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + parseInt(score), 10, 50);

    if (pX <= x + radius && pX >= x - radius && pY <= y + radius && pY >= y - radius){
        gameOver = true;
    }
}

//resets game screen
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
    drawPellets();
}

//resets game screen
function gameOverScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.fillStyle = "blue";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + parseInt(score), canvas.clientWidth / 2 - 50, canvas.height / 2);
    ctx.fillText("complete the google form", canvas.clientWidth / 2 - 150, canvas.height / 2 + 40);
}

//document.body.addEventListener('mousedown', mouseDown);

// function mouseDown(event){
//     if(event.onmousedown){
//         mousePressed = true;
//     }
// }

function gameStartScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.fillStyle = "blue";
    ctx.font = "30px Arial";
    ctx.fillText("Listen to instructions", canvas.clientWidth / 2 - 150, canvas.height / 2);
    if (x != canvas.width - 10 || y != canvas.height - 10){
        gameStart = true;
    }
}

document.body.addEventListener('keydown', keyDown);
document.body.addEventListener('keyup', keyUp);

//listening for key being pressed
function keyDown(event) {

    //down
    if(event.keyCode == 40){
        downPressed = true;
    }

    //up
    if(event.keyCode == 38){
        upPressed = true;
    }

    //left
    if(event.keyCode == 37){
       leftPressed = true;
    }

    //right
    if(event.keyCode == 39){
        rightPressed = true;
    }
}

//listening for key being released
function keyUp(event) {
    //down
    if(event.keyCode == 40){
        downPressed = false;
    }

    //up
    if(event.keyCode == 38){
        upPressed = false;
    }

    //left
    if(event.keyCode == 37){
        leftPressed = false;
     }

    //right
    if(event.keyCode == 39){
        rightPressed = false;
    }
}

//dunction that draws the pellets to the screen
//does not work; need to make an array that holds each pellet's data
function drawPellets(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(pX + pR, pY + pR, pR, 0, Math.PI * 2);
        ctx.fill();


        //modifications are here for some reason idk why
        if (score <= 50){
            pSpeed = score / 10 + 1;
        }

        if (score >= 80 && score <= 110){
            speed -= .1/60
        }
        

        if(pX > x){
            pX -= pSpeed;
        }
        else{
            pX += pSpeed;
        }

        if(pY > y){
            pY -= pSpeed;
        }
        else{
            pY += pSpeed;
        }
}

//interval set to 60 times per second in order to ensure no differnce between computers
setInterval(drawGame, 1000/60);
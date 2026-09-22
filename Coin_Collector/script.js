var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var actorX = 300;
var actorY = 200;
var coinX = Math.random() * (canvas.width - 50);
var coinY = Math.random() * (canvas.height - 50);
var moveActorX = 0;
var moveActorY = 0;
var score = 0;

function drawActor(){
    // Update Position
    actorX += moveActorX;
    actorY += moveActorY;

    if (actorX < 0 - 120) actorX = - 120;
    if (actorX > 640 - 180) actorX = 640 - 180;    
    if (actorY < 0 - 40) actorY = - 40;                  
    if (actorY > 480 - 120) actorY = 480 - 120;

    ctx.drawImage(actor, actorX, actorY, 300, 150);
}

function drawCoin(){
    ctx.drawImage(coin, coinX, coinY, 50, 50);
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}


function checkCollision() {
  // Check if actor is within the bounds of the coin
  if (
    actorX < coinX + 75 &&       // Check if the right side of the actor is past the left side of the coin
    actorX + 150 > coinX &&       // Check if the left side of the actor is before the right side of the coin
    actorY < coinY + 75 &&       // Check if the bottom side of the actor is below the top side of the coin
    actorY + 150 > coinY          // Check if the top side of the actor is above the bottom side of the coin
  ) {
    // Collision detected if all four conditions are true
    
    // Move coin to a new random position
    coinX = Math.random() * (canvas.width - 50);
    coinY = Math.random() * (canvas.height - 50);
    score += 1
  }
}

document.onkeydown = keyPressed;
document.onkeyup = keyReleased;

function keyPressed(e) {
  var k = e.keyCode;
  if (k == 37 || k == 65) { moveActorX = -5; } // Left arrow or A
  if (k == 39 || k == 68) { moveActorX = 5; }  // Right arrow or D
  if (k == 38 || k == 87) { moveActorY = -5; } // Up arrow or W
  if (k == 40 || k == 83) { moveActorY = 5; }  // Down arrow or S
}

function keyReleased(e) {
  var k = e.keyCode;
  if (k == 37 || k == 39 || k == 65 || k == 68) { moveActorX = 0; } // Stop horizontal movement
  if (k == 38 || k == 40 || k == 87 || k == 83) { moveActorY = 0; } // Stop vertical movement
}

function mainLoop(){
    ctx.clearRect(0, 0, 640, 480);
    drawActor();
    drawCoin();
    drawScore();
    checkCollision();
    requestAnimationFrame(mainLoop);
}

mainLoop();
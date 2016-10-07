//----------------------------------------
// Create a sprite and set up event handlers
//
// depends on sprite.js
//----------------------------------------

//---------
// Make Mario!
//---------
var mario;

function init() {
  // this sprite has 7 cels, each 65px wide
  mario = new Sprite("myMario", "mario", 60, 7);
  mario.x = 200;
  mario.y = 80;
  mario.update();   // draw him once

  // Event Handlers
  $(".changeDirection").on("click", changeDirection);
  $(".action").on("click", startOrStop);

  drawSceneLoop();
}

// toggle mario
function startOrStop() {
  if (mario.running) {
    mario.stop();
    $(".action").text("Go!");
  } else {
    mario.start();
    $(".action").text("Stop!");
  }
}

function changeDirection() {
  mario.changeDirection();
}


// render the scene and take real time into account so things dont go too fast
var lastTime;
function drawSceneLoop( time ) {
  mario.update( time - lastTime );
  lastTime = time;

  window.requestAnimationFrame( drawSceneLoop );
}


// wait for page to load, then start up animation
$(document).ready( init );

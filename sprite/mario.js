// mario's directions
var x = 100, y =0;
var direction = 1;


// step through the animation cels
var cel = 0;
var numCels = 6;
var celWidth = 256;
var distancePerStep = 10;

function moveMario() {
  cel = (cel+1) % numCels;
  $(".mario").css("background-position", cel*-celWidth +"px 0");
 // console.log( direction )
  x += distancePerStep * direction;

 $(".mario").css("left", x + "px");
}


function changeDirection() {
  console.log("click!");
  direction = -direction;
   $(".mario").css("transform", "scaleX(" + direction + ")");
}


// infinite drawing loop
function drawScene() {
  moveMario();
  window.requestAnimationFrame( drawScene );
}


// After page is loaded, add click handlers
$(document).ready(function() {
  // Event Handlers
  $(".go").on("click", drawScene );
  $(".action").on("click", changeDirection );
});

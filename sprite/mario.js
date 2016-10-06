// mario's directions
var x = 200, y =0;
var direction = 1;


// step through the animation cels
var cel = 0;

function moveMario() {
  cel = (cel+1)%7;
  $(".mario").css("background-position", cel*-60 +"px 0");
 // console.log( direction )
  x+=10*direction;

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


// Event Handlers
$(".go").on("click", drawScene );
$(".action").on("click", changeDirection );

// ES6 Class to draw an animation sprite

class Sprite {

  /**
   * @param id is the <div> id to use for this sprite
   * @param className css class for this sprite
   * @param celWidth with of each picture in the sprite image
   * @param numCels number of pictures in the sprite image
   */
  constructor( id, className, celWidth, numCels) {
    this.width = celWidth;
    this.direction = 1; // 1 = right, -1 = left

    this.sprite = document.getElementById( id );
    this.sprite.className = className;
    this.css = this.sprite.style;

    this.cels = numCels;
    this.cel = 0;
    this.running = false;
  }

  start() {
    this.running = true;
  }
  stop() {
    this.running = false;
  }

  /**
   *  move the sprite in the current direction
   * @param elapsedTime since last draw
   */
  update( elapsedTime ) {
    if (this.running) {
      var distance = elapsedTime / 5;
      this.x += distance * this.direction;
      this.cel = (this.cel + 1) % 7;
    }

    // update sprite css, ex: "background-position: -120px 0px"
    this.css["background-position"] = this.cel * -this.width + "px 0";

    // update position css
    this.css.left = this.x + "px";
    this.css.top  = this.y + "px";
  }

  changeDirection() {
    this.direction = -this.direction;
    // flip picture of mario
    this.css.transform = "scaleX(" + this.direction + ")";
  }
};

//Create a Pixi Application
let app = new PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
PIXI.loader
  .add("./bunny.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  console.log("Setup called");
  //Create the cat sprite
  let cat = new PIXI.Sprite(PIXI.loader.resources["./bunny.png"].texture);
  cat.interactive = true;
  cat.buttonMode = true;
  cat.anchor.set(0.5);
  cat.scale.set(0.5);
  cat
    .on('pointerdown',onDragStart)
    .on('pointerup',onDragEnd)
    .on('pointerupoutside',onDragEnd)
    .on('pointermove',onDragMove)
  //Add the cat to the stage
  app.stage.addChild(cat);
  var width = document.getElementById("stage").width;
  console.log("canvas width " + width )

}

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
  }
}

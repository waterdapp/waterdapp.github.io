let canvas;
let value = 0;
let img;
function preload() {
  img = loadImage('../src/branding/logo.png');
}

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.mousePressed(clearCanvas)
  img.loadPixels();
  

}

function draw() {
  background(0, 160, 250);
if (value ===0) {
  image(img,window.innerWidth/ 2 - 320 , window.innerHeight / 2 - 320, 640, 640);
  }
  

}
function clearCanvas() {
  if (value === 0) {
  
  value = 1
  } 
}



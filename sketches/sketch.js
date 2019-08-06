let gradient = 0

let x = window.innerWidth - window.innerWidth 
let y = window.innerHeight / 2

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
  var colour = [0, gradient, gradient]
  background(colour[0], colour[1], colour[2]);
if (value === 0) {
  image(img,window.innerWidth/ 2 - 320 , window.innerHeight / 2 - 320, 640, 640);
  }
if(value === 1){

rectMode(CENTER)
noStroke()
fill(232, 215, 28)
ellipse(x, y, 200, 200)

if (x >=  window.innerWidth / 2) {
  x = x + 02
  y = y + 0.5
} else{
x = x + 0.2
y = y + -0.05}


//x = x + -0.5
//y = y + 02





}
  

}










function clearCanvas() {
  if (value === 0) {
  
  value = 1
  } 
}



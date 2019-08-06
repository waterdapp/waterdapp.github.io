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
  canvas.parent('sketchHolder')
  img.loadPixels();
  
  canvas.mousePressed(() => {
    if(value === 0) {
      value = 1;
      newSlider(40, canvas.height - 50);
      newProgress(-100, canvas.height / 2, '100');
      newProgress(canvas.width - 150, canvas.height / 2, '100');
    }
  })
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
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
  background(0, 160, 250);
  if (value === 0) {
    image(img, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
    return;
  }
  // Full game drawing/logic
  


}

function newSlider(x, y) {
  var slider;
  slider = createSlider(0, 2, 1);
  slider.position(x, y);
  slider.style('width', '80px');
  slider.parent('sketchHolder');
  slider.class('speedSlider');
  return slider;
}

function newProgress(x, y, max) {
  var progress = createElement('progress', '100');
  progress.parent('sketchHolder');
  progress.position(x, y)
  progress.class('progress');
  progress.value('50');
  progress.attribute('max', max)
  return progress;
}

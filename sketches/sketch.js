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
      newSlider(10, 50);
      newProgress(200, 50, '100');
    }
  })
}

function draw() {
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
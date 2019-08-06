let angle = 0



let sunPosition = {
  x: 0,
  y: window.innerHeight,
}
let moonPosition = {
  x: window.innerWidth,
  y: window.innerHeight,
}

let canvas;
let value = 0;
let img;
let moon;
let sun;

function preload() {
  img = loadImage('../src/branding/logo.png');
  sun = loadImage('../src/assets/sun/Sun1.png');
  moon = loadImage('../src/assets/moon/moon1.png')
};

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight); //origional blue rgb values are 0, 160, 250
  canvas.parent('sketchHolder')
  img.loadPixels();
  sun.loadPixels();
  moon.loadPixels();
  
  canvas.mousePressed(() => {
    if (value === 0) {
      value = 1;
      newSlider(40, window.innerHeight - 50);
      newProgress(-100, window.innerHeight / 2, '100');
      newProgress(window.innerWidth - 150, window.innerHeight / 2, '100');
    }
  })
}

function draw() {
 
  if (value === 0) {
    image(img, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
  }
  if (value === 1) {
    var colour = [0, 160 - sunPosition.y / 5, 250 - sunPosition.y / 5]
    background(colour[0], colour[1], colour[2]);
    
    image(sun, sunPosition.x - 250, sunPosition.y - 250, 500, 500)
    image(moon, moonPosition.x - 250, moonPosition.y - 250, 500, 500)
    
    let fps = frameRate();
    fill(255);
    stroke(255);
    text("FPS: " + fps.toFixed(2), 10, height - 10);
  
      angle += 1

    //maths for daylight cycle
    sunPosition.x = cos(radians(angle)) * window.innerWidth / 2 + window.innerWidth / 2
    sunPosition.y = sin(radians(angle)) * window.innerHeight + window.innerHeight

    moonPosition.x = cos(radians(angle - 180)) * window.innerWidth / 2 + window.innerWidth / 2
    moonPosition.y = sin(radians(angle - 180)) * window.innerHeight + window.innerHeight

  }
}

function clearCanvas() {
  if (value === 0) {

    value = 1
  }
  background(colour[0], colour[1], colour[2]);
  if (value === 0) {
    image(img, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
    return;
  }
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
let gradient = 250

let x = window.innerWidth - window.innerWidth;
let y = window.innerHeight / 2;

let canvas;
let value = 0;
let img;
let moon;
let sun;

let hydrationProgress, healthProgress;

function preload() {
  img = loadImage('../src/branding/logo.png');
  sun = loadImage('../src/assets/sun/sun1.png');
  pressStart2P = loadFont('src/fonts/PressStart2P.ttf')
}

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight); //origional blue rgb values are 0, 160, 250
  canvas.parent('sketchHolder')
  img.loadPixels();
  sun.loadPixels();

  canvas.mousePressed(() => {
    if (value === 0) {
      value = 1;
      newSlider(40, canvas.height - 50);
      healthProgress = newProgress(-100, canvas.height / 2, '100', 'healthProgress');
      hydrationProgress = newProgress(canvas.width - 150, canvas.height / 2, '100', 'hydrationProgress');
      console.log(hydrationProgress, healthProgress);
    }
  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  var colour = [0, 160, gradient]
  background(colour[0], colour[1], colour[2]);
  if (value === 0) {
    image(img, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
  }
  if (value === 1) {
    // Game draw loop
    // Every other second run this
    if (frameCount % 60 === 0) {

      hydrationProgress.value(hydrationProgress.value() - 1);
    }


    // Sun logic
    fill(232, 215, 28)
    image(sun, x - 250, y - 250, 500, 500)

    if (x >= window.innerWidth / 2) {
      x = x + 0.2
      y = y + 0.05
    } else {
      x = x + 0.2
      y = y + -0.05
    }

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

function newProgress(x, y, max, id) {
  var progress = createElement('progress', '100');
  progress.parent('sketchHolder');
  progress.position(x, y)
  progress.class('progress');
  progress.value('100');
  progress.attribute('max', max);
  progress.id(id)
  return progress;
}
let seedImg, seedImgWidth, seedImgHeight, seedImgPath;
let startButton;
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
  noSmooth();
  canvas.parent('sketchHolder')
  img.loadPixels();
  
  canvas.mousePressed(() => {
    if(value === 0) {
      value = 1;
      newSlider(10, 50);
      newProgress(200, 50, '100');
    }
  })
  // colour the background
  background(0, 160, 250);

  // Example trigger for seed display (we can replace button for actual trigger such as 
  //   clicking on the logo).
  startButton = createButton('Create seed');
  startButton.position(40, 40);
  startButton.size(50, 50);
  startButton.mousePressed(createSeed);
}

let randNum;
function createSeed() {
  randNum = (Math.floor(Math.random() * 8) + 1).toString();
  seedImgPath = '../src/assets/seeds/seed'.concat(randNum, '.png');
  
  seedImgWidth = 200;
  seedImgHeight = 200;

  loadImage(seedImgPath, seedImg => {
    image(seedImg, window.innerWidth/2 - seedImgWidth/2, window.innerHeight*0.75 - seedImgHeight/2, seedImgWidth, seedImgHeight);
  });

  //Remove button so event can only happen once
  startButton.remove();
  
}

function draw() {
  var colour = [0, gradient, gradient]
  background(colour[0], colour[1], colour[2]);
  if (value === 0) {
    image(img,window.innerWidth/ 2 - 320 , window.innerHeight / 2 - 320, 640, 640);
  }
  if(value === 1) {
    rectMode(CENTER)
    noStroke()
    fill(232, 215, 28)
    ellipse(x, y, 200, 200)

    if (x >=  window.innerWidth / 2) {
      x = x + 02
      y = y + 0.5
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

function newProgress(x, y, max) {
  var progress = createElement('progress', '100');
  progress.parent('sketchHolder');
  progress.position(x, y)
  progress.class('progress');
  progress.value('50');
  progress.attribute('max', max)
  return progress;
}
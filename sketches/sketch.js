let seedImg, seedImgWidth, seedImgHeight, seedImgPath;
let startButton;
let gradient = 0;

let sunx = 0; 
let suny = window.innerHeight / 2

let canvas;
let isLogoVisible = true;
let logoImg;

function preload() {
  logoImg = loadImage('../src/branding/logo.png');
  seedImg = loadSeed();
}

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  noSmooth();
  canvas.parent('sketchHolder')
  logoImg.loadPixels();
  
  canvas.mousePressed(() => {
    if(isLogoVisible) {
      isLogoVisible = !(isLogoVisible);
      newSlider(10, 50);
      newProgress(200, 50, '100'); 
      drawSeed();
    }
  })
}

let randNum;
seedImgWidth = 200;
seedImgHeight = 200;
function loadSeed() {
  console.log("Working");
  randNum = (Math.floor(Math.random() * 8) + 1).toString();
  seedImgPath = '../src/assets/seeds/seed'.concat(randNum, '.png');

  return loadImage(seedImgPath);
}
function drawSeed() {
  image(seedImg, window.innerWidth/2 - seedImgWidth/2, window.innerHeight*0.75 - seedImgHeight/2, seedImgWidth, seedImgHeight);
}

function draw() {
  var colour = [0, gradient, gradient]
  background(colour[0], colour[1], colour[2]);
  if (isLogoVisible) {
    image(logoImg,window.innerWidth/ 2 - 320 , window.innerHeight / 2 - 320, 640, 640);
  }
  if (!(isLogoVisible)) {
    rectMode(CENTER)
    noStroke()
    fill(232, 215, 28)
    ellipse(sunx, suny, 200, 200)

    if (sunx >=  window.innerWidth / 2) {
      sunx = sunx + 02
      suny = suny + 0.5
    } else {
      sunx = sunx + 0.2
      suny = suny + -0.05
    }
    drawSeed();
  }
}
function clearCanvas() {
  if (isLogoVisible) {
    isLogoVisible = !(isLogoVisible);
  } 
  if (!(isLogoVisible)) {
    image(logoImg, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
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
let seedImg, seedImgWidth, seedImgHeight, seedImgPath;
let startButton;
let gradient = 250;

let x = window.innerWidth - window.innerWidth;
let y = window.innerHeight / 2;

let canvas;
let value = 0;
let logoImg;
let moon;

let sunImg;
let sunx = 0; 
let suny = window.innerHeight / 2
let isLogoVisible = true;

let hydrationProgress, healthProgress;

function preload() {
  logoImg = loadImage('../src/branding/logo.png');
  sun = loadImage('../src/assets/sun/sun1.png');
  pressStart2P = loadFont('src/fonts/PressStart2P.ttf')
  seedImg = loadSeed();
  sunImg = loadImage('../src/assets/sun/sun1.png');
}

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight); //origional blue rgb values are 0, 160, 250
  noSmooth();
  canvas.parent('sketchHolder')
  logoImg.loadPixels();
  sunImg.loadPixels();

  canvas.mousePressed(() => {
    if (isLogoVisible) {
      isLogoVisible = !(isLogoVisible);
      newSlider(40, canvas.height - 50);
      healthProgress = newProgress(-100, canvas.height / 2, '100', 'healthProgress');
      hydrationProgress = newProgress(canvas.width - 150, canvas.height / 2, '100', 'hydrationProgress');
      drawSeed();
    }
  })
}

let randNum;
seedImgWidth = 200;
seedImgHeight = 200;

function loadSeed() {
  randNum = (Math.floor(Math.random() * 8) + 1).toString();
  seedImgPath = '../src/assets/seeds/seed'.concat(randNum, '.png');

  return loadImage(seedImgPath);
}

function drawSeed() {
  image(seedImg, window.innerWidth/2 - seedImgWidth/2, window.innerHeight*0.75 - seedImgHeight/2, seedImgWidth, seedImgHeight);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  var colour = [0, 160, gradient]
  background(colour[0], colour[1], colour[2]);
  if (isLogoVisible) {
    image(logoImg, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
  }
  if (!(isLogoVisible)) {
    // Game draw loop
    // Every other second run this
    if (frameCount % 60 === 0) {

      hydrationProgress.value(hydrationProgress.value() - 1);
    }


    rectMode(CENTER)
    noStroke()

    fill(232, 215, 28)
    image(sunImg, sunx - 250, suny - 250, 500, 500)

    // sun logic
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

function newProgress(x, y, max, id) {
  var progress = createElement('progress', '100');
  progress.parent('sketchHolder');
  progress.position(x, y)
  progress.class('progress');
  progress.value('100');
  progress.attribute('max', max);
  progress.id(id);
  return progress;
}
//import { rejects } from "assert";

let angle = 180
let daySpeed = 0.1;
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
let seedImg, seedImgWidth = seedImgWidthOriginal = 250, seedImgHeight = seedImgHeightOriginal = 250, seedImgPath;
let plantMaterial, plantMaterialPath;

let randNum;
let isLogoVisible = true;
let hydrationProgress, healthProgress;
let speedSlider;
let sliderText;
let bob = 0

let angleSlider, treeAngle; 
let growthValue = 0, growthSpeed = 0;
let plantThickness = 8;

let gameTime = 0;

function preload() {
  img = loadImage('../src/branding/logo.png');
  sun = loadImage('../src/assets/sun/Sun1.png');
  moon = loadImage('../src/assets/moon/moon1.png')
  island = loadImage('../src/assets/floatingisland/floatingisland1.png')
  pressStart2P = loadFont('src/fonts/PressStart2P.ttf')
  seedImg = loadSeed();
  plantMaterial = loadPlantMaterial();
};

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight); //origional blue rgb values are 0, 160, 250
  canvas.parent('sketchHolder')
  img.loadPixels();
  sun.loadPixels();
  moon.loadPixels();
  island.loadPixels();
  noSmooth();
  canvas.mousePressed(() => {
    if (isLogoVisible) {
      // Flip the value of logo visible
      isLogoVisible = !(isLogoVisible);

      // Add the time slider
      speedSlider = newSlider(40, canvas.height - 50);
      
      // Add health and hydration progress bars
      healthProgress = newProgress(-100, canvas.height / 2, '100', 'healthProgress');
      hydrationProgress = newProgress(canvas.width - 150, canvas.height / 2, '100', 'hydrationProgress');

      // Setup both bars.
      sliderText = createP('Health');
      sliderText.parent('sketchHolder');
      sliderText.id('healthText');
      sliderText = createP('Hydration');
      sliderText.parent('sketchHolder');
      sliderText.id('hydrationText');
      sliderText = createP('Speed');
      sliderText.parent('sketchHolder');
      sliderText.id('speedText');
    }
  })
}

function draw() {
  if (isLogoVisible) {
    image(img, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
  }
  if (!isLogoVisible) {
    // Every other second run this
    if (frameCount % 60 === 0) {
      hydrationProgress.value(hydrationProgress.value() - 1);
    }
    //increment plant growth state according to speed setting
    if (frameCount % (60 * (2.5 - growthSpeed)) === 0) {
      if (growthValue <= 200) {
        growthValue += 2;
        plantThickness += 1/25;
      }
      // start shrinking seed after certain amount of growth
      if ((growthValue >= 20) && (growthValue <= 80)) {
        seedImgWidth -= 8;
        seedImgHeight -= 8;
      }
    }

    // Code for orbit and background colour calculation
    var colour = [0, 160 - sunPosition.y / 5, 250 - sunPosition.y / 5]
    background(colour[0], colour[1], colour[2]);
    
    image(sun, sunPosition.x - 250, sunPosition.y - 250, 500, 500)
    image(moon, moonPosition.x - 250, moonPosition.y - 250, 500, 500)
   
    // Get value of slider to determine daySpeed
    if (speedSlider.value() === 0) {
      daySpeed = 0.02;
      // increment growth state every 0.5 seconds
      growthSpeed = 0.5;
    } else if (speedSlider.value() === 1) {
      daySpeed = 0.1;
      //increment growth state every 1 second
      growthSpeed = 1;
    } else if (speedSlider.value() === 2) {
      daySpeed = 0.18;
      //increment growth state every 2 seconds
      growthSpeed = 2;
    }
    // Increase the orbit cycle by the time speed.
    angle += daySpeed;
    bob = sin(angle) * 50
    //maths for daylight cycle
    sunPosition.x = cos(radians(angle)) * window.innerWidth / 2 + window.innerWidth / 2
    sunPosition.y = sin(radians(angle)) * window.innerHeight + window.innerHeight

    moonPosition.x = cos(radians(angle - 180)) * window.innerWidth / 2 + window.innerWidth / 2
    moonPosition.y = sin(radians(angle - 180)) * window.innerHeight + window.innerHeight

    //Draw the island
    image(island,window.innerWidth / 2 - 600, window.innerHeight / 2 - 200 + bob, 1000, 1000)
    
    //Draw plant related stuff!
    //treeAngle = angleSlider.value();
    treeAngle = ((2 * PI) * (sunPosition.y / window.innerWidth))/8
    push();
    translate(window.innerWidth/2- seedImgWidthOriginal/2 +30, window.innerHeight*0.75 - seedImgHeightOriginal/2 -100 + bob);
    branch(growthValue);
    pop();

    // seed disappears when it is small enough
    if (seedImgWidth > 60) {
      drawSeed();
    }
  }
}



function loadSeed() {
  randNum = (Math.floor(Math.random() * 9)).toString();
  seedImgPath = '../src/assets/seeds/seed'.concat(randNum, '.png');

  return loadImage(seedImgPath);
}
function drawSeed() {
  image(seedImg, window.innerWidth/2 -100 - seedImgWidth/2, window.innerHeight*0.75 - seedImgHeight/2 - 200 + bob, seedImgWidth, seedImgHeight);
}

function loadPlantMaterial() {
  randNum = (Math.floor(Math.random() * 9)).toString();
  plantMaterialPath = '../src/assets/plantmaterials/stick'.concat(randNum, '.png');

  return loadImage(plantMaterialPath);
}

// Draw plant
function branch(len) {
  let bob = sin(angle * 0.3) * 50;
  noStroke();
  fill(60, 161, 35);
  image(plantMaterial, 0, 0, plantThickness, -len);
  translate(0, -len);
  if (len > 10) {
  push();
  rotate(treeAngle+(bob/3200));
  branch(len * 0.75)
  pop();
  push();
  rotate(-treeAngle+(bob/1600));
  branch(len * 0.75)
  pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

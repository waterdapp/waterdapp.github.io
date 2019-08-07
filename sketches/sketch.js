
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
let seedImg, seedImgWidth = 250, seedImgHeight = 250, seedImgPath;
let startButton;
let randNum;
let isLogoVisible = true;
let hydrationProgress, healthProgress;
let speedSlider;
let bob = 0
let watering1;
let watering2;
// variable to keep track of current watering state (pour/normal)
let mousedown = false;
let currentselected = "";
let selectwateringcan;
let selectpesticide;
let pesticide2;

function preload() {
  img = loadImage('../src/branding/logo.png');
  sun = loadImage('../src/assets/sun/Sun1.png');
  moon = loadImage('../src/assets/moon/moon1.png')
  island = loadImage('../src/assets/floatingisland/floatingisland1.png')
  pressStart2P = loadFont('src/fonts/PressStart2P.ttf')
  seedImg = loadSeed();
  watering1 = loadImage('../src/assets/wateringcans/wateringcan1.png');
  watering2 = loadImage('../src/assets/wateringcans/wateringcan3.png');
  pesticide = loadImage('../src/assets/wateringcans/pesticide.png');
  pesticide2 = loadImage('../src/assets/wateringcans/pesticide2.png');
};

function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight); //origional blue rgb values are 0, 160, 250
  canvas.parent('sketchHolder')
  img.loadPixels();
  sun.loadPixels();
  moon.loadPixels();
  island.loadPixels();
  watering1.loadPixels();
  watering2.loadPixels();
  pesticide.loadPixels();
  pesticide2.loadPixels();
  noSmooth();
  canvas.mouseReleased(() => {
  mousedown = false
  })
  canvas.mousePressed(() => {
    if (isLogoVisible) {
      // Flip the value of logo visible
      isLogoVisible = !(isLogoVisible);

      // Add the time slider
      speedSlider = newSlider(40, canvas.height - 50);
      
      // Add health and hydration progress bars
      healthProgress = newProgress(-100, canvas.height / 2, '100', 'healthProgress');
      hydrationProgress = newProgress(canvas.width - 150, canvas.height / 2, '100', 'hydrationProgress');

      selectwateringcan = createButton('e')
      selectwateringcan.html('<img width="100" height="100" src="../src/assets/wateringcans/wateringcan1.png"></img>')
      selectwateringcan.position(10,10)
      selectwateringcan.mousePressed(() => {
          currentselected = "watering_can"
        
      })
      selectpesticide = createButton('e')
      selectpesticide.html('<img width="100" height="100" src="../src/assets/wateringcans/pesticide.png"></img>')
      selectpesticide.position(140,10)
      selectpesticide.mousePressed(() => {
          currentselected = "pesticide"
        
      })

      // Setup both bars.
      text = createP('Health');
      text.parent('sketchHolder');
      text.id('healthText');
      text = createP('Hydration');
      text.parent('sketchHolder');
      text.id('hydrationText');
      text = createP('Speed');
      text.parent('sketchHolder');
      text.id('speedText');

    }else {
      // check pouring variable and switch image based on it.
      mousedown = true

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

    // Code for orbit and background colour calculation
    var colour = [0, 160 - sunPosition.y / 5, 250 - sunPosition.y / 5]
    background(colour[0], colour[1], colour[2]);
    
    image(sun, sunPosition.x - 250, sunPosition.y - 250, 500, 500)
    image(moon, moonPosition.x - 250, moonPosition.y - 250, 500, 500)
   
    // Get value of slider to determine daySpeed

    if (speedSlider.value() === 0) {
      daySpeed = 0.02;
    } else if (speedSlider.value() === 1) {
      daySpeed = 0.1;
    } else if (speedSlider.value() === 2) {
      daySpeed = 0.18;
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

    //Draw the watering can 
    if(currentselected === 'watering_can'){
      if (mousedown){
        image(watering2,mouseX - 61,mouseY- 60,200,200)  
      }
      else {
        image(watering1,mouseX - 35,mouseY- 66,200,200)
      }
    }
    //Draw pesticide
    if(currentselected === 'pesticide'){
      if (mousedown){
        image(pesticide2,mouseX - 61,mouseY- 60,200,200) 
      }
       else {
      image(pesticide,mouseX - 35,mouseY- 66,200,200) 
  
  }
}
    // Draw plant related stuff!
    drawSeed();
  }
}


function loadSeed() {
  randNum = (Math.floor(Math.random() * 8) + 1).toString();
  seedImgPath = '../src/assets/seeds/seed'.concat(randNum, '.png');

  return loadImage(seedImgPath);
}

function drawSeed() {
  image(seedImg, window.innerWidth/2 -100 - seedImgWidth/2, window.innerHeight*0.75 - seedImgHeight/2 - 200 + bob, seedImgWidth, seedImgHeight);
}

function windowResized(){
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
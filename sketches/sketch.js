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
let bugPosition = {
  x: (window.innerWidth / 2) - 150,
  y: (window.innerHeight / 2) + 140,
}
//let whichSeed;
let seedHeightAlterer
let canvas;
let value = 0;

let fruitsPickedUp = 0;
let coinImage;

let img;
let moon;
let cloud1;
let cloud2;
let cloud3;
let sun;
let seed, seedImgWidth = seedImgWidthOriginal = 250, seedImgHeight = seedImgHeightOriginal = 250, seedImgPath;
let plantMaterial, plantMaterialPath, leafMaterialPath, leafMaterial;
let pot;
let clouds = [];
let cloudImages = [];
let cloudWidth = 300;
let cloudHeight = 175;
const cloudOffset = 60;
const cloudSizeDifference = 60;
const cloudNumRow = 4;
let endDayScore;
var endReached = 'no';

let seedsImages = [];
let fruitsImages = [];
let fruitsHidden = [];
let fruitsInBasket = 0;
let basketCapacity = 8;

let startButton;
let randSeedNum;
let randStickNum;
let isLogoVisible = true;
let hydrationProgress, healthProgress, growthProgress, growthMax = 110;
let speedSlider;
let sliderText;
let bob = 0
let watering1;
let watering2;
// variable to keep track of current watering state (pour/normal)
let mousedown = false;
let currentselected = "";
let selectwateringcan;
let selectpesticide;
let selectbasket;
let basket1;
let basket2
let pesticide2;
let pesticide;
let dayCounter;
let dayCounterValueElement;
let bug1;
let bug2;
let bugpesticidecollision = false;
let healthText, hydrationText, speedText, seedText, growthText, daysText;

let numFruits = 0;
let maxFruits = 0;
let pickingFruits = false;

daySpeeds = [0.02, 0.1, 0.18];
growthSpeeds = [0.5, 1, 2];

let angleSlider, treeAngle;
let growthValue = 0,
  growthSpeed = 0;
let plantThickness = 8;

let gameTime = 0;
let showbug = true
let hit = false

let themeMusic;

function preload() {
  img = loadImage('../src/branding/Logo.png');
  sun = loadImage('../src/assets/sun/sun1.png');
  moon = loadImage('../src/assets/moon/moon1.png')
  island = loadImage('../src/assets/floatingisland/floatingisland1.png');
  pot = loadImage('../src/assets/pot/pot1.png');
  coinImage = loadImage('../src/assets/coins/coin.png');

  for (let i = 0; i < 3; i++) {
    cloudImages[i] = loadImage('../src/assets/clouds/cloud' + (i + 1) + '.png');
  }

  for (let i = 0; i < 8; i++) {
    seedsImages[i] = loadImage('../src/assets/seeds/seed' + (i + 1) + '.png');
    fruitsImages[i] = loadImage('../src/assets/fruits/fruit' + (i + 1) + '.png');
  }

  seed = new Seed(floor(random(1, 8)));


  pressStart2P = loadFont('src/fonts/PressStart2P.ttf')

  seedImg = seed.image;

  plantMaterial = seed.loadPlantMaterial();

  leafMaterial = loadLeafMaterial();

  watering1 = loadImage('../src/assets/wateringcans/wateringcan1.png');
  watering2 = loadImage('../src/assets/wateringcans/wateringcan3.png');
  pesticide = loadImage('../src/assets/wateringcans/pesticide.png');
  pesticide2 = loadImage('../src/assets/wateringcans/pesticide2.png');
  bug1 = loadImage('../src/assets/wateringcans/bug1.png');
  bug2 = loadImage('../src/assets/wateringcans/bug2.png');
  basket1 = loadImage('../src/assets/fruits/basket1.png');
  basket2 = loadImage('../src/assets/fruits/basket2.png');
  
  //Music section
  //set global sound formats
  soundFormats('mp3', 'ogg');

  //load theme as .ogg or .mp3 depending on browser
  themeMusic = loadSound('../src/music/theme.mp3');
};




function setup() {
  // create a canvas
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent('sketchHolder')
  img.loadPixels();
  sun.loadPixels();
  moon.loadPixels();
  coinImage.loadPixels();
  island.loadPixels();
  watering1.loadPixels();
  watering2.loadPixels();
  pesticide.loadPixels();
  pesticide2.loadPixels();
  basket1.loadPixels();
  basket2.loadPixels();
  pot.loadPixels();
  bug1.loadPixels();
  bug2.loadPixels();
  dayCounter = 0;
  roundedDayNumber = 0;

  for (let i=0; i < fruitsImages.length; i++) {
    fruitsImages[i].loadPixels();
    seedsImages[i].loadPixels();
  }

  // Initializing all cloud entities
  let cloudCount = 0
  for (let i = 0; i < cloudImages.length; i++) {
    cloudImages[i].loadPixels();
    for (let j = 0; j < cloudNumRow; j++) {
      clouds[cloudCount] = {
        image: cloudImages[i],
        position: {
          x: random(cloudWidth, window.innerWidth - cloudWidth),
          y: cloudOffset + i * cloudHeight * 1.5 + (random(-35, 35))
        },
        speedOffset: random(-2, 2),
        widthOffset: random(-20, 20),
        heightOffset: random(-20, 20),
        width: 0,
        height: 0
      }

      clouds[cloudCount].width = cloudWidth - i * cloudSizeDifference + clouds[i].widthOffset;
      clouds[cloudCount].height = cloudHeight - i * cloudSizeDifference + clouds[i].heightOffset;
      cloudCount++;
    }
  }
  // play theme music
  themeMusic.setVolume(0.1);

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
      selectwateringcan.position(10, 10)
      selectwateringcan.mousePressed(() => {
        currentselected = "watering_can"

      })
      selectpesticide = createButton('e')
      selectpesticide.html('<img width="100" height="100" src="../src/assets/wateringcans/pesticide.png"></img>')
      selectpesticide.position(140, 10)
      selectpesticide.mousePressed(() => {
        currentselected = "pesticide"
      })

      selectbasket = createButton('e')
      selectbasket.html('<img width="100" height="100" src="../src/assets/fruits/basket1.png"></img>')
      selectbasket.position(270, 10);
      selectbasket.mousePressed(() => {
        currentselected = "basket";
      })


      coinElement = createP('<img width="100" height="100" src="../src/assets/coins/coin.png"> <span id="moneyDisplay">'+ fruitsPickedUp + '</span>');
      coinElement.position(10, 120);

      growthProgress = newProgress(150, canvas.height - 50, growthMax, 'growthProgress');
      growthProgress.value(growthValue);
      // Setup both bars.
      healthText = createP('Health');
      healthText.parent('sketchHolder');
      healthText.id('healthText');
      hydrationText = createP('Hydration');
      hydrationText.parent('sketchHolder');
      hydrationText.id('hydrationText');
      speedText = createP('Speed');
      speedText.parent('sketchHolder');
      speedText.id('speedText');

      seedText = createP('seedData');
      seedText.parent('sketchHolder');
      seedText.id('seedText');

      growthText = createP('Growth');
      growthText.parent('sketchHolder');
      growthText.id('growthText');
      var snailEmoji = createP('🐌');
      snailEmoji.parent('sketchHolder');
      snailEmoji.id('snailEmoji');
      var personEmoji = createP('🚶');
      personEmoji.parent('sketchHolder');
      personEmoji.id('personEmoji');
      var hareEmoji = createP('🐇');
      hareEmoji.parent('sketchHolder');
      hareEmoji.id('hareEmoji');
      daysText = createP('Days');
      daysText.parent('sketchHolder');
      daysText.id('daysText');
      dayCounterValueElement = createP(roundedDayNumber / 1000);
      dayCounterValueElement.parent('sketchHolder');
      dayCounterValueElement.id('dayCounterText');

      seed.dataBody();
    } else {
      mousedown = true;
    }
  })
}

function draw() {
  numFruits = 0;
  if (isLogoVisible) {
    image(img, window.innerWidth / 2 - 320, window.innerHeight / 2 - 320, 640, 640);
  }
  if (!isLogoVisible) {
    if (!showbug) {
      var randomnumber = Math.floor(random(0, 1000))
      if (randomnumber === 1) {
        showbug = true
      }
    }
    // Every other second run this
    if (daySpeed === 0.1) {
      if (frameCount % 60 === 0) {
        hydrationProgress.value(hydrationProgress.value() - 1);
      }
    } else if (daySpeed === 0.02) {
      if (frameCount % 60 === 0) {
        hydrationProgress.value(hydrationProgress.value() - 0.2);
      }
    } else if (daySpeed === 0.18) {
      if (frameCount % 60 === 0) {
        hydrationProgress.value(hydrationProgress.value() - 1.8);
      }
    }
    if (hydrationProgress.value() < 20) {
      healthProgress.value(healthProgress.value() - 0.02);
    }
    if (showbug) {
      healthProgress.value(healthProgress.value() - 0.02);
    }
    //increment plant growth state according to speed setting
    if (frameCount % (60 * (2.5 - growthSpeed)) === 0) {
      if (growthValue <= growthMax) {
        growthValue += 2;
        plantThickness += 1 / 25;
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
    daySpeed = daySpeeds[speedSlider.value()]
    growthSpeed = growthSpeeds[speedSlider.value()]
    // Increase the orbit cycle by the time speed.
    angle += daySpeed;
    bob = sin(angle) * 50

    dayCounterValueElement.html(dayCounter);

    dayCounter = Math.floor((angle - 180) / 360);

    // dayCounterValueElement.html(dayCounter);

    cloudBob = -sin(angle - 180) * 5;
    //maths for daylight cycle
    sunPosition.x = cos(radians(angle)) * window.innerWidth / 2 + window.innerWidth / 2
    sunPosition.y = sin(radians(angle)) * window.innerHeight + window.innerHeight

    moonPosition.x = cos(radians(angle - 180)) * window.innerWidth / 2 + window.innerWidth / 2
    moonPosition.y = sin(radians(angle - 180)) * window.innerHeight + window.innerHeight
    // Draw the clouds
    for (let i = 0; i < clouds.length; i++) {
      if (clouds[i].position.x > clouds[i].width || clouds[i].position.x < window.innerWidth + clouds[i].width) {
        image(clouds[i].image,
          clouds[i].position.x,
          clouds[i].position.y + cloudBob,
          clouds[i].width,
          clouds[i].height
        );
      }
    }
    //Draw the island and pot
    image(island, window.innerWidth / 2 - 600, window.innerHeight / 2 - 200 + bob, 1000, 1000)

    //Draw plant related stuff!
    treeAngle = ((2 * PI) * (sunPosition.y / window.innerWidth)) / 8
    push();
    translate(window.innerWidth / 2 - seedImgWidthOriginal / 2 + 30, window.innerHeight * 0.75 - seedImgHeightOriginal / 2 - 205 + bob);
    branch(growthValue);
    pop();

    // seed disappears when it is small enough
    if (seedImgWidth > 60) {
      seed.draw();
    }
    image(pot, window.innerWidth / 2 - 350, window.innerHeight / 2 - 200 + bob, 500, 500)
    //Draw the watering can 
    if (currentselected === 'watering_can') {
      if (mousedown) {
        image(watering2, mouseX - 61, mouseY - 60, 200, 200)
        hydrationProgress.value(hydrationProgress.value() + 0.5);
        if (hydrationProgress.value() > 20) {
          healthProgress.value(healthProgress.value() + 0.2);
        }
      }
    }

    // Calculate clouds position
    for (let i = 0; i < clouds.length; i++) {
      // Maximum speed
      cloudSpeed = map(daySpeed, 0, 0.2, 0, 5) + clouds[i].speedOffset;

      // Decreasing the speed for the smaller clouds
      cloudSpeed *= map(Math.floor(i / cloudNumRow), 0, 2, 1, 0.3);


      // When it is night, the clouds move to the right, and only appear at the back in the morning
      /* (*) = The condition is true when the sun is at this position
      _____________
      |           |
      |      __*__|
      |      |    |
      |__*___|____|
      */
      if (
        (sunPosition.y > window.innerHeight / 2 && sunPosition.x > window.innerWidth / 2) ||
        (sunPosition.y > window.innerHeight && sunPosition.x < window.innerWidth / 2)
      ) {
        // Keep moving if they did not get to the end
        if (clouds[i].position.x < window.innerWidth + clouds[i].width) {
          clouds[i].position.x += cloudSpeed
        }
      } else {
        // If they get to the end, they appear on the left
        if (clouds[i].position.x > window.innerWidth + clouds[i].width) {
          clouds[i].position.x = -clouds[i].width;
        }
        clouds[i].position.x += cloudSpeed;
      }
    }

    if (randSeedNum == 6 || randSeedNum == 8) {
      seedHeightAlterer = 0.64
    } else {
      seedHeightAlterer = 0.65
    }

    //Draw bugs
    if (showbug) {
      image(bug2, bugPosition.x + cos(angle * 0.25) * 200, bugPosition.y + bob, 200, 200)
    }
    if (currentselected === 'pesticide') {
      if (mousedown) {
        hit = collideRectRect(bugPosition.x + cos(angle * 0.25) * 200, bugPosition.y + bob, 100, 150, mouseX, mouseY, 50, 75);
        if (hit && showbug) {

          showbug = false
        }
      }
    }

    // seed disappears when it is small enough
    if (seedImgWidth > 60) {
      seed.draw();
    }
    image(pot, window.innerWidth / 2 - 350, window.innerHeight / 2 - 200 + bob, 500, 500)

    //Draw the watering can 
    if (currentselected === 'watering_can') {
      if (mousedown) {
        image(watering2, mouseX - 61, mouseY - 61, 200, 200)
        hydrationProgress.value(hydrationProgress.value() + 0.5);
        if (hydrationProgress.value() > 20) {
          healthProgress.value(healthProgress.value() + 0.2);
        }


      } else {
        image(watering1, mouseX - 35, mouseY - 66, 200, 200)
      }
    }

    // Draw the basket
    if(currentselected === 'basket') {
      if (mousedown) {
        if (growthValue >= growthMax && fruitsInBasket < basketCapacity) {
          image(seed.fruit.image, mouseX - FRUIT_SIZE/2, mouseY, FRUIT_SIZE, FRUIT_SIZE);
        }
        image(basket2, mouseX - 100, mouseY - 60, 200, 200);
      } else {
        if (fruitsInBasket >= basketCapacity) {
          image(seed.fruit.image, mouseX - FRUIT_SIZE/2, mouseY, FRUIT_SIZE, FRUIT_SIZE);
        }
        image(basket1, mouseX - 100, mouseY - 60, 200, 200);

      }
    }

    //Draw pesticide
    if (currentselected === 'pesticide') {
      if (mousedown) {
        image(pesticide2, mouseX - 100, mouseY - 60, 200, 200)
      } else {
        image(pesticide, mouseX - 100, mouseY - 66, 200, 200);
      }
    }

    if (randSeedNum == 6 || randSeedNum == 8) {
      seedHeightAlterer = 0.64
    } else {
      seedHeightAlterer = 0.65
    }
    // Make the text color red if hydration or health values are red
    if (hydrationProgress.value() === 0) {
      hydrationText.style('color', 'red');
    } else {
      hydrationText.style('color', 'white');
    }


    if (healthProgress.value() === 0) {
      healthText.style('color', 'red');
    } else {
      healthText.style('color', 'white');
    }
    //draw a rectangle
    strokeWeight(5);
    stroke("black")
    fill("gray")
    rectMode(CENTER)
    rect(window.innerWidth - 500, 125, 1000, 250)

    // Hidden Day Speed changer by pressing the space bar
    document.body.onkeydown = function (e) {
      if (e.keyCode == 32) {
        daySpeedPrompt();
      }
    }

    //update growth bar
    growthProgress.value(growthValue);

    // Update max fruits
    maxFruits = numFruits;

    // End Screen

    if (healthProgress.value() === 0) {
      if (endReached === 'no') {
        endReached = 'yes';
        endDayScore = dayCounter + fruitsPickedUp;
        numFruits = 0;
        maxFruits = 0;
        endOfGame();
      }
    }
    // loop music
    if (!(themeMusic.isPlaying())) {
      themeMusic.play();
    }
  }
}

// A click == A fruit
function mouseReleased() {
  if (growthValue >= growthMax && currentselected == "basket" && fruitsHidden.length < maxFruits && fruitsInBasket < basketCapacity) {
    
    randIndex = floor(random(maxFruits));
    while(fruitsHidden.includes(randIndex)) {
      randIndex = floor(random(maxFruits));
    }
    fruitsHidden.push(randIndex);
    fruitsInBasket++;
    fruitsPickedUp++;
  } 
  if (fruitsInBasket >= basketCapacity) {
    console.log("basket is full")
    setTimeout(() => {
      fruitsInBasket = 0;
      console.log("basket cleared");
    }, 5000)
  }
}


function loadLeafMaterial() {
  randStickNum = ((Math.floor(Math.random() * 8) + 1)).toString();
  leafMaterialPath = '../src/assets/plantmaterials/stick'.concat(randStickNum, '.png');

  return loadImage(leafMaterialPath);
}

function drawMoney() {
  image(coinImage)
}


// Draw plant
function branch(len) {
  let bob = sin(angle * 0.3) * 50;
  if (len > 10) {
    image(plantMaterial, 0, 0, plantThickness, -len);
  } else if (len <= 10) {
   
  
    image(leafMaterial, 0, 0, plantThickness, -len);
   
  }
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
    if (len > 30 && growthValue > 50) {
      if (!fruitsHidden.includes(numFruits)) {
        image(seed.fruit.image, 0, 0, 20, 20);
      }
      numFruits++;
    }

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // fix positioning error when window resized
  hydrationProgress.position(canvas.width - 150, canvas.height / 2);
  speedSlider.position(40, canvas.height - 50);
  growthProgress.position(200, canvas.height - 50);
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

function daySpeedPrompt() {
  var daySpeedPromptResult = prompt("Choose a speed from 0.01 to 1", daySpeed);
  daySpeed = daySpeedPromptResult;
  daySpeeds[0] = Number(daySpeedPromptResult);
  speedSlider.value(0);
}

function keyPressed() {
  if (keyCode === 50) {
    currentselected = 'pesticide';
    if (currentselected === 'pesticide') {
      if (mousedown) {
        image(pesticide2, mouseX - 61, mouseY - 60, 200, 200)
      } else {
        image(pesticide, mouseX - 35, mouseY - 66, 200, 200);
      }
    }
  } else if (keyCode === 40) {
    currentselected = 'pesticide';
    if (currentselected === 'pesticide') {
      if (mousedown) {
        image(pesticide2, mouseX - 61, mouseY - 60, 200, 200)
      } else {
        image(pesticide, mouseX - 35, mouseY - 66, 200, 200);
      }
    }
  }
  if (keyCode === 49) {
    currentselected = 'watering_can';
    if (currentselected === 'watering_can') {
      if (mousedown) {
        image(watering2, mouseX - 61, mouseY - 60, 200, 200)
      } else {
        image(watering1, mouseX - 35, mouseY - 66, 200, 200)
      }
    }
  } else if (keyCode === 35) {
    currentselected = 'watering_can';
    if (currentselected === 'watering_can') {
      if (mousedown) {
        image(watering2, mouseX - 61, mouseY - 60, 200, 200)
      } else {
        image(watering1, mouseX - 35, mouseY - 66, 200, 200)
      }
    }
  }
}
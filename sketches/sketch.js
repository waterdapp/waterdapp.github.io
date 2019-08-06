let seedImg, seedImgWidth, seedImgHeight, seedImgPath;
let startButton;


function setup() {
  // create a canvas
  createCanvas(window.innerWidth, window.innerHeight);
  noSmooth();
  // colour the background
  background(0, 160, 250);
//  createSeed();

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
  
}

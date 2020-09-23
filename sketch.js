var gameState="PLAY";

var tower, towerImage;
var door, doorImage, doorsGroup;
var climber, climberImage, climbersGroup;
var invisibleBlock, invisibleBlocksGroup;

var ghost, ghostImage;

var spookySound;

function preload() {
 
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  
  ghostImage=loadImage("ghost-standing.png");
  
  spookySound=loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600, 600);
  
  spookySound.loop();
  
  tower=createSprite(300, 300, 600, 600);
  tower.addImage(towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlocksGroup=new Group();
  
}

function draw() {
  background(0);
  
  if (gameState === "PLAY") {
  
  if (tower.y > 400) {
    tower.y=300;
  }
  
  if (keyDown("LEFT_ARROW")) {
    ghost.x=ghost.x-3; 
  }
  
  if (keyDown("RIGHT_ARROW")) {
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("SPACE")) {
    ghost.velocityY=-5; 
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY=0; 
  }
  
  if (invisibleBlocksGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState="END";
  }
  
  spawnDoors();
  
  drawSprites();
  }
  
  if (gameState === "END") {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
  
}

function spawnDoors() {
  
 if (frameCount % 240===0) {
  door=createSprite(300, -50, 10, 10);
  door.addImage(doorImage);
   
   climber=createSprite(300, 10, 10, 10);
   climber.addImage(climberImage);
   
   invisibleBlock=createSprite(300, 15, 10, 2);
   invisibleBlock.width=climber.witdh;
   
  door.x=Math.round(random(120, 400));
  door.velocityY=1;
  
  climber.x=door.x;
  climber.velocityY=1;
   
   invisibleBlock.x=door.x;
   invisibleBlock.velocityY=1;
   invisibleBlock.debug=true;
   
   door.lifetime=800;
   climber.lifetime=800;
   
   ghost.depth=door.depth;
   ghost.depth=ghost.depth+1;
   
   doorsGroup.add(door);
   climbersGroup.add(climber);
   invisibleBlocksGroup.add(invisibleBlock);
   
 }
}
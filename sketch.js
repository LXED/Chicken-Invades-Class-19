var Ship,shipImage;
var BackgroundImage,Background;
var EggGroup,EggImage
var chickenImage,ChickenGroup;
var PLAY = 1;
var END = 0;
var gameState = 1;
var Lost,LostImage;
var score = 0;
var restart,restartImg;





function preload()
{
  shipImage = loadImage("3548e43d7a6680cf7bb2a62cdd376f20baf76484.png");
  BackgroundImage = loadImage("Background Chicken.jpg");
  EggImage = loadImage("Egg.png");
  chickenImage = loadImage("BigChickenCIU.png");
  LostImage = loadImage("you lost.png");
  restartImg = loadImage("restart.png");
  
}



function setup() 
{
 createCanvas(600,600);
  
    Background = createSprite(300,300,600,600);
    Background.addImage("img",BackgroundImage);
    Background.velocityY = 4;
    Background.y = Background.height/2;
  
    Ship = createSprite(300,550,10,10);
    Ship.addImage("img",shipImage);
    Ship.scale = 0.5;
  
    EggGroup = new Group();
    chickenGroup = new Group();
  
    restart = createSprite(300,350,10,10);
    restart.addImage("img",restartImg)
    restart.scale = 0.1;
  
    Lost = createSprite(300,300,10,10);
    Lost.addImage("img",LostImage);
    Lost.scale = 0.5;
  
  
  
}



function draw() 
{
  
   
  
  if(gameState === PLAY)
  {
  
    Background.velocityY = 4;
   
    if(Background.y > 600)
    {
      Background.y = 200;
    }
    
    restart.visible = false;
    Lost.visible = false;
    
   
    
    if(keyDown("RIGHT_ARROW"))
    {
      Ship.velocityX = 4;
    }
    
    if(keyDown("LEFT_ARROW"))
    {
      Ship.velocityX = -4;
    }
    
    
    if(Background.y > 600)
    {
        Background.y = 200;
    }
    
    if(chickenGroup.isTouching(Ship))
    {
      gameState = END;
    }
    
    if(EggGroup.isTouching(Ship))
    {
      gameState = END;
    }
    
  spawnEggs();
  spawnChickens();
    
  }
  
  else if(gameState === END)
  {
    
    if(mousePressedOver(restart)) 
    {
      restartu();
    }
    
    restart.visible = true;
    Lost.visible = true;
    
    Background.velocityY = 0;
    EggGroup.setVelocityYEach(0);
    chickenGroup.setVelocityYEach(0);
    Ship.velocityX = 0;
    score.velocityX = 0;
    
  }
  
  
  drawSprites();
  
  score = score + Math.round(frameCount / 60);
  fill("white")
  textSize(30);
  text("Survival Points: " + score,50,50);
  
  
}

function spawnChickens()
{
  if(frameCount %60 === 0)
  {
    var Chick = createSprite(Math.round(random(50,550)),50,10,10)
    Chick.addImage("img",chickenImage);
    Chick.velocityY = 4;
    Chick.scale = 0.2;
    chickenGroup.add(Chick);
  }
}

function spawnEggs()
{
  if(frameCount %80 === 0)
  {
    var egg = createSprite(Math.round(random(50,550)),50,10,10)
    egg.addImage("img",EggImage);
    egg.velocityY = 5;
    egg.scale = 0.05;
    EggGroup.add(egg);
  }
}

function restartu()
{
  restart.visible = false;
  Lost.visible = false;
  gameState = PLAY;
  score = 0;
  EggGroup.destroyEach();
  chickenGroup.destroyEach();
  
}







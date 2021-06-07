// assigning variables

var coin_animation,coin,ruby,ruby_image,background_image;
var heart,heart_image;
var sapphire,sapphire_image;
var emerald,emerald_image;
var amethyst,amethyst_image;
var stone1,stone;
var basket,basket_animation,boy_collided;
var invisibleGround,ground;
var gameover,gameover_image;
var restart,restart_image;
var collidingSound;
var lifeLose;

// declaring variables for game state
var play =1;
var end=0;
var gamestate=play;

// for scoring system
var score=0;

// creating groups
var stoneG,amethystG,heartG,coinG,sapphireG,emeraldG,rubyG;
var life = 3;
var leftArrow,rightArrow;

// images are preloaded here for future use
function preload(){
  coin_animation = loadImage("coin.png");
  ruby_image = loadImage("ruby1.png");
  background_image = loadImage("background.png");
  heart_image = loadImage("heart.png"); 
  sapphire_image = loadImage("sapphire1.png");
  emerald_image = loadImage("emerald3.png");
  amethyst_image = loadImage("amethyst1.png");
  stone1 = loadImage("rock1.png");
basket_animation = loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png");
  boy_collided = loadAnimation("boy1.png");
  gameover_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
}


function setup() {
  // creating canvas of width 800 and height the same as width
  createCanvas(800, 800);
 
 
// creating sprites for arrow keys
  leftArrow = createSprite(40,500,40,40);
  rightArrow = createSprite(750,500,40,40);
 
  
                       
                       
  // creating an invisible ground on which the boy is standing
  invisibleGround = createSprite(400,750,800,20);
   invisibleGround.visible = false;
 
  //assigning groups
  stoneG = new Group();
  emeraldG= new Group();
  heartG= new Group();
  coinG= new Group();
  amethystG= new Group();
  sapphireG=new Group();
  rubyG = new Group();

basket = createSprite(150,540,10,10);
  basket.addAnimation("running",basket_animation);
  basket.addAnimation("boycollided",boy_collided);
  basket.scale =0.9;
  basket.collide(invisibleGround);
    
 background = createSprite(400,350,800,800);
  background.addImage("moving",background_image);
  background.depth = 0.1;
 
  gameover = createSprite(400,300,10,10);
  gameover.addImage("game",gameover_image);
  gameover.scale = 0.5;
  
  restart = createSprite(400,400,10,10);
  restart.addImage("over",restart_image);
  restart.scale = 0.1;
  
    background.velocityX = -4 ;
  background.x = background.width /2;      
   
}



function draw() {
  // creating a background image
     drawSprites();
 
 
   
  
  //declaring game state play
 if(gamestate === play){
 
   basket.changeAnimation("running",basket_animation)
   background.velocityX = -4;
  
    if (background.x < 0){
      background.x = background.width/2;
    }
   
     gameover.visible = false;
     restart.visible = false;
    
  
   //making the left arrow key active
    if(mousePressedOver(leftArrow)){
      basket.x = basket.x-10;
      }
   
   //making the right arrow key active
   if(mousePressedOver(rightArrow)){
      basket.x = basket.x+10;
      }
   
   //giving movement to the boy when left arrow key is pressed
   if(keyDown("left_arrow")){
      basket.x=basket.x-10;
   }
   
   //giving movement to the boy when right arrow key is pressed
   if(keyDown("right_arrow")){
      basket.x = basket.x+10;
   }
   // creating stones
  Stones();
  
     //creating continous gems
  var select_gem = Math.round(random(1,6));
  
  if (frameCount % 100 === 0) {
    if (select_gem === 1) {
    Coins();
    } else if (select_gem === 2) {
      Sapphires();
    } else if (select_gem === 3) {
     Emeralds();
    }else if(select_gem ===4){
      Amethysts();
    } else if(select_gem ===5){
      Rubies();
    }
    
    else {
      Hearts();
    }
  }
   
   // scoring system
  if(basket.isTouching(coinG)){
    coinG.destroyEach();
    score = score+5;

  }
if(basket.isTouching(rubyG)){
    rubyG.destroyEach();
    score = score+2;
  
  }
 if(basket.isTouching(emeraldG)){
    emeraldG.destroyEach();
    score = score+3;
 
  }  
  if(basket.isTouching(amethystG)){
    amethystG.destroyEach();
    score = score+6;

  }
   if(basket.isTouching(sapphireG)){
    sapphireG.destroyEach();
    score = score+4;
   
  }
  if(basket.isTouching(heartG)){
    heartG.destroyEach();
    life = life+1;
  
  }
   
   // losing life on touching an obstacle
   if(basket.isTouching(stoneG)){
    stoneG.destroyEach();
    life = life-1;
  }
   
  // when life is 0 the game should end 
   if(life === 0){
     gamestate=end;
   
   }
 
 
 }
 
  // things to be done when the game ends
  if(gamestate === end){
    
      basket.changeAnimation("boycollided",boy_collided);
      restart.visible = true;
     gameover.visible = true;
    // displaying game over text
 //    text("Game Over",400,400);
   
    
    background.velocityX = 0;
   
    // stop making of new gems
     stoneG.setVelocityXEach(0);
     rubyG.setVelocityXEach(0); 
    coinG.setVelocityXEach(0);
    emeraldG.setVelocityXEach(0);
    sapphireG.setVelocityXEach(0);
    amethystG.setVelocityXEach(0);
    heartG.setVelocityXEach(0);
    
    // destroying existing gems on the screen
    stoneG.destroyEach();
    rubyG.destroyEach();
    coinG.destroyEach();
    emeraldG.destroyEach();
    sapphireG.destroyEach();
    amethystG.destroyEach();
    heartG.destroyEach();
    
    
   // game should reset when R is pressed
  //  text("Press 'R' to restart",400,550);
    if(keyDown("r")||mousePressedOver(restart)){
      reset();
    }
    
    
  }
  
    
  


 
// declaring text arrangement
  //text(mouseX+","+mouseY, mouseX,mouseY);  
   text("Left Arrow Key",20,540);
  text("Right Arrow Key",660,540);
   
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Life : "+life,100,50);
  
  
   text("Score:"+score,600,20);
  
 
  
}

// creating differnt functions

//function for creating boy

// function to reset the game
function reset(){
  gamestate = play;
  
  score = 0;
  life=3;
 

}

// function for creating gems 
function Coins(){
  coin = createSprite(Math.round(random(90, 700)),0,10,10);
  coin.addImage("moving",coin_animation);
  coin.scale=0.4;
  coin.velocityY = (3+  3* score/100);
  coin.lifetime = 180;
  coinG.add(coin);
}

function Emeralds(){
  emerald= createSprite(Math.round(random(90, 700)),0,10,10);
  emerald.addImage("falling",emerald_image);
  emerald.scale =0.03;
  emerald.velocityY = (3+ 3* score/100);
  emerald.lifetime = 180;
  emeraldG.add(emerald);
  
}

function Rubies(){
  ruby= createSprite(Math.round(random(20, 750)),0,10,10);
  ruby.addImage("falling",ruby_image);
  ruby.scale =0.15;
  
  ruby.velocityY = (3+ 3* score/100);
  ruby.velocityY = 3;
  ruby.lifetime = 180;
  rubyG.add(ruby);
  
}


function Sapphires(){
  sapphire = createSprite(Math.round(random(90, 700)),0,10,10);
  sapphire.addImage("fell",sapphire_image);
  sapphire.scale = 0.1;
  sapphire.velocityY = (3+ 3* score/100);
  sapphire.lifetime = 180;
  sapphireG.add(sapphire);
}

function Amethysts(){
  amethyst = createSprite(Math.round(random(90, 700)),0,10,10);
  amethyst.addImage("go",amethyst_image);
  amethyst.scale =0.1;
  amethyst.velocityY = (3+ 3* score/100);
  amethyst.lifetime = 180;
  amethystG.add(amethyst);
}

function Hearts(){
  heart = createSprite(Math.round(random(90, 700)),0,10,10);
  heart.addImage("going",heart_image);
  heart.scale = 0.3;
  heart.velocityY=(3+  3* score/100);
  heart.lifetime = 180;
  heartG.add(heart);  
}

// function for creating stones
function Stones(){
   if (frameCount % 150 === 0){
     stone = createSprite(Math.round(random(90, 700)),0,10,10)
     stone.addImage("hit",stone1);
     stone.scale=0.4;
     stone.velocityY=(3+ 3* score/100);
     stone.lifetime = 180;
     stoneG.add(stone);
   }
}




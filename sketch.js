var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,rate,gameState,PLAY,END;

function preload() {


  monkey_running = loadAnimation("monkey_0.png","monkey_4.png","monkey_5.png","monkey_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png"); 

}



function setup() {
  createCanvas(400, 400);


gameState =PLAY;
score = 0;

  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);

  monkey.scale = 0.1

  ground = createSprite(200, 350, 900, 50);
  ground.velocityX = -4;
ground.shapeColor ="brown";


  FoodGroup = new Group();
  obstaclesGroup = new Group();

 // score = 0;


}


function draw() {

  background("lightblue");

if(gameState === PLAY){
  if (ground.x < 0) {
    ground.x = 200;
  }



  if (keyDown("space")) {
    monkey.velocityY = -8;
  }
  monkey.velocityY = monkey.velocityY + 0.5;

  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
    if (obstaclesGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
gameState = END;

  }
}
  drawSprites();

  stroke("black");
  textSize(20);
  fill("black");
 rate = round(frameRate());
  if(frameCount%rate ===0){
   score = score +1;   
  }

  text("Survival Time: " + score, 100, 50);
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(400, 250, 40, 10);
    banana.y = random(120, 200);
    banana.velocityX = -5;

    //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

    //add image of banana
    banana.addImage(bananaImage);
    banana.scale = 0.05;

    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400, 320, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;

    //lifetime to the obstacle     
    obstacle.lifetime = 300;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
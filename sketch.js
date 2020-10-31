  var camel,camelImg;
  var groundImg,Ground;
  var invisibleGround;
  var score = 0;
  var cactus,cactusImg;
  var gameState;
  var PLAY = 1;
  var END = 0;
  var cactusGroup;
  var bkmusic;
  var drop,dropImg;
  var dropsGroup;
  var restart,restartImg;
  var text,textImg;

  function preload(){
    
    camelImg= loadAnimation("camel.gif");
    cactusImg = loadImage("cactuswhite.gif");
    groundImg = loadImage("background.png");
    dropImg = loadImage("drop.png");
    //bkmusic = loadSound("Chillout-downtempo-music-loop.mp3");
    restartImg = loadImage("restart.png");
    textImg = loadImage("textrest.png");
    score = 0;
    
  }

  function setup() {
    createCanvas(600,500)
    
   // bkmusic.loop();
    

    ground = createSprite(250,250)
    ground.addImage(groundImg)
    ground.scale = 1.7;

    camel = createSprite(100,450);
    camel.addAnimation("running",camelImg);
    camel.scale = 1.3;
    
    restart = createSprite(300,250);
    restart.addImage(restartImg);
    
    restart.scale = 0.2;
    
    text = createSprite(300,160)
    text.addImage(textImg);
    
    text.scale = 0.1;

    survivaltime = 0;

    invisibleGround = createSprite(250,500,600,10);
    invisibleGround.visible = false;
    
    camel.setCollider("circle",0,0,60);
    //camel.debug = true;
    
    cactusGroup = new Group();
    dropsGroup = new Group();
    gameState=PLAY;
   
  }

  function draw() {
   background("white")

   if(gameState === PLAY)
     {
       
     restart.visible=false;
     text.visible=false;
     ground.velocityX = -4;
     if (ground.x < 0){
          ground.x = ground.width/2;
     }
     if(keyDown("UP_ARROW")&& camel.y >= 100) {
        camel.velocityY = -12;
      }
      camel.velocityY = camel.velocityY + 0.8

      camel.collide(invisibleGround)
      stroke("black");
 
      if(cactusGroup.isTouching(camel))
      {
        gameState = END;
      }
       
       
       if(dropsGroup.isTouching(camel))
         {
           score = score+2;
           dropsGroup.destroyEach();
         }
       water();
       cacTus();
     }
    if(gameState === END)
      {
        text.visible = true;
        restart.visible = true;
  
        ground.velocityX = 0;
        camel.velocityY = 0;
        cactusGroup.setVelocityXEach(0);
        dropsGroup.setVelocityXEach(0);
        cactusGroup.setLifetimeEach(-1);
     
        cactusGroup.destroyEach();
        dropsGroup.destroyEach();

     if(mousePressedOver(restart) || mousePressedOver(text))
     {
     reset();
     }
  }
   
     drawSprites();
     //text("Score: "+ score, 300,50);
  }

  function cacTus()
  {
    if (frameCount % 60 === 0) {
      cactus = createSprite(400,440,40,10);
      cactus.x = Math.round(random(400,620));
      cactus.addImage(cactusImg);
      cactus.scale = 0.25;
      cactus.velocityX = -9;
      cactus.lifetime = 200;
      cactusGroup.add(cactus)
  }


  }

function water()
{
   if (frameCount % 80 === 0) {
    drop = createSprite(300,250);
    drop.y = Math.round(random(100,200));
    drop.addImage(dropImg);
    drop.scale = 0.1;
    drop.velocityX = -3;
    
    
    drop.lifetime = 200;
    
    dropsGroup.add(drop);
    }
}

function reset(){

  gameState = PLAY;
  
  
  score = 0;
}



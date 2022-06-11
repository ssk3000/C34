const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var fruit_con_3;
let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;
var bunny2;
var rabbit2;

var button,blower;
var clown;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var balloon_img, balloon;

function preload()
{
  bg_img = loadImage('bg_img.png');
  food = loadImage('clown.png');
  rabbit = loadImage('Rabbit-01.png');
  balloon_img = loadImage('balloon.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
}

function setup() {
  createCanvas(800, 600);
 
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(380,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:400,y:30});
  ground = new Ground(200,690,600,20);

  balloon = createSprite(60, 230, 120, 120);
  balloon.visible = false;

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  

  clown = createImg('clown.png');
  clown.position(730, 520)
  clown.size(50,50)
  
  fruit = Bodies.circle(200,100,15);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,windowWidth,windowHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

if(fruit.position.x <= 320 && fruit.position.x >= 260) {
  Matter.Body.applyForce(fruit, {x:0, y:0}, {x:0.1, y:0});
} 

  rope.show();
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,clown)==true)
  {
    console.log("Game over")
    text("Game over", 200, 200)
    textSize(50)
  }
   
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}
function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
        }
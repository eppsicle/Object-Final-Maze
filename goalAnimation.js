var expand = false; //determines when to animate rect

var rectSize = 50;  //increment
var opacity = 0; 

function setup() {
  createCanvas(400, 400);
}

function animateRect(){
  fill(144, 238, 144 ,255-opacity);
  rect(200,200,rectSize, rectSize);
  // 200s should be replaced with the player position
    
    rectSize+=10;
    opacity +=20; 
}

function draw() { 
  rectMode(CENTER); 
  background("black");
  noStroke();
  
  if(keyIsPressed === true){ // equivalent would be if the goal is reached
    expand = true;  
  }
  if(expand){
    animateRect();
  }
  if(opacity > 255){
    rectSize = 30;
    opacity = 0; 
    expand = false; 
  }
  
}

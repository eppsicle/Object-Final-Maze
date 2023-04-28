var arrowOpacity = 0; 

// These coordinates determine where the tip of each arrow goes
// just change these to translate the arrows wherever
var rightArrowX = 300; 
var rightArrowY = 200;

var leftArrowX = 300;
var leftArrowY = 400; 

var moveCounter = 0; // this determines when direction changes
var moveOneDirection = true; // this determines direction

function setup() {
  createCanvas(600, 600);
}

function animateArrows(){ 
    
    if(moveCounter <= 0){
      moveOneDirection = true; 
    }
    if(moveCounter >=150){
      moveOneDirection = false;  // time to reverse directions
    }
    if(moveOneDirection){
      moveCounter +=3;
      rightArrowX -=3;
      leftArrowX +=3;
    }
    else{
      moveCounter -=3; 
      rightArrowX +=3;
      leftArrowX -=3;
    }    
}

function drawArrows(){
  noStroke();
  fill(255, 255, 255 ,arrowOpacity);
  beginShape(); // right arrow
    vertex(rightArrowX, rightArrowY);
    vertex(rightArrowX+100, rightArrowY+100);
    vertex(rightArrowX+100, rightArrowY+50);
    vertex(rightArrowX+250, rightArrowY+50);
    vertex(rightArrowX+250, rightArrowY-50);
    vertex(rightArrowX+100, rightArrowY-50);
    vertex(rightArrowX+100, rightArrowY-50);
    vertex(rightArrowX+100, rightArrowY-100);
  endShape(CLOSE);
  
  beginShape(); // left arrow
    vertex(leftArrowX, leftArrowY);
    vertex(leftArrowX-100, leftArrowY-100);
    vertex(leftArrowX-100, leftArrowY-50);
    vertex(leftArrowX-250, leftArrowY-50);
    vertex(leftArrowX-250, leftArrowY+50);
    vertex(leftArrowX-100, leftArrowY+50);
    vertex(leftArrowX-100, leftArrowY+50);
    vertex(leftArrowX-100, leftArrowY+100);
  endShape(CLOSE);
}

function draw() { 
  rectMode(CENTER); 
  background("black");
  
  drawArrows(); 
  
  // equivalent would be if it is time to switch
  // might already have a variable for that in the big game
  if(keyIsPressed === true){ 
    animateArrows(); 
    arrowOpacity = 255; 
  }
  else{
    arrowOpacity = 0; 
  }
  
}

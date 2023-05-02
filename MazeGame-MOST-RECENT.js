//THIS IS THE FILE WHERE WE ARE TRYING TO GET THE PLAYER POSITION TO MATCH THE NEOPIXEL SYSTEM
let serial;

//initialize a fixed distance that movement and the grid size is based on
let increment = 50;

//initialize variables for the position of the player
let playerX = increment;
let playerY = 6 * increment;
let playerPos = 0;

//initialize a variable for communicating between arduino and p5 about which maze is being displayed
let whichMaze = 0; // 5 mazes indexed from 0-4

//initialize other variable to keeping track of information for the game that's coming from arduino
let numGoals = 0;
let isOnGoal = 0;
let goalPos = 0;
let timer = 0;
let switchTime = 0;
let switched = false;
let switchTimer = 0;

let expand = false; //determines when to animate rect

let rectSize = 50; //increment
let opacity = 0;
let textOpacity = 255;
let textDull = true; 

// These coordinates determine where the tip of each arrow goes
// just change these to translate the arrows wherever
var rightArrowX = 1536/2 + 100; 
var rightArrowY = 864/2 + 70;

var leftArrowX = 1536/2 - 100;
var leftArrowY = 864/2 + 230;

var goalNoise; 
var song; 
var countDown; 
var endingNoise; 
var homeNoise; 

//initialize 2D array that stores the positions of the wall for each maze
let mazes = [];

let letters = ["A","B","C","D","E","F","G","H"]; // labels for maze

let img;
function preload() {
  img = loadImage("final-project-logo.png");
  goalNoise = loadSound('goalNoise.mp3');
  song = loadSound('for-elevator-jazz-music-124005.mp3');
  countdownNoise = loadSound('countdownBloop.wav');
  endingNoise = loadSound('endingNoiseDelayed.wav');
  homeNoise = loadSound('cool-jazz-loops-2641.mp3');
  
}

function setup() {
  createCanvas(windowWidth,windowHeight); 
  increment = windowHeight/11;

  serial = new p5.SerialPort();

  serial.list();
  serial.open('COM4');
  // serial.open('COM7');

  serial.on("connected", serverConnected);

  serial.on("list", gotList);

  serial.on("data", gotData);

  serial.on("error", gotError);

  serial.on("open", gotOpen);

  serial.on("close", gotClose);

  let i = increment;

  //arrays that store the positions of the walls for each maze, starting at the top left corner with 0 and going right and down towards 63 in the bottom right corner
  maze1 = [
    1,
    3,
    4,
    5,
    9,
    12,
    17,
    18,
    20,
    21,
    29,
    30,
    32,
    33,
    35,
    41,
    43,
    44,
    45,
    46,
    49,
    51,
    59,
    62,
    63,
  ];
  maze2 = [
    0,
    1,
    2,
    6,
    12,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    29,
    32,
    33,
    37,
    41,
    42,
    43,
    51,
    52,
    53,
    54,
  ];
  maze3 = [
    0,
    7,
    8,
    9,
    10,
    11,
    14,
    15,
    17,
    25,
    27,
    28,
    30,
    35,
    36,
    37,
    38,
    41,
    43,
    48,
    49,
    50,
    51,
    54,
    55,
    63,
  ];
  maze4 = [
    3,
    5,
    7,
    9,
    11,
    17,
    19,
    21,
    22,
    25,
    27,
    29,
    32,
    33,
    37,
    44,
    45,
    46,
    48,
    49,
    50,
    53,
    61,
  ];
  maze5 = [
    1,
    9,
    10,
    12,
    15,
    18,
    20,
    22,
    23,
    28,
    33,
    34,
    35,
    36,
    37,
    38,
    41,
    46,
    51,
    54,
    56,
    57,
    58,
    59,
    61,
    62,
  ];
  maze6 = [4, 5, 7, 17, 18, 19, 20, 21, 23, 25, 28, 33, 35, 36, 37, 38, 39, 41, 49, 50, 51, 52, 54, 55];
  maze7 = [3, 9, 12, 13, 17, 18, 21, 23, 26, 27, 29, 34, 37, 38, 40, 42, 43, 45, 51, 57, 59, 61, 63];
  maze8 = [9, 11, 14, 17, 19, 24, 25, 27, 30, 33, 34, 35, 38, 41, 43, 46, 49, 51, 52, 53, 54];
  maze9 = [0, 6, 10, 13, 17, 20, 26, 29, 35, 38, 44, 51, 55, 58, 62];
  maze10 = [16, 17, 18, 20, 21, 22, 25, 29, 42, 43, 44];
  maze11 = [6, 9, 14, 19, 20, 26, 29, 34, 43, 44, 49, 54, 57];


  //place the mazes into the maze 2D array
  mazes[0] = maze1;
  mazes[1] = maze2;
  mazes[2] = maze3;
  mazes[3] = maze4;
  mazes[4] = maze5;
  mazes[5] = maze6;
  mazes[6] = maze7;
  mazes[7] = maze8;
  mazes[8] = maze9;
  mazes[9] = maze10;
  mazes[10] = maze11;
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();

  //if we have data
  if (currentString.length > 0) {
    //split at the comma
    let gameData = split(currentString, ",");

    //take in information on timer, player position, etc.
    timer = int(gameData[0]);
    playerPos = int(gameData[1]);
    whichMaze = int(gameData[2]);
    numGoals = int(gameData[3]);
    isOnGoal = int(gameData[4]);
    goalPos = int(gameData[5]);
    switchTime = int(gameData[6]);
  }
  trim(currentString);
  if (!currentString) return;
  latestData = currentString;
}

function animateRect() {
  noStroke(); 
  fill(144, 238, 144, 255 - opacity);
  rect(playerX, playerY, rectSize, rectSize);

  rectSize += 10;
  opacity += 20;
}

var arrowOpacity = 0;  

var moveCounter = 0; // this determines when direction changes
var moveOneDirection = true; // this determines direction

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
    vertex(rightArrowX+350, rightArrowY+50);
    vertex(rightArrowX+350, rightArrowY-50);
    vertex(rightArrowX+100, rightArrowY-50);
    vertex(rightArrowX+100, rightArrowY-50);
    vertex(rightArrowX+100, rightArrowY-100);
  endShape(CLOSE);
  
  beginShape(); // left arrow
    vertex(leftArrowX, leftArrowY);
    vertex(leftArrowX-100, leftArrowY-100);
    vertex(leftArrowX-100, leftArrowY-50);
    vertex(leftArrowX-350, leftArrowY-50);
    vertex(leftArrowX-350, leftArrowY+50);
    vertex(leftArrowX-100, leftArrowY+50);
    vertex(leftArrowX-100, leftArrowY+50);
    vertex(leftArrowX-100, leftArrowY+100);
  endShape(CLOSE);
}

var oldNumGoals = 0;
var oldTimer = 11; 
var keepScore = 0;
var endingNoiseNotPlayed = true; 

function draw() {
  createCanvas(windowWidth,windowHeight); 
  
  // console.log("windowWidth: " + windowWidth);
  // console.log("windowHeight: " + windowHeight);
  
  fill(255,255,255,arrowOpacity); 
  textAlign(CENTER);
  textSize(windowHeight/5);
  text("SWITCH", windowWidth/2, 300);
  textAlign(LEFT);
  drawArrows();
  
  increment = windowHeight/11;
  if (timer == 120) {
    song.stop();
    song.rate(1.05);
    if(!homeNoise.isPlaying()){
        homeNoise.loop(); 
    }  
    
    //console.log(timer);
    oldNumGoals = 0;
    oldTimer = 11;
    endingNoiseNotPlayed = true; 
    image(img, 0, 0, increment*13, increment*9); 
    fill(255,255,255,textOpacity);
    textSize(40);
    text("  Press Down on Controller to Start", increment, increment*9.5);
    if(textOpacity >= 255){
      textDull = true;
    }
    if(textOpacity <= 0){
      textDull = false;
    }
    if(textDull){
      textOpacity -= 4;
    }
    else{
      textOpacity += 4; 
    }
    
    fill(255,255,255);
    textSize(45); 
    textAlign(CENTER);
    text("High Score", increment*16, increment*2);
    text(keepScore,increment*16, increment*3.5);
    stroke(255,255,255);
    noFill();
    rect(increment*16, increment*2.5, increment*4,0);
    
  } else {
    //console.log(switchTime);
    if (switchTime == 1) { 
      animateArrows(); 
      arrowOpacity = 255; 
    } else {
      
      homeNoise.stop(); 
      if(!song.isPlaying()){
        song.loop(); 
      } 
      
      if(timer == 30){
         song.rate(1.2);
      }
      
      if(timer < oldTimer){
         countdownNoise.play(); 
        oldTimer = timer; 
      }
      
      if(timer == 1 && endingNoiseNotPlayed){
        endingNoise.rate(0.7);
        endingNoise.play();
        endingNoiseNotPlayed = false; 
      }
      
      arrowOpacity = 0; 
      //set drawing style
      clear();
      switchTimer = 0;
      background("black");
      fill(255, 255, 255);
      strokeWeight = 1;

      //display the timer and goals
      textSize(windowHeight/10);
      text("Time: " + timer, increment * 12, increment * 3);
      text("Goals: " + numGoals, increment * 12, increment * 5);
      
      //display labels
      for(i=0; i<8; i++){
        textSize(40);
        textAlign(CENTER);
        text(letters[i], increment*(i+1), increment * 9.35);
        textSize(45);
        text(i+1, increment * 9.2, increment * (i+1) + increment/5); 
      }

      //calculate the player's x and y position from the player position value that ranges from 0 to 63
      playerX = (playerPos % 8) * increment + increment;
      playerY = floor(playerPos / 8) * increment + increment;
      
      stroke(255,255,255);
      //draw the white background rectangle
      rectMode(CENTER);
      for (x = 1; x < 9; x++) {
        for (y = 1; y < 9; y++) {
          rect(x * increment, y * increment, increment, increment);
        }
      }

       stroke(0,0,0); 
      //draw the black squares that demarcate the walls of the maze
      fill(0, 0, 0);
      //console.log(whichMaze);
      for (let i = 0; i < mazes[whichMaze].length; i++) {
        rect(
          (mazes[whichMaze][i] % 8) * increment + increment,
          floor(mazes[whichMaze][i] / 8) * increment + increment,
          increment,
          increment
        );
      }
      
      noStroke(); 
      //draw the goal
      fill(0, 255, 0, 0);
      rect(
        (goalPos % 8) * increment + increment,
        floor(goalPos / 8) * increment + increment,
        increment,
        increment
      );

      //draw the player
      fill(0, 0, 255, 0);
      ellipse(playerX, playerY, increment - 15, increment - 15);

      
      if (numGoals > oldNumGoals) {
        //reachedGoal
        oldNumGoals = oldNumGoals + 1;
        expand = true;
        goalNoise.play();
      }
      if (expand) {
        animateRect();
      }
      
      if (opacity > 255) {
        rectSize = 30;
        opacity = 0;
        expand = false;
      }
      if(int(numGoals) > keepScore){
        keepScore = int(numGoals); 
      }
    }
  }
}
function mousePressed() {
  if (mouseX > 0 && mouseX < windowWidth && mouseY > 0 && mouseY < windowHeight) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

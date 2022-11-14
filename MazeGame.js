let serial;

let increment = 65;
let playerX = increment;
let playerY = 6*increment;

let movedUp = 0;
let movedDown = 0;
let movedLeft = 0;
let movedRight = 0;

let whichMaze = 3; // 5 mazes indexed from 0-4

let numGoals = 0;
let isOnGoal = 0;
let isTimeUp = 0;
let timer = 0;

// Maze Walls
let mazes = [];
let wallInfo = [];

// different mazes do not have the same number of walls
let maze1_x = [];
let maze1_y = []; 
let maze2_x = [];
let maze2_y = []; 
let maze3_x = [];
let maze3_y = [];
let maze4_x = [];
let maze4_y = [];
let maze5_x = [];
let maze5_y = [];

function setup() {
 createCanvas(increment*9, increment*9);

 serial = new p5.SerialPort();

 serial.list();
 //serial.open('/dev/tty.usbmodem142101');
  serial.open('COM7');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
  
  
  let i = increment; 
  maze1_x = [2*i, 4*i, 5*i, 6*i,
             2*i, 5*i,
             2*i, 3*i, 5*i, 6*i,
             6*i, 7*i,
             1*i, 2*i, 4*i,
             2*i, 4*i, 5*i, 6*i, 7*i,
             2*i, 4*i,
             4*i, 7*i, 8*i
            ];
  maze1_y = [1*i, 1*i, 1*i, 1*i,
             2*i, 2*i,
             3*i, 3*i, 3*i, 3*i,
             4*i, 4*i,
             5*i, 5*i, 5*i,
             6*i, 6*i, 6*i, 6*i, 6*i,
             7*i, 7*i,
             8*i, 8*i, 8*i
            ];
  maze2_x = [1*i, 2*i, 3*i, 7*i,
             5*i,
             2*i, 3*i, 4*i, 5*i, 6*i, 7*i, 8*i,
             6*i,
             1*i, 2*i, 6*i,
             2*i, 3*i, 4*i,
             4*i, 5*i, 6*i, 7*i
            ];
  maze2_y = [1*i, 1*i, 1*i, 1*i,
             2*i,
             3*i, 3*i, 3*i, 3*i, 3*i, 3*i, 3*i,
             4*i,
             5*i, 5*i, 5*i,
             6*i, 6*i, 6*i,
             7*i, 7*i, 7*i, 7*i
            ];
  maze3_x = [1*i, 8*i,
             1*i, 2*i, 3*i, 4*i, 7*i, 8*i,
             2*i,
             2*i, 4*i, 5*i, 7*i,
             4*i, 5*i, 6*i, 7*i,
             2*i, 4*i,
             1*i, 2*i, 3*i, 4*i, 7*i, 8*i,
             8*i
            ];
  maze3_y = [1*i, 1*i,
             2*i, 2*i, 2*i, 2*i, 2*i, 2*i,
             3*i,
             4*i, 4*i, 4*i, 4*i,
             5*i, 5*i, 5*i, 5*i,
             6*i, 6*i,
             7*i, 7*i, 7*i, 7*i, 7*i, 7*i,
             8*i
            ];
  maze4_x = [4*i, 6*i, 8*i,
             2*i, 4*i,
             2*i, 4*i, 6*i, 7*i,
             2*i, 4*i, 6*i,
             1*i, 2*i, 6*i,
             5*i, 6*i, 7*i,
             1*i, 2*i, 3*i, 6*i,
             6*i
            ];
  maze4_y = [1*i, 1*i, 1*i,
             2*i, 2*i,
             3*i, 3*i, 3*i, 3*i,
             4*i, 4*i, 4*i,
             5*i, 5*i, 5*i,
             6*i, 6*i, 6*i,
             7*i, 7*i, 7*i, 7*i,
             8*i
            ];
  maze5_x = [2*i,
             2*i, 3*i, 5*i, 8*i,
             3*i, 5*i, 7*i, 8*i,
             5*i,
             2*i, 3*i, 4*i, 5*i, 6*i, 7*i,
             2*i, 7*i,
             4*i, 7*i,
             1*i, 2*i, 3*i, 4*i, 6*i, 7*i
            ];
  maze5_y = [1*i,
             2*i, 2*i, 2*i, 2*i,
             3*i, 3*i, 3*i, 3*i,
             4*i,
             5*i, 5*i, 5*i, 5*i, 5*i, 5*i,
             6*i, 6*i,
             7*i, 7*i,
             8*i, 8*i, 8*i, 8*i, 8*i, 8*i
            ];
  
  wallInfo = [maze1_x, maze1_y,
              maze2_x, maze2_y,
              maze3_x, maze3_y, 
              maze4_x, maze4_y, 
              maze5_x, maze5_y]; 
  
   
  let mazeNum = 0;
  for(a = 0; a < wallInfo.length; a +=2) {
    mazes[mazeNum] = [];
    mazes[mazeNum][0] = wallInfo[a];
    mazes[mazeNum][1] = wallInfo[a + 1];
    mazeNum ++; 
  }
  // print(mazes); 
  
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

function gotClose(){
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

    //set variables equal to appropriate index of the array
    movedUp = int(gameData[0]);
    movedDown = int(gameData[1]);
    movedLeft = int(gameData[2]);
    movedRight = int(gameData[3]);
    // whichMaze = int(gameData[4]);
    // numGoals = int(gameData[5]);
    // isOnGoal = boolean(gameData[6]);
    // isTimeUp = boolean(gameData[7]);
    // timer = int(gameData[8]);
    
  }
  trim(currentString);
  if (!currentString) return;
  latestData = currentString;
}

function draw() {
  clear();
  background("black");
  fill(255,255,255);
  strokeWeight = 1;
  // stroke(0,0,0);
  noStroke(); 
  
  rectMode(CENTER);
  for (x = 1; x < 9; x++){
    for (y = 1; y < 9; y++){
      rect(x * increment, y * increment, increment, increment)
    }
  }
  
  //loading a maze
  var emptySpace = true;
  let mazeLength = mazes[whichMaze][0].length;
  let chosenMazeX = mazes[whichMaze][0];
  let chosenMazeY = mazes[whichMaze][1];
  for(p = 0; p < mazeLength; p++){
    fill("black"); 
    rect(chosenMazeX[p], chosenMazeY[p], increment, increment);
  }
  
  if (movedRight == 1 && playerX < 8*increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX + increment && chosenMazeY[p] == playerY) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerX += increment;
    }  
  }
  
  if (movedLeft == 1 && playerX > increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX - increment && chosenMazeY[p] == playerY) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerX -= increment;
    }  
  }
  
  if (movedUp == 1 && playerY > increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX && chosenMazeY[p] == playerY - increment) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerY -= increment;
    }
  }
  
  if (movedDown == 1 && playerY < 8*increment){
     for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX && chosenMazeY[p] == playerY + increment) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerY += increment;
    } 
  }
  
  
  fill("lightblue");
  ellipse(playerX, playerY, increment-15, increment-15);
  
  
  //console.log(movedDown);
}

function keyPressed(){
  var emptySpace = true;
  let mazeLength = mazes[whichMaze][0].length;
  let chosenMazeX = mazes[whichMaze][0];
  let chosenMazeY = mazes[whichMaze][1];
  if(keyCode === UP_ARROW && playerY > increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX && chosenMazeY[p] == playerY - increment) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerY -= increment;
    }
  }
  if(keyCode === DOWN_ARROW && playerY < 8*increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX && chosenMazeY[p] == playerY + increment) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerY += increment;
    } 
  }
  if(keyCode === LEFT_ARROW && playerX > increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX - increment && chosenMazeY[p] == playerY) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerX -= increment;
    }  
  }
  if(keyCode === RIGHT_ARROW && playerX < 8*increment){
    for(p = 0; p < mazeLength; p++){ 
      if(chosenMazeX[p] == playerX + increment && chosenMazeY[p] ==     playerY) {
        emptySpace = false; 
        break;
      }
    }
    if(emptySpace) {
      playerX += increment;
    }   
  }
}

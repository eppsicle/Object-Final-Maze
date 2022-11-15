//THIS IS THE FILE WHERE WE ARE TRYING TO GET THE PLAYER POSITION TO MATCH THE NEOPIXEL SYSTEM
let serial;

let increment = 65;
let playerX = increment;
let playerY = 6*increment;

let movedUp = 0;
let movedDown = 0;
let movedLeft = 0;
let movedRight = 0;

let playerPos = 0;

let whichMaze = 0; // 5 mazes indexed from 0-4

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
let maze1 = [];

function setup() {
 createCanvas(increment*9, increment*9);

 serial = new p5.SerialPort();

 serial.list();
 serial.open('COM7');
  //serial.open('COM7');

 serial.on('connected', serverConnected);

 serial.on('list', gotList);

 serial.on('data', gotData);

 serial.on('error', gotError);

 serial.on('open', gotOpen);

 serial.on('close', gotClose);
  
  
  let i = increment; 
  
  maze1 = [1, 3, 4, 5, 9, 12, 17, 18, 20, 21, 29, 30, 32, 33, 35, 41, 43, 44, 45, 46, 49, 51, 59, 62, 63];
  maze2 = [0, 1, 2, 6, 12, 17, 18, 19, 20, 21, 22, 23, 29, 32, 33, 37, 41, 42, 43, 51, 52, 53, 54];
maze3 = [0, 7, 8, 9, 10, 11, 14, 15, 17, 25, 27, 28, 30, 35, 36, 37, 38, 41, 43, 48, 49, 50, 51, 54, 55, 63];
maze4 = [3, 5, 7, 9, 11, 17, 19, 21, 22, 25, 27, 29, 32, 33, 37, 44, 45, 46, 48, 49, 50, 53, 61];
maze5 = [1, 9, 10, 12, 15, 18, 20, 22, 23, 28, 33, 34, 35, 36, 37, 38, 41, 46, 51, 54, 56, 57, 58, 59, 61, 62];
  
  mazes[0] = maze1;
  mazes[1] = maze2;
  mazes[2] = maze3;
  mazes[3] = maze4;
  mazes[4] = maze5;
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

    // //set variables equal to appropriate index of the array
    // movedUp = int(gameData[1]);
    // movedDown = int(gameData[2]);
    // movedLeft = int(gameData[3]);
    // movedRight = int(gameData[4]);
    // // whichMaze = int(gameData[4]);
    // // numGoals = int(gameData[5]);
    // // isOnGoal = boolean(gameData[6]);
    // // isTimeUp = boolean(gameData[7]);
    
    timer = int(gameData[0]);
    playerPos = int(gameData[1]);
    whichMaze = int(gameData[2]);
    numGoals = int(gameData[3]);
    isOnGoal = int(gameData[4]);
    isTimeUp = int(gameData[5]);
    
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
  
  playerX = (playerPos % 8) * increment + increment;
  playerY = (floor(playerPos / 8)) * increment + increment;
  
  rectMode(CENTER);
  for (x = 1; x < 9; x++){
    for (y = 1; y < 9; y++){
      rect(x * increment, y * increment, increment, increment)
    }
  }
  
  fill(0,0,0);
  for (let i = 0; i < mazes[whichMaze].length; i ++){
    rect((mazes[whichMaze][i] % 8)* increment + increment, (floor(mazes[whichMaze][i] / 8)) * increment +increment, increment, increment)
  }
  fill(0,255,0);
  rect((isTimeUp % 8)* increment + increment, (floor(isTimeUp / 8)) * increment +increment, increment, increment)
  
  //loading a maze
//   var emptySpace = true;
//   let mazeLength = mazes[whichMaze][0].length;
//   let chosenMazeX = mazes[whichMaze][0];
//   let chosenMazeY = mazes[whichMaze][1];
//   for(p = 0; p < mazeLength; p++){
//     fill("black"); 
//     rect(chosenMazeX[p], chosenMazeY[p], increment, increment);
//   }
  
//   if (movedRight == 1 && playerX < 8*increment){
//     for(p = 0; p < mazeLength; p++){ 
//       if(chosenMazeX[p] == playerX + increment && chosenMazeY[p] == playerY) {
//         emptySpace = false; 
//         break;
//       }
//     }
//     if(emptySpace) {
//       playerX += increment;
//     }  
//   }
  
//   if (movedLeft == 1 && playerX > increment){
//     for(p = 0; p < mazeLength; p++){ 
//       if(chosenMazeX[p] == playerX - increment && chosenMazeY[p] == playerY) {
//         emptySpace = false; 
//         break;
//       }
//     }
//     if(emptySpace) {
//       playerX -= increment;
//     }  
//   }
  
//   if (movedUp == 1 && playerY > increment){
//     for(p = 0; p < mazeLength; p++){ 
//       if(chosenMazeX[p] == playerX && chosenMazeY[p] == playerY - increment) {
//         emptySpace = false; 
//         break;
//       }
//     }
//     if(emptySpace) {
//       playerY -= increment;
//     }
//   }
  
//   if (movedDown == 1 && playerY < 8*increment){
//      for(p = 0; p < mazeLength; p++){ 
//       if(chosenMazeX[p] == playerX && chosenMazeY[p] == playerY + increment) {
//         emptySpace = false; 
//         break;
//       }
//     }
//     if(emptySpace) {
//       playerY += increment;
//     } 
//   }
  
  
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

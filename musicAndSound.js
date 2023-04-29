// Sound built into the goal animation

var goalNoise; 
var song; 
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

function preload() {
  goalNoise = loadSound('goalNoise.mp3');
  song = loadSound('for-elevator-jazz-music-124005.mp3');
}

function draw() { 
  // if the song isn't playing, play the song
  // can basically loop through the song indefinitely 
  
  // if (!song.isPlaying()){ 
  //   song.play(); 
  // }
  
  // toggle the song on and off by moving the mouse
  if(mouseX > 200){ 
    if(!song.isPlaying()){
      song.play(); 
    } 
  }
  else{
    song.stop(); 
  } 
  
  //song.pause(); will pause the music, song.play() afterward will resume where it left off
  //song.stop(); will stop the music, song.play() afterward will restart the song  
  
  rectMode(CENTER); 
  background("black");
  noStroke();
  
  if(keyIsPressed === true){ // equivalent would be if the goal is reached
    expand = true; 
    goalNoise.play();  
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

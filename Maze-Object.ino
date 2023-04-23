// Neopixel Stuff
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif

//define the digital pin that the LED strip is connected to
#define PIN 13

//the first parameter is the number of LEDs you have - change for your strip
Adafruit_NeoPixel strip = Adafruit_NeoPixel(64, PIN, NEO_GRB + NEO_KHZ800);

const int downPin = 2;
const int rightPin = 4;
const int leftPin = 6;
const int upPin = 8;
int downVal = 0;
int rightVal = 0;
int leftVal = 0;
int upVal = 0;

struct maze{
  int mazeNumber;
  int startPos; 
  int goal;
  int mazeArrayLen;
  int mazeArray[64];
};

int timer = 120;
int timerCounter = 0;

bool downButtonDown = false;
bool leftButtonDown = false;
bool rightButtonDown = false;
bool upButtonDown = false;
int characterPos = 0;

int numGoals = 0;
bool isOnGoal = false;
bool isTimeUp = false;
bool switchTime = false;

  maze maze1 = {1, 0, 7, 26, {1, 3, 4, 5, 9, 12, 17, 18, 20, 21, 29, 30, 32, 33, 35, 41, 43, 44, 45, 46, 49, 51, 59, 62, 63, 63}};
  maze maze2 = {2, 7, 56, 26, {0, 1, 2, 6, 12, 17, 18, 19, 20, 21, 22, 23, 29, 32, 33, 37, 41, 42, 43, 51, 52, 53, 54, 54, 54, 54}};
  maze maze3 = {3, 56, 16, 26, {0, 7, 8, 9, 10, 11, 14, 15, 17, 25, 27, 28, 30, 35, 36, 37, 38, 41, 43, 48, 49, 50, 51, 54, 55, 63}};
  maze maze4 = {4, 16, 63, 26, {3, 5, 7, 9, 11, 17, 19, 21, 22, 25, 27, 29, 32, 33, 37, 44, 45, 46, 48, 49, 50, 53, 61, 61, 61, 61}};
  maze maze5 = {5, 63, 0, 26, {1, 9, 10, 12, 15, 18, 20, 22, 23, 28, 33, 34, 35, 36, 37, 38, 41, 46, 51, 54, 56, 57, 58, 59, 61, 62}};
  maze maze6 = {6, 27, 29, 24, {4, 5, 7, 17, 18, 19, 20, 21, 23, 25, 28, 33, 35, 36, 37, 38, 39, 41, 49, 50, 51, 52, 54, 55}};
  maze maze7 = {7, 58, 4, 23, {3, 9, 12, 13, 17, 18, 21, 23, 26, 27, 29, 34, 37, 38, 40, 42, 43, 45, 51, 57, 59, 61, 63}};
  maze maze8 = {8, 16, 32, 21, {9, 11, 14, 17, 19, 24, 25, 27, 30, 33, 34, 35, 38, 41, 43, 46, 49, 51, 52, 53, 54}};
  maze maze9 = {9, 30, 41, 15, {0, 6, 10, 13, 17, 20, 26, 29, 35, 38, 44, 51, 55, 58, 62}};
  maze maze10 = {10, 8, 59, 11, {16, 17, 18, 20, 21, 22, 25, 29, 42, 43, 44}};
  maze maze11 = {11, 32, 27, 13, {6, 9, 14, 19, 20, 26, 29, 34, 43, 44, 49, 54, 57}};
  maze mazes[11] = {maze1, maze2, maze3, maze4, maze5, maze6, maze7, maze8, maze9, maze10, maze11};

int whichMaze = 0; //Always start on maze 1 (0)
int prevMaze = -1; // just intially choosing a number that isn't a maze number

void setup() {
  // put your setup code here, to run once:
  strip.begin();
  strip.show();
  
  randomSeed(analogRead(12)); 
  pinMode(downPin, INPUT);
  pinMode(rightPin, INPUT);
  pinMode(leftPin, INPUT);
  pinMode(upPin, INPUT);
  
  Serial.begin(9600);
}

bool emptySpaceExists(int position, int whichMaze1){ //Take in the new position, not the current position 
  int arrLen = mazes[whichMaze1].mazeArrayLen; //Length is stored in the maze struct
  for(int i = 0; i < arrLen; i++) {
    if(position == mazes[whichMaze1].mazeArray[i]){ //Make sure the new position isnt a wall
      return false; 
    }
  }
return true;   
}

void chooseNewMaze(){ // will change the global variable whichMaze into a random maze number
  prevMaze = whichMaze; 
  int numOfMazes = 11;
  int newMaze = random(0,numOfMazes); // first parameter of random() is inclusive, second parameter is not inclusive
  while(newMaze == prevMaze){ //makes sure that players don't play the same maze in a row while randomizing the order
    newMaze = random(0,numOfMazes); 
  }
  whichMaze = newMaze; 
}

void timeToSwitch(){
  int miniTimer = 0;
  while(miniTimer != 300){
    Serial.print(timer);
    Serial.print(',');
    Serial.print(characterPos);
    Serial.print(',');
    Serial.print(whichMaze);
    Serial.print(',');
    Serial.print(numGoals);
    Serial.print(',');
    Serial.print(true);
    Serial.print(',');
    Serial.print(mazes[whichMaze].goal);
    Serial.print(',');
    Serial.println(true);
    miniTimer++;
    strip.setPixelColor(floor(miniTimer/4.6875), 255, 0, 0);
    strip.show();
  }
  for (int i = 0; i < 64; i++){
    strip.setPixelColor(i, 0, 0, 0);
  }
  strip.show();
  
}

void startScreen(){
  int miniTimer = 0;
  while(miniTimer != 600){
    miniTimer++;
    strip.setPixelColor(floor(miniTimer/4.6875),  255,255,0);
    strip.show();
  }
  miniTimer = 0;
  while(miniTimer != 600){
    miniTimer++;
    strip.setPixelColor(floor(miniTimer/8), 0, 0, 0);
    strip.show();
  }
}

void loop() {
    downVal = digitalRead(downPin);
    rightVal = digitalRead(rightPin);
    leftVal = digitalRead(leftPin);
    upVal = digitalRead(upPin);

    for (int i = 0; i < 64; i++){
        strip.setPixelColor(i, 0, 0, 0);
      }
      strip.show();
    
    if((characterPos != 0 || timer != 120)){ //Game is running
      timerCounter++;
      strip.setPixelColor(characterPos, 0, 0, 255);
      strip.setPixelColor(mazes[whichMaze].goal, 0, 255, 0);
      strip.show();
      if (timerCounter%60 == 0){
        timer--;
      }
      if (timer == 0){ //game is over
        characterPos = 0;
        whichMaze = 0;
        timer = 120;
        numGoals = 0;
        for (int i = 0; i < 64; i++){
          strip.setPixelColor(i, 255, 255, 0);
        }
        strip.show();
      }
    }
    else{//Game is not running
      for (int i = 0; i < 64; i+=2){
        if(int(floor(i/8)) % 2 == 0){//Even row
          strip.setPixelColor(i, 255, 255, 0);
          strip.setPixelColor(i+1, 0, 0, 255);
        }
        else{ //odd Rows light up odds
          strip.setPixelColor(i, 0, 0, 255);
          strip.setPixelColor(i+1, 255, 255, 0);
        }
      }
      strip.show();
      
    }


    
      Serial.print(timer); // time
      Serial.print(',');
      Serial.print(characterPos);
      Serial.print(',');
      Serial.print(whichMaze);
      Serial.print(',');
      Serial.print(numGoals);
      Serial.print(',');
      Serial.print(0); // have you reached goal
      Serial.print(',');
      Serial.print(mazes[whichMaze].goal);
      Serial.print(',');
      Serial.println(false);
      
      
  
      if (characterPos == mazes[whichMaze].goal){
        numGoals++;
        for (int i = 0; i < 64; i++){
          strip.setPixelColor(i, 0, 0, 0);
        }
        strip.setPixelColor(mazes[whichMaze].goal, 0, 0, 0);
        strip.show();
        Serial.print(timer);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(1);
        Serial.print(',');
        Serial.print(mazes[whichMaze].goal);
        Serial.print(',');
        Serial.println(false);
        if(numGoals % 5 != 0){
          chooseNewMaze();
          characterPos = mazes[whichMaze].startPos; 
        }
        else{
          timeToSwitch();
          chooseNewMaze(); 
          characterPos = mazes[whichMaze].startPos; 
        }
      }
      
      
      if (upVal == 1 && upButtonDown == false && characterPos - 8 >= 0 && emptySpaceExists(characterPos-8, whichMaze)){

        upButtonDown = true;
        strip.setPixelColor(characterPos, 0, 0, 0);
        strip.show();
        Serial.print(timer);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(mazes[whichMaze].goal);
        Serial.print(',');
      Serial.println(false);
        characterPos = characterPos - 8;
        
      }
      if (upVal == 0 && upButtonDown == true){
        upButtonDown = false;
      }  
  
      if (downVal == 1 && downButtonDown == false && characterPos + 8 <= 63 && emptySpaceExists(characterPos+8, whichMaze)){
        downButtonDown = true;
        strip.setPixelColor(characterPos, 0, 0, 0);
        strip.show();
        Serial.print(timer);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
         Serial.print(mazes[whichMaze].goal);
      Serial.print(',');
      Serial.println(false);
        characterPos = characterPos + 8;
      }
      if (downVal == 0 && downButtonDown == true){
        downButtonDown = false;
      }  
  
      if (leftVal == 1 && leftButtonDown == false && characterPos % 8 != 0 && emptySpaceExists(characterPos-1, whichMaze)){
        leftButtonDown = true;
        strip.setPixelColor(characterPos, 0, 0, 0);
        strip.show();
        Serial.print(timer);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(mazes[whichMaze].goal);
        Serial.print(',');
        Serial.println(false);
        characterPos--;
      }
      if (leftVal == 0 && leftButtonDown == true){
        leftButtonDown = false;
      }  
  
      if (rightVal == 1 && rightButtonDown == false && characterPos % 8 != 7&& emptySpaceExists(characterPos+1, whichMaze)){
        rightButtonDown = true;
        strip.setPixelColor(characterPos, 0, 0, 0);
        strip.show();
        Serial.print(timer);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
         Serial.print(mazes[whichMaze].goal);
      Serial.print(',');
      Serial.println(false);
        characterPos++;
      }
      if (rightVal == 0 && rightButtonDown == true){
        rightButtonDown = false;
      }  
}

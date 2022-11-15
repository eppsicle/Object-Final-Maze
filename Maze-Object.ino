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
  int goal;
  int mazeArray[64];
};

int timer = 0;
int timerCounter = 0;

bool downButtonDown = false;
bool leftButtonDown = false;
bool rightButtonDown = false;
bool upButtonDown = false;
int characterPos = 0;

int whichMaze = 1;
int numGoals = 0;
bool isOnGoal = false;
bool isTimeUp = false;

maze maze1 = {1, 7, {1, 3, 4, 5, 9, 12, 17, 18, 20, 21, 29, 30, 32, 33, 35, 41, 43, 44, 45, 46, 49, 51, 59, 62, 63}};
  maze maze2 = {2, 56, {0, 1, 2, 6, 12, 17, 18, 19, 20, 21, 22, 23, 29, 32, 33, 37, 41, 42, 43, 51, 52, 53, 54}};
  maze maze3 = {3, 16, {0, 7, 8, 9, 10, 11, 14, 15, 17, 25, 27, 28, 30, 35, 36, 37, 38, 41, 43, 48, 49, 50, 51, 54, 55, 63}};
  maze maze4 = {4, 63, {3, 5, 7, 9, 11, 17, 19, 21, 22, 25, 27, 29, 32, 33, 37, 44, 45, 46, 48, 49, 50, 53, 61}};
  maze maze5 = {5, 0, {1, 9, 10, 12, 15, 18, 20, 22, 23, 28, 33, 34, 35, 36, 37, 38, 41, 46, 51, 54, 56, 57, 58, 59, 61, 62}};
  maze mazes[5] = {maze1, maze2, maze3, maze4, maze5};



void setup() {
  // put your setup code here, to run once:
  pinMode(downPin, INPUT);
  pinMode(rightPin, INPUT);
  pinMode(leftPin, INPUT);
  pinMode(upPin, INPUT);
  
  Serial.begin(9600);
  /*
  for (int i = 1; i <= 64; i++){
    mazeArray[i] = 'X';
    if (i % 8 == 0){
        Serial.println(mazeArray[i]);
      }
      else{
        Serial.print(mazeArray[i]);
      }
  }
  */

  
  /*
  maze1.mazeNumber = 1;
maze2.mazeNumber = 2;
maze3.mazeNumber = 3;
maze4.mazeNumber = 4;
maze5.mazeNumber = 5;
maze1.goal = 7;
maze2.goal = 56;
maze3.goal = 16;
maze4.goal = 63;
maze5.goal = 0;
maze1.mazeArray = {1, 3, 4, 5, 9, 12, 17, 18, 20, 21, 29, 30, 32, 33, 35, 41, 43, 44, 45, 46, 49, 51, 59, 62, 63};
maze2.mazeArray = {0, 1, 2, 6, 12, 17, 18, 19, 20, 21, 22, 23, 29, 32, 33, 37, 41, 42, 43, 51, 52, 53, 54};
maze3.mazeArray = {0, 7, 8, 9, 10, 11, 14, 15, 17, 25, 27, 28, 30, 35, 36, 37, 38, 41, 43, 48, 49, 50, 51, 54, 55, 63};
maze4.mazeArray = {3, 5, 7, 9, 11, 17, 19, 21, 22, 25, 27, 29, 32, 33, 37, 44, 45, 46, 48, 49, 50, 53, 61};
maze5.mazeArray = {1, 9, 10, 12, 15, 18, 20, 22, 23, 28, 33, 34, 35, 36, 37, 38, 41, 46, 51, 54, 56, 57, 58, 59, 61, 62};
maze mazes[5] = {maze1, maze2, maze3, maze4, maze5};
*/
}

bool emptySpaceExists(int position, int walls[]){
  for(int i = 0; i<25; i++) {
    if(position == walls[i]){
      return false; 
    }
  }
return true;   
}

void loop() {
    downVal = digitalRead(downPin);
    rightVal = digitalRead(rightPin);
    leftVal = digitalRead(leftPin);
    upVal = digitalRead(upPin);
    
    if((characterPos != 0 || timer != 0) && (isTimeUp == false)){
      timerCounter++;
      if (timerCounter%60 == 0){
        timer++;
      }
      if (timer == 60){
        isTimeUp = true;
        characterPos = 0;
        
      }
    }
      
      Serial.print(timer); // time
      Serial.print(',');
      Serial.print(0); // up
      Serial.print(',');
      Serial.print(0); // down
      Serial.print(',');
      Serial.print(0); // left
      Serial.print(',');
      Serial.print(0); // right
      Serial.print(',');
      Serial.print(characterPos);
      Serial.print(',');
      Serial.print(whichMaze);
      Serial.print(',');
      Serial.print(numGoals);
      Serial.print(',');
      Serial.print(false); // have you reached goal
      Serial.print(',');
      Serial.println(isTimeUp);
  
      if (characterPos == mazes[whichMaze-1].goal){
        numGoals++;
        Serial.print(timer);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(true);
        Serial.print(',');
        Serial.println(isTimeUp);
        if(whichMaze != 5){
          whichMaze = whichMaze+1;
        }
        else{
          whichMaze = 1;
        }
      }
      
      
      if (upVal == 1 && upButtonDown == false && characterPos - 8 >= 0 && emptySpaceExists(characterPos-8, mazes[whichMaze-1].mazeArray)){

        upButtonDown = true;
        Serial.print(timer);
        Serial.print(',');
        Serial.print(1);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(true);
        Serial.print(',');
        Serial.println(isTimeUp);
        characterPos = characterPos - 8;
        
      }
      if (upVal == 0 && upButtonDown == true){
        upButtonDown = false;
      }  
  
      if (downVal == 1 && downButtonDown == false && characterPos + 8 <= 63 && emptySpaceExists(characterPos+8, mazes[whichMaze-1].mazeArray)){
        downButtonDown = true;
        Serial.print(timer);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(1);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(true);
        Serial.print(',');
        Serial.println(isTimeUp);
        characterPos = characterPos + 8;
      }
      if (downVal == 0 && downButtonDown == true){
        downButtonDown = false;
      }  
  
      if (leftVal == 1 && leftButtonDown == false && characterPos % 8 != 0 && emptySpaceExists(characterPos-1, mazes[whichMaze-1].mazeArray)){
        leftButtonDown = true;
        Serial.print(timer);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(1);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(true);
        Serial.print(',');
        Serial.println(isTimeUp);
        characterPos--;
      }
      if (leftVal == 0 && leftButtonDown == true){
        leftButtonDown = false;
      }  
  
      if (rightVal == 1 && rightButtonDown == false && characterPos % 8 != 7&& emptySpaceExists(characterPos+1, mazes[whichMaze-1].mazeArray)){
        rightButtonDown = true;
        Serial.print(timer);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(0);
        Serial.print(',');
        Serial.print(1);
        Serial.print(',');
        Serial.print(characterPos);
        Serial.print(',');
        Serial.print(whichMaze);
        Serial.print(',');
        Serial.print(numGoals);
        Serial.print(',');
        Serial.print(true);
        Serial.print(',');
        Serial.println(isTimeUp);
        characterPos++;
      }
      if (rightVal == 0 && rightButtonDown == true){
        rightButtonDown = false;
      }  
}

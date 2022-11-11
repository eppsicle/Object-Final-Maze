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
  char mazeArray[64];
};

maze mazes[5];
int numOfGoals = 0;
bool isOnGoal = false;

int timer = 0;

bool downButtonDown = false;
bool leftButtonDown = false;
bool rightButtonDown = false;
bool upButtonDown = false;

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
}

void loop() {
    downVal = digitalRead(downPin);
    rightVal = digitalRead(rightPin);
    leftVal = digitalRead(leftPin);
    upVal = digitalRead(upPin);
    
    Serial.print(0);
    Serial.print(',');
    Serial.print(0);
    Serial.print(',');
    Serial.print(0);
    Serial.print(',');
    Serial.println(0);
    
    if (upVal == 1 && upButtonDown == false){
      upButtonDown = true;
      Serial.print(1);
      Serial.print(',');
      Serial.print(0);
      Serial.print(',');
      Serial.print(0);
      Serial.print(',');
      Serial.println(0);
    }
    if (upVal == 0 && upButtonDown == true){
      upButtonDown = false;
    }  

    if (downVal == 1 && downButtonDown == false){
      downButtonDown = true;
      Serial.print(0);
      Serial.print(',');
      Serial.print(1);
      Serial.print(',');
      Serial.print(0);
      Serial.print(',');
      Serial.println(0);
    }
    if (downVal == 0 && downButtonDown == true){
      downButtonDown = false;
    }  

    if (leftVal == 1 && leftButtonDown == false){
      leftButtonDown = true;
      Serial.print(0);
      Serial.print(',');
      Serial.print(0);
      Serial.print(',');
      Serial.print(1);
      Serial.print(',');
      Serial.println(0);
    }
    if (leftVal == 0 && leftButtonDown == true){
      leftButtonDown = false;
    }  

    if (rightVal == 1 && rightButtonDown == false){
      rightButtonDown = true;
      Serial.print(0);
      Serial.print(',');
      Serial.print(0);
      Serial.print(',');
      Serial.print(0);
      Serial.print(',');
      Serial.println(1);

    }
    if (rightVal == 0 && rightButtonDown == true){
      rightButtonDown = false;
    }  
}

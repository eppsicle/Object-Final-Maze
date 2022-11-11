const int downPin = 2;
const int rightPin = 4;
const int leftPin = 6;
const int upPin = 8;
int downVal = 0;
int rightVal = 0;
int leftVal = 0;
int upVal = 0;

char mazeArray[64];
int timer = 0;

void setup() {
  pinMode(downPin, INPUT);
  pinMode(rightPin, INPUT);
  pinMode(leftPin, INPUT);
  pinMode(upPin, INPUT);
  
  Serial.begin(9600);
}

void loop() {
  downVal = digitalRead(downPin);
  rightVal = digitalRead(rightPin);
  leftVal = digitalRead(leftPin);
  upVal = digitalRead(upPin);
}

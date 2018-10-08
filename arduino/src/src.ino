/*
  Alexa LED Control

  A simple program which recieves serial data to switch
  a light on or off.
  
*/
 
int led = 13;

// Control Keys
char steerLeft = 'a';
char steerRight = 's'; 

// initialisation of program
void setup() { 
  pinMode(led, OUTPUT); 
  Serial.begin(9600);
}

void lightControl() {
  if (Serial.available()) {
    char ch = Serial.read();
    if (ch == steerLeft) {
      Serial.write("steer left");
      digitalWrite(led, HIGH);
    }
    if (ch == steerRight) {
      Serial.write("steer right"); 
      digitalWrite(led, LOW);
    }
  }
}

void loop() {
  lightControl();
}


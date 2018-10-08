/*
  Alexa LED Control

  A simple program which recieves serial data to switch
  a light on or off.
  
*/
 
int led = 13;

// Control Keys
char lightOn = 'a';
char lightOff = 's'; 

// initialisation of program
void setup() { 
  pinMode(led, OUTPUT); 
  Serial.begin(9600);
}

void lightControl() {
  if (Serial.available()) {
    char ch = Serial.read();
    if (ch == lightOn) {
      Serial.write("light on");
      digitalWrite(led, HIGH);
    }
    if (ch == lightOff) {
      Serial.write("light off"); 
      digitalWrite(led, LOW);
    }
  }
}

void loop() {
  lightControl();
}


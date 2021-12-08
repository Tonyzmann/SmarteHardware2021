#include <Adafruit_NeoPixel.h>
#include "Arduino.h"
#include "SoftwareSerial.h"
#include "DFRobotDFPlayerMini.h"

//Setup for DFPlayer

SoftwareSerial mySoftwareSerial(10, 11); // RX, TX
DFRobotDFPlayerMini myDFPlayer;

// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1:
#define LED_PIN    3

// How many NeoPixels are attached to the Arduino?
#define LED_COUNT 64

// Declare our NeoPixel strip object:
Adafruit_NeoPixel matrix(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

char message = '2';
int wait = 0;
const long interval = 5000;
unsigned long timeStart = 0;

void mood(int moodID){
  unsigned long timeCurrent = millis();
  if (timeCurrent - timeStart >= interval) {
    timeStart = timeCurrent;

    resetAllLED();
  
    if(moodID == 3){
      matrix.setBrightness(150);
      myDFPlayer.play(3);
      setHappyFace();       //Calls Happy Face
      
    }else if(moodID == 2){
    matrix.setBrightness(255);
      myDFPlayer.play(2);
      setNeutralFace();     //Calls Neutral Face
      
    }else if(moodID == 1){
      matrix.setBrightness(150);
      myDFPlayer.play(1);
      setMadFace();         //Calls Mad Face
      
    }else{
      matrix.setBrightness(150);
      setFailure();         //if there is an error (the moodID value is no 1, 0 or -1): an giant red X is schown on the matrix
    }    
  }  
}

//sets the happy Face
//input: 
//Methods called: setRightEye, setLeftEye, setHappyMouth
//Color Sheme: Green (0, 255, 0) 

void setHappyFace(){
  setHappyMouth();
  if(random(0, 2) == 1){ //random(0, 10)
    blinkLeftEye(0, 255, 0);
  }else{
    setLeftEye(0, 255, 0);
    setRightEye(0, 255, 0);
  }
  matrix.show();
}

//defines the Happy mouth with Happy Color Sheme: GREEN (0,255,0)

void setHappyMouth(){
  matrix.setPixelColor(41, 0, 255, 0);
  matrix.setPixelColor(46, 0, 255, 0);
  for(int i = 50; i < 54; i++){
    matrix.setPixelColor(i, 0, 255, 0);
  }
}

//sets the neutral Face
//input: 
//Methods called: setRightEye, setLeftEye, setNeutralMouth
//Color Sheme: WHITE (255, 255, 255)

void setNeutralFace(){
  setRightEye(255, 255, 255);
  setLeftEye(255, 255, 255);
  setNeutralMouth();
  matrix.show();
}

//defines the Neutral mouth with Neutral Color Sheme: WHITE (255,255,255)

void setNeutralMouth(){
  for(int i = 41; i < 47; i++){
    matrix.setPixelColor(i, 255, 255, 255);
  }
}

//sets the mad Face
//input: 
//Methods called: setRightEye, setLeftEye, setMadMouth
//Color Sheme: RED (200, 0, 0)

void setMadFace(){
  setRightEye(150, 0, 0);
  setLeftEye(150, 0, 0);
  setMadMouth();
  matrix.show();
}

//defines the Mad mouth with Mad Color Sheme: RED (255,0,0)

void setMadMouth(){
  matrix.setPixelColor(49, 150, 0, 0);
  for(int i = 42; i < 46; i++){
    matrix.setPixelColor(i, 150, 0, 0);
  }
  matrix.setPixelColor(54, 150, 0, 0);
}



//Creates an X on the Matrix, indicates an ERROR

// X  -  -  -  -  -  -  X
// 7  6  5  4  3  2  1  0
// -  X  -  -  -  -  X  -
// 8  9  10 11 12 13 14 15 
// -  -  X  -  -  X  -  -
// 23 22 21 20 19 18 17 16
// -  -  -  X  X  -  -  -
// 24 25 26 27 28 29 30 31
// -  -  -  X  X  -  -  -
// 39 38 37 36 35 34 33 32
// -  -  X  -  -  X  -  -
// 40 41 42 43 44 45 46 47
// -  X  -  -  -  -  X  - 
// 55 54 53 52 51 50 49 48
// X  -  -  -  -  -  -  X
// 56 57 58 59 60 61 62 63

void setFailure(){
  for(int i = 0; i < 64; i +=9){
    matrix.setPixelColor(i, 150, 0, 0);
  }
  for(int i = 7; i < 64; i +=7){
    matrix.setPixelColor(i, 150, 0, 0);
  }
  matrix.show();
}

//Sets the Left eye, input the color by Red, Green, Blue

void setLeftEye(int r, int g, int b){
  matrix.setPixelColor(9, r, g, b);  //Top Eye Pixel
  matrix.setPixelColor(21, r, g, b); //Right Eye Pixel
  matrix.setPixelColor(23, r, g, b); //Left Eye Pixel
  matrix.setPixelColor(25, r, g, b); //Bottom Eye Pixel
}

//Sets Right Eye, input the color by Red, Green, Blue

void setRightEye(int r, int g, int b){
  matrix.setPixelColor(14, r, g, b); //Top Eye Pixel
  matrix.setPixelColor(16, r, g, b); //Right Eye Pixel
  matrix.setPixelColor(18, r, g, b); //Left Eye Pixel
  matrix.setPixelColor(30, r, g, b); //Bottom Eye Pixel
}

// -  -  -  -  -  -  -  -
// 7  6  5  4  3  2  1  0
// -  -  -  -  -  -  -  -
// 8  9  10 11 12 13 14 15 
// X  X  X  -  -  -  -  -
// 23 22 21 20 19 18 17 16
// -  -  -  -  -  -  -  -
// 24 25 26 27 28 29 30 31
// -  -  -  -  -  -  -  -
// 39 38 37 36 35 34 33 32
// -  -  -  -  -  -  -  -
// 40 41 42 43 44 45 46 47
// -  -  -  -  -  -  -  - 
// 55 54 53 52 51 50 49 48
// -  -  -  -  -  -  -  -
// 56 57 58 59 60 61 62 63

void blinkLeftEye(int r, int g, int b){
  setLeftEye(r, g, b);
  setRightEye(r, g, b);
  matrix.show();
  delay(500);
  resetLeftEyeLED();
  matrix.setPixelColor(21, r, g, b);
  matrix.setPixelColor(22, r, g, b);
  matrix.setPixelColor(23, r, g, b);
  matrix.show();
  delay(500);
  resetLeftEyeLED();
  setLeftEye(r, g, b);
  matrix.show();
}

//Reset Color Function

void resetAllLED(){
  matrix.fill(0, 0, 64);
}

void resetEyeLED(){
  matrix.fill(0, 9, 30);
}
void resetLeftEyeLED(){
  matrix.setPixelColor(9, 0, 0, 0);
  matrix.setPixelColor(21, 0, 0, 0);
  matrix.setPixelColor(22, 0, 0, 0);
  matrix.setPixelColor(23, 0, 0, 0);
  matrix.setPixelColor(25, 0, 0, 0);
}

void serialEvent(){
  
  message = Serial.read();

  switch (message) {
    case '1':
      mood(1);
      break;
    case '2':
      mood(2);
      break;
    case '3':
      mood(3);
      break;
    default:
      mood(0);
  }
  
  while (Serial.available()){
    char throwaway = Serial.read();
  }
  delay(wait);
}

void setup() {
  matrix.begin();
  matrix.show(); // Initialize all pixels to 'off'
  
  mySoftwareSerial.begin(9600);
  myDFPlayer.begin(mySoftwareSerial);
  myDFPlayer.volume(30);  //Lautstärke auf Maximum (30)
  
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);

  setFailure();
}

void loop() {  
  
}

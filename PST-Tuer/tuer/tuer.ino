#include <DFRobotDFPlayerMini.h>
#include <Arduino.h>
#include <SoftwareSerial.h>
#include <Servo.h>

SoftwareSerial mySoftwareSerial(10, 11); // RX, TX
DFRobotDFPlayerMini myDFPlayer;

Servo myservo;
int val;

void setup()
{
  Serial.begin(9600); // opens serial port, sets data rate to 9600 bps
  myservo.attach(5);
  myservo.write(25 + 85);
  delay(1000);

  mySoftwareSerial.begin(9600);
  myDFPlayer.begin(mySoftwareSerial);
  myDFPlayer.volume(30);
  myDFPlayer.play(1);
}
void loop()
{

  if (myDFPlayer.available())
  {
    printDetail(myDFPlayer.readType(), myDFPlayer.read()); //Print the detail message from DFPlayer to handle different errors and states.
  }

  // gesichtserkennung
  // gesicht erkannt

  // --> frage eins

  // warte auf antwort
  // werte antwort aus
  // --> wenn antwort falsch wieder zurueck

  // --> frage zwei
  // warte auf antwort
  // werte antwort aus
  // --> wenn antwort falsch wieder zurueck

  // --> frage drei
  // warte auf antwort
  // werte antwort aus
  // --> wenn antwort falsch wieder zurueck

  // --> frage vier
  // warte auf antwort
  // werte antwort aus
  // --> wenn antwort falsch wieder zurueck

  // --> frage fuenf
  // warte auf antwort
  // werte antwort aus
  // --> wenn antwort falsch wieder zurueck

  // --> wenn alles richtig war, tuer offnen

  if (Serial.available() > 0)
  {
    // read the incoming string:
    String incomingString = Serial.readString();
    if (incomingString[0] == '1')
    {
      myDFPlayer.play(2);
      delay(3000);
      myservo.write(10);
      delay(10000);
      myDFPlayer.play(3);
      delay(3000);
      myservo.write(90);
      myDFPlayer.play(1);
    }
  }
}

void printDetail(uint8_t type, int value)
{
  switch (type)
  {
  case TimeOut:
    Serial.println(F("Time Out!"));
    break;
  case WrongStack:
    Serial.println(F("Stack Wrong!"));
    break;
  case DFPlayerCardInserted:
    Serial.println(F("Card Inserted!"));
    break;
  case DFPlayerCardRemoved:
    Serial.println(F("Card Removed!"));
    break;
  case DFPlayerCardOnline:
    Serial.println(F("Card Online!"));
    break;
  case DFPlayerUSBInserted:
    Serial.println("USB Inserted!");
    break;
  case DFPlayerUSBRemoved:
    Serial.println("USB Removed!");
    break;
  case DFPlayerPlayFinished:
    Serial.print(F("Number:"));
    Serial.print(value);
    Serial.println(F(" Play Finished!"));
    break;
  case DFPlayerError:
    Serial.print(F("DFPlayerError:"));
    switch (value)
    {
    case Busy:
      Serial.println(F("Card not found"));
      break;
    case Sleeping:
      Serial.println(F("Sleeping"));
      break;
    case SerialWrongStack:
      Serial.println(F("Get Wrong Stack"));
      break;
    case CheckSumNotMatch:
      Serial.println(F("Check Sum Not Match"));
      break;
    case FileIndexOut:
      Serial.println(F("File Index Out of Bound"));
      break;
    case FileMismatch:
      Serial.println(F("Cannot Find File"));
      break;
    case Advertise:
      Serial.println(F("In Advertise"));
      break;
    default:
      break;
    }
    break;
  default:
    break;
  }
}

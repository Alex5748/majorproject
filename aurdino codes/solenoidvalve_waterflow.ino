#include <ESP8266WiFi.h>

#define SENSOR D2
const int relayPin = D1;
const char *ssid = "Sagarmatha";
const char *password = "sagarmatha";

 long currentMillis = 0;
 long previousMillis = 0;
 int interval = 1000;
 boolean ledState = LOW;
 float calibrationFactor = 4.5;
 volatile byte pulseCount;
 byte pulse1Sec = 0;
 float flowRate;
 unsigned int flowMilliLitres;
 unsigned long totalMilliLitres;
 void IRAM_ATTR pulseCounter()
 {
 pulseCount++;
 }




void setup() 
{
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Set up relay pin
  pinMode(relayPin, OUTPUT);
  pinMode(SENSOR, INPUT_PULLUP);
  digitalWrite(relayPin, LOW);


  //initialize calculate waterflow

   
 pulseCount = 0;
 flowRate = 0.0;
 flowMilliLitres = 0;
 totalMilliLitres = 0;
 previousMillis = 0;
 

  
}

void loop() 
{
  // Turn the relay on
  digitalWrite(relayPin, HIGH);
  Serial.println("Relay turned ON");
  delay(10000);  // Wait for 2 seconds

  // Turn the relay off
  digitalWrite(relayPin, LOW);
  Serial.println("Relay turned OFF");
  delay(10000);  // Wait for 2 seconds

// Calculation of water flow

currentMillis = millis();
 if (currentMillis - previousMillis > interval) {
 pulse1Sec = pulseCount;
 pulseCount = 0;
 flowRate = ((1000.0 / (millis() - previousMillis)) * pulse1Sec) /
calibrationFactor;
 previousMillis = millis();
 flowMilliLitres = (flowRate / 60) * 1000;
 totalMilliLitres += flowMilliLitres;
 Serial.print("Flow rate: ");
 Serial.print(int(flowRate));
 Serial.print("L/min");
 Serial.print("\t");
 Serial.print("Output Liquid Quantity: ");
 Serial.print(totalMilliLitres);
 Serial.print("mL / ");
 
 Serial.print(totalMilliLitres / 1000);
 Serial.println("L");
 }





  
}

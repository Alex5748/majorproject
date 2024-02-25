#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const int trigPin = D5; 
const int echoPin = D6; 
const int trigPin2= D1;
const int echoPin2 = D2;

long duration;
int waterlevel;
long duration2;
int waterlevel2;


const char* ssid = "Sagarmatha";
const char* password = "sagarmatha";
const char* serverUrl = "http://172.130.103.162:5000/esp-data"; // Update with your server's IP

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT);
  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin2, INPUT);// Sets the echoPin as an Input
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(trigPin, LOW);
    digitalWrite(trigPin2, LOW);
    delayMicroseconds(2);

// Sets the trigPin on HIGH state for 10 micro seconds
    digitalWrite(trigPin, HIGH);
    digitalWrite(trigPin, LOW);
    //delayMicroseconds(10);

    digitalWrite(trigPin2, HIGH);
    digitalWrite(trigPin2, LOW);
    delayMicroseconds(10);

// Reads the echoPin, returns the sound wave travel time in microseconds
    duration = pulseIn(echoPin, HIGH);
    duration2 = pulseIn(echoPin2, HIGH);

// Calculating the distance
    waterlevel=26-duration*0.034/2;
    waterlevel2=26-duration2*0.034/2;
    WiFiClient client; // Use WiFiClient instead of HTTPClient

    HTTPClient http;
    http.begin(client, serverUrl); // Use the correct method

    http.addHeader("Content-Type", "application/json");

    String jsonData = "{\"Water level of normal tank\": " + String(waterlevel2) + ", \"Water level rain tank\": " + String(waterlevel) + "}";
    int httpCode = http.POST(jsonData);

    if (httpCode > 0) {
      String response = http.getString();
      Serial.println(response);
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end();
  }

  delay(10000); // Send data every 5 seconds
}

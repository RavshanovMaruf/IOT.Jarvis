const int analogInPin = A0;
int sensorValue = 0;
const int fanPin = 7; // Digital pin connected to the fan
const float temperatureThreshold = 35.0; 

void setup() {
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(fanPin, OUTPUT); // Set the fan pin as output
  Serial.begin(9600);
}

void loop() {
  float simulatedTemperature = 36.0; // Simulated temperature reading
  sensorValue = analogRead(analogInPin);
  Serial.print("sensor = ");
  Serial.println(sensorValue);
  delay(2);

  if ((sensorValue >= 100) && (sensorValue <= 600)) {
    digitalWrite(2, HIGH);
    Serial.println("LED 2 ON");
    delay(100);
  } else if ((sensorValue >= 601) && (sensorValue <= 625)) {
    digitalWrite(3, HIGH);
    Serial.println("LED 3 ON");
    delay(100);
  } else if ((sensorValue >= 626) && (sensorValue <= 700)) {
    digitalWrite(4, HIGH);
    digitalWrite(5, HIGH);
    Serial.println("LEDs 4 and 5 ON");
  } else {
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
    Serial.println("All LEDs OFF");
    delay(100);
  }

    if (simulatedTemperature > temperatureThreshold) {
    digitalWrite(fanPin, HIGH); // Turn on the fan
    Serial.println("Fan is ON because the simulated temperature is above the threshold.");
  } else {
    digitalWrite(fanPin, LOW); // Turn off the fan
    Serial.println("Fan is OFF because the simulated temperature is below the threshold.");
  }
}

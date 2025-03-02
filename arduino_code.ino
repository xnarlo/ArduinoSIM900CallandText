#include <SoftwareSerial.h>

SoftwareSerial gsm(7, 8); // RX, TX

void setup() {
  Serial.begin(9600);
  gsm.begin(9600);
  Serial.println("GSM module ready");
}

void loop() {
  if (gsm.available()) {
    while (gsm.available()) {
      Serial.write(gsm.read());
    }
  }

  if (Serial.available()) {
    while (Serial.available()) {
      gsm.write(Serial.read());
    }
  }
}

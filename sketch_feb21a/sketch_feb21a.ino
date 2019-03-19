#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>

#define ssid      "xx"       // WiFi SSID
#define password  "xxxxxx"  // WiFi password
#define DHTTYPE   DHT22       // DHT type (DHT11, DHT22)
#define DHTPIN    D4          // Broche du DHT / DHT Pin
#define LEDPIN    D3          // Led
float   t = 0 ;
float   h = 0 ;
float   p = 0;
String  etatLed = "OFF";

// Création des objets / create Objects

ESP8266WebServer server ( 80 );

String getPage(){
  String page = "<html lang=fr-FR><head><meta http-equiv='refresh' content='10'/>";
  page += "<title>ESP8266 Demo - www.projetsdiy.fr</title>";
  page += "<style> body { background-color: #fffff; font-family: Arial, Helvetica, Sans-Serif; Color: #000088; }</style>";
  page += "</head><body><h1>ESP8266 Demo</h1>";
  page += "<h2>Test je suis l'esp8266 </h2>";
  page += p;
  page += " mbar</li></ul>";
  page += "<h3>GPIO</h3>";
  page += "<form action='/' method='POST'>";
  page += "<ul><li>D3 (etat: ";
  page += etatLed;
  page += ")";
  page += "<INPUT type='radio' name='LED' value='1'>ON";
  page += "<INPUT type='radio' name='LED' value='0'>OFF</li></ul>";
  page += "<INPUT type='submit' value='Actualiser'>";
  page += "<br><br><p><a hrf='https://www.projetsdiy.fr'>www.projetsdiy.fr</p>";
  page += "</body></html>";
  return page;
}
void handleRoot(){ 
  if ( server.hasArg("LED") ) {
    handleSubmit();
  } else {
    server.send ( 200, "text/html", getPage() );
  }  
}

void handleSubmit() {
  // Actualise le GPIO / Update GPIO 
  String LEDValue;
  LEDValue = server.arg("LED");
  Serial.println("Set GPIO "); Serial.print(LEDValue);
  if ( LEDValue == "1" ) {
    digitalWrite(LEDPIN, 1);
    etatLed = "On";
    server.send ( 200, "text/html", getPage() );
  } else if ( LEDValue == "0" ) {
    digitalWrite(LEDPIN, 0);
    etatLed = "Off";
    server.send ( 200, "text/html", getPage() );
  } else {
    Serial.println("Err Led Value");
  }
}

void setup() {
  Serial.begin ( 115200 );
  // Initialisation du BMP180 / Init BMP180
  if ( !bmp.begin() ) {
    Serial.println("BMP180 KO!");
    while(1);
  } else {
    Serial.println("BMP180 OK");
  }
  
  WiFi.begin ( ssid, password );
  // Attente de la connexion au réseau WiFi / Wait for connection
  while ( WiFi.status() != WL_CONNECTED ) {
    delay ( 500 ); Serial.print ( "." );
  }
  // Connexion WiFi établie / WiFi connexion is OK
  Serial.println ( "" ); 
  Serial.print ( "Connected to " ); Serial.println ( ssid );
  Serial.print ( "IP address: " ); Serial.println ( WiFi.localIP() );

  // On branche la fonction qui gère la premiere page / link to the function that manage launch page 
  server.on ( "/", handleRoot );

  server.begin();
  Serial.println ( "HTTP server started" );
}

void loop() {
  server.handleClient();
  t = dht.readTemperature();
  h = dht.readHumidity();
  p = bmp.readPressure() / 100.0F;
  delay(1000);
}

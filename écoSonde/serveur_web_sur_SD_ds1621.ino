/*
Placer sur carte SD les fichiers index.htm et style.css
 */
float valr =0;
#include <Wire.h>
#include <SPI.h>
#include <SD.h>
#include <Ethernet.h>


#define BUFSIZ 48
#define DS1621_ID 0x90 >> 1  
char VAL=0;
char VAL1=0;
int flghtm=0;
//Local ethernet setup
byte mac[] = { 
  0x90, 0xA2, 0xDA, 0x0D, 0x03, 0xAC }; 
byte ip[] = { 
  192, 168, 87, 7};    // ////////////////////////////////a modifier
char rootFileName[] = "index.htm";
EthernetServer server(80);
float temperature = 23.85;


//SD card stuff
Sd2Card card;
SdVolume volume;
SdFile root;
SdFile file;
#define error(s) error_P(PSTR(s))

void error_P(const char* str) {
  PgmPrint("error: ");
  SerialPrintln_P(str);
  if (card.errorCode()) {
    PgmPrint("SD error: ");
    Serial.print(card.errorCode(), HEX);
    Serial.print(',');
    Serial.println(card.errorData(), HEX);
  }
  while(1);
}

void setup() {
  Serial.begin(9600);
  Wire.begin(); //Configure la carte Arduino pour utiliser les fonctions I2C 
  Wire.beginTransmission(DS1621_ID); //Initie un transfert en mode écriture
  Wire.write(0xAC); //Ecriture d'un ou plusieur octets du maître vers l'esclave
  Wire.write(0x01); //Ecriture d'un ou plusieur octets du maître vers l'esclave
  Wire.endTransmission(); //met fin à la transimission
  PgmPrint("Free RAM: ");
  Serial.println(FreeRam());  
//  pinMode(10, OUTPUT);              
//  digitalWrite(10, HIGH);              
  if (!card.init(SPI_HALF_SPEED, 4)) error("card.init failed!");
  if (!volume.init(&card)) error("vol.init failed!");
  PgmPrint("Volume is FAT");
  Serial.println(volume.fatType(),DEC);
  Serial.println();
  if (!root.openRoot(&volume)) error("openRoot failed");
  PgmPrintln("Files found in root:");
  root.ls(LS_DATE | LS_SIZE);
  Serial.println();
  PgmPrintln("Files found in all dirs:");
  root.ls(LS_R);
  Serial.println();
  PgmPrintln("Done");
  Ethernet.begin(mac,ip);
  server.begin();
}


void loop()
{
    
  Wire.beginTransmission(DS1621_ID); 
  Wire.write(0xEE); 
  Wire.endTransmission(); 
  delay(800);
  Wire.beginTransmission(DS1621_ID); 
  Wire.write(0xAA);
  Wire.endTransmission(); 
  Wire.requestFrom(DS1621_ID,2);
  VAL=Wire.read();
  VAL1=Wire.read();

  Wire.beginTransmission(DS1621_ID);
  Wire.write(0xA8);
  Wire.endTransmission();
  Wire.requestFrom(DS1621_ID, 1);
  float COUNT_REMAIN=Wire.read();
  Wire.beginTransmission(DS1621_ID);
  Wire.write(0xA9);
  Wire.endTransmission();
  Wire.requestFrom(DS1621_ID, 1);
  float COUNT_PER_C = Wire.read();
  float valr = float(VAL)-0.25+((COUNT_PER_C-COUNT_REMAIN)/(COUNT_PER_C));
  Serial.print(int(VAL));
  Serial.print("\n");
  char clientline[BUFSIZ];
  char *filename;
  int image = 0;
  int index = 0;

  EthernetClient client = server.available();
  if (client) {
    boolean current_line_is_blank = true;
    index = 0;

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();

        if (c != '\n' && c != '\r') {
          clientline[index] = c;
          index++;
           if (index >= BUFSIZ) 
            index = BUFSIZ -1;

          continue;
        }

        clientline[index] = 0;
        filename = 0;

        Serial.println(clientline);

        if (strstr(clientline, "GET / ") != 0)     // si ligne de commande reçue contient "GET / "
        {
          filename = rootFileName;   // on envoie le fichier index.htm
          flghtm = 1;
        } 
        else
        {
          flghtm = 0;
        }
        Serial.print("flghtm : ");
        Serial.print(flghtm);
        Serial.print("  ");
        if (strstr(clientline, "GET /") != 0)
        {
          if (!filename) filename = clientline + 5; 

          (strstr(clientline, " HTTP"))[0] = 0;

          Serial.println(filename);

          if (! file.open(&root, filename, O_READ)) {
            client.println("HTTP/1.1 404 Not Found");
            client.println("Content-Type: text/html");
            client.println();
            client.println("<h2>Error 404</h2>");
            client.println("<s2>The file does not exist.<s2>");
            client.println("");
            break;
          }
          
          Serial.println("Opened!");
          //File types
          client.println("HTTP/1.1 200 OK");
          if (strstr(filename, ".htm") != 0)
            client.println("Content-Type: text/html");
          else if (strstr(filename, ".css") != 0)
            client.println("Content-Type: text/css");
          else if (strstr(filename, ".png") != 0)
            client.println("Content-Type: image/png");
          else if (strstr(filename, ".jpg") != 0)
            client.println("Content-Type: image/jpeg");
          else if (strstr(filename, ".gif") != 0)
            client.println("Content-Type: image/gif");
          else if (strstr(filename, ".3gp") != 0)
            client.println("Content-Type: video/mpeg");
          else if (strstr(filename, ".pdf") != 0)
            client.println("Content-Type: application/pdf");
          else if (strstr(filename, ".js") != 0)
            client.println("Content-Type: application/x-javascript");
          else if (strstr(filename, ".xml") != 0)
            client.println("Content-Type: application/xml");
          else
            client.println("Content-Type: text");
          client.println();

          int16_t c;
          while ((c = file.read()) >= 0) {
            if ((c==0xff)&&(flghtm==1))
            {client.print(valr);
            }
            else
            {
            //Serial.print((char)c); //Prints all HTML code to serial (For debuging)
            client.print((char)c); //Prints all HTML code for web page
            }  
        }
         
      
          file.close();

        } 
        else {
          client.println("HTTP/1.1 404 Not Found");
          client.println("Content-Type: text/html");
          client.println();
          client.println("<h2>Error 404</h2>");
          client.println("");
        }
        break;
      }
    }
   
    client.stop();
  }

}

//The End /* 






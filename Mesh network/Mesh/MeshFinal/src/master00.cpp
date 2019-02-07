#include <RF24.h>
#include <RF24Network.h>
#include <SPI.h>

RF24 radio(10, 9) //pins CE, CSN
RF24Network network(radio); //on integre
const uint16_t this_node = 00;
const uint16_t node01 = 01;
const uint16_t node02 = 02;
const uint16_t node011 = 011;
const uint16_t node021 = 021;
//...

void setup() {
    SPI.begin();
    radio.begin();
    network.begin(90, this_node); // channel, adresse de la sonde
}

void loop() {
    network.update(); //met à jour le réseau
    while (network.available()) //on recupère les données
    {
        RF24NetworkHeader header; //cree un header
        unsigned long incomingdata;
        network.read(header, &incomingdata, sizeof(incomingdata));
        //ranger la donnée
        if (header.from_node == /*)

    }
    
    
}

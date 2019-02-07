#include <RF24.h>
#include <RF24Network.h>
#include <SPI.h>

RF24 radio(10, 9) //pins CE, CSN
RF24Network network(radio); //on cree un reseau appele network auquel on integre radio
RF24Mesh mesh(radio, network);
mesh.setNodeID(2); //on définit la nodeID à 2
printf("start nodeID %d\n",mesh.getNodeID()); //affichage 
mesh.begin(); //demarrage
const uint16_t this_node = 01;
const uint16_t node00 = 00;

void setup() {
    if(!mesh.write(&displayTimer,'M',sizeof(displayTimer))){
       
      // If a write fails, check connectivity to the mesh network
      if( ! mesh.checkConnection() ){
        // The address could be refreshed per a specified timeframe or only when sequential writes fail, etc.
        printf("Renewing Address\n");
        mesh.renewAddress(); 
      }else{
        printf("Send fail, Test OK\n"); 
      }
    }else{
      printf("Send OK: %u\n",displayTimer);
    }
  }
  delay(1);
  }
return 0;

}
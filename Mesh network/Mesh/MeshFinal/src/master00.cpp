#include <Z:/info/projet/EcoProbes/EcoProbes/Mesh network/Mesh/MeshFinal/include/RF24Mesh.h>
// #include <./RF24.h>
//#include <./RF24Network.h>
#include <stdio.h>
#include<stdlib.h>
#include <unistd.h>

RF24 radio(10, 9); //pins CE, CSN
RF24Network network(radio); //on integre au réseau
RF24Mesh mesh(radio, network);
//...

int main() {
/*Set a unique nodeID for this node.
This value is stored in program memory, so is saved after loss of power.
This should be called before mesh.begin()*/
    mesh.setNodeID(0); //on met l'ID à 0 et identifie ainsi le maître
    printf("debut\n");
    mesh.begin(); // configure le réseau et demande une adresse
    /*Paramétres par défauts: channel	The radio channel (1-127) default:97
                            data_rate	The data rate (RF24_250KBPS,RF24_1MBPS,RF24_2MBPS) default:RF24_1MBPS
                            timeout	How long to attempt address renewal in milliseconds default:60000*/ 


    while(1)
    {
    mesh.update(); //met à jour le réseau
    mesh.DHCP(); //permet de donner une config auto aux nodes, seulement appelé par le master
    while (network.available()) //on recupère les données
    {
        RF24NetworkHeader header; //cree un header
        unsigned long incomingdata;
        network.peek(header); //part à la recherche du prochain message
        switch(header.type)
        {
            case 'M': network.read(header, &incomingdata, sizeof(incomingdata));
                        printf("Message: %lu , from 0%o \n ", incomingdata, header.from_node);
                        break;
            case 'N': network.read(header, &incomingdata, sizeof(incomingdata));
                        printf("Message: %lu , from 0%o \n ", incomingdata, header.from_node);
                        break;
            default : printf("error");
                      break;
        }
        
        //ranger la donnée
        //if (header.from_node == )

    }
    //delay(2);
    }
    
}

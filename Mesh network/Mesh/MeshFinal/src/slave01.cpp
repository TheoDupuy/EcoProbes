#include <RF24.h>
#include <RF24Network.h>
#include <SPI.h>

RF24 radio(10, 9) //pins CE, CSN
RF24Network network(radio); //on cree un reseau appele network auquel on integre radio
RF24Mesh mesh(radio, network);


mesh.setNodeID(2); //on définit la nodeID à 2
printf("start nodeID %d\n",mesh.getNodeID()); //affichage du nodeID
mesh.begin(); //demarrage
//const uint16_t this_node = 02;
//const uint16_t node00 = 00;

int main() 
{
  while(1)
  {
    if(!mesh.write(/*&data*/,'M'/*identifier*/,sizeof(/*data*/)))
    {
      // Si l'écriture a échoué, on vérifie la connexion
      if( ! mesh.checkConnection()) 
      {
        // connexion échouée, renouvllement de l'adresse
        printf("Renouvellement de l'adresse\n");
        mesh.renewAddress(); 
      }
      else
      {
        printf("Envoi échoué, text connexion OK\n"); 
      }
    }
    else
    {
      printf("Send OK: %u\n",/*data*/);
    }
    delay(2);
  }
  return 0;
}
  
  













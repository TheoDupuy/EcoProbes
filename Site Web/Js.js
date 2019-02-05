<scripts>

	function newsdonnee(float valeur)
		
	
	
	function alerteSonde( var capteur , int nbsonde, float valeur, float tab[4]) {
		/*var Temperaturesol =Valeur de la temperature du sol de la sonde 1 ;
		var Temperatureamb =Valeur de la temperature ambiante de la sonde 1 ;
		var Humiditesol =Valeur de l'humidité du sol de la sonde 1 ;
		var Humiditeamb =Valeur de l'humiditer ambiante de la sonde 1 ;
		var Niveaueau =Valeur du niveau de l'eau de la sonde 1 ;
		var Luminositer = Valeur de la luminosité de la sonde 1*/ ;
		
		float somme;
		int i;
		float moyenne;
		float y;
		int Tabnb = 4;
		boolean start;
		boolean aberant=false;
		
		for(i=0;i<4;i++){
			if(tab[i]==0){
				Tabnb--;
			}
		}
		if(Tabnb==0){
			Tabnb++;
			start== true;
		}
		for (i=0;i<Tabnb;i++){
			if (valeur < moyenne + y && valeur > moyenne - y || start == true){
				somme=somme+valeur;
			}
			else{
				aberant=true;
			}
		}
		moyenne = somme / Tabnb;
		
		
		
		
			numero de la sonde + valeur
		
		
		
		
		if(aberant==true){
			switch (capteur) {
			
				case 'Temperaturesol':
					alert(" La température du sol de la sonde"+ nbsonde + " est anormale."); 
					break;
				case 'Temperatureamb' :
					alert(" La température de l'air ambiant de la sonde "+ nbsonde + " est anormale."); 
					break;
				case 'Humiditesol' :
					alert(" L'humidité du sol de la sonde "+ nbsonde + " est anormale."); 
					break;
				case 'Humiditeamb':
					alert(" L'humidité de l'air ambiant de la sonde "+ nbsonde + " est anormale."); 
					break;
				case 'Niveaueau' :
					alert(" Le niveau de l'eau de la sonde "+ nbsonde + " est anormale. "); 
					break;
				case 'Luminositer' :
					alert(" La luminosité est de la sonde "+ nbsonde + " est anormale "+ valeur);
					break;
					
				return capteur;
			}
		}
	}
</scripts>
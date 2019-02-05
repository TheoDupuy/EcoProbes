<scripts>
	
	function alerteSonde() {
		var capteur;
		/*var Temperaturesol =Valeur de la temperature du sol de la sonde 1 ;
		var Temperatureamb =Valeur de la temperature ambiante de la sonde 1 ;
		var Humiditesol =Valeur de l'humidité du sol de la sonde 1 ;
		var Humiditeamb =Valeur de l'humiditer ambiante de la sonde 1 ;
		var Niveaueau =Valeur du niveau de l'eau de la sonde 1 ;
		var Luminositer = Valeur de la luminosité de la sonde 1*/ ;
		
		float tempsol;
		float tempamb;
		float humisol;
		float humiamb;
		float niveaueau;
		int lux;
		float somme_tempsol;
		float somme_tempamb;
		float somme_humisol;
		float somme_humiamb;
		float somme_eau;
		int somme_lux;
		
		
		moyenne x derniere valeur;
		if (valeur > moyenne + y || valeur < moyenne - y)
			(declarer comme aberant)=true
		faire un tableau avec les 4 derniere valeurs 
		numero de la sonde + valeur
		
		
		
		
		
		switch (capteur) {
			
			case 'Temperaturesol':
				alert(" La température du sol de la sonde 1 est anormale."); 
				break;
			case 'Temperatureamb' :
				alert(" La température de l'air ambiant de la sonde 1 est anormale."); 
				break;
			case 'Humiditesol' :
				alert(" L'humidité du sol de la sonde 1 est anormale."); 
				break;
			case 'Humiditeamb':
				alert(" L'humidité de l'air ambiant de la sonde 1 est anormale."); 
				break;
			case 'Niveaueau' :
				alert(" Le niveau de l'eau de la sonde 1 est anormale. "); 
				break;
			case 'Luminositer' :
				alert(" La luminosité est de la sonde 1 anormale ");
				break;
				
			return capteur;
		
	}
</scripts>
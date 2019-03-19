	function init(){

		tabtemp=[15,15,15,15];
		
		alerteCapteurTemp("Temperatureamb", 1 , 15 , tabtemp);
		
		Affichage(false,false,26,16);
		tabhumi=[35,35,35,35];
		
		AlerteCapteurHumi("Humiditeamb", 1 , 26 , tabhumi);
	}
	
		
	
	
	function alerteCapteurTemp( capteur ,  nbsonde,  valeurtemp, tabtemp) {
		
		
		var sommetemp=0;
		var i_temp;
		var moyennetemp=15;
		var y_temp = 5;
		var Tabnbtemp = 4;
		var starttemp;
		var aberanttemp=true;
		
		// Défini le nombre de case vide dans le tableau.
		
		for(i_temp=0;i_temp < 4;i_temp ++){
			if(tabtemp[i_temp]==0){
				Tabnbtemp--;
			}
		}
		// Si le nombre de case vide dans le tableau est égale a 0 alors la valeur bool starttemp passe à TRUE et signifie que la prochaine valeur qui sera enregistré sera la première valeur du tableau.
		if(Tabnbtemp==0){
			Tabnbtemp++;
			starttemp== true;
			moyennetemp = valeurtemp;
		}
		
		// Si la valeur obtenu est compris entre la moyenne (haute et basse defini avec y) alors elle sera enregistrer dans le tableau dans la case la plus a droite.
		if (valeurtemp < moyennetemp + y_temp && valeurtemp > moyennetemp - y_temp || starttemp == true){
			for(i_temp=4; i_temp > 1 ; i_temp--){
				tabtemp[i_temp-1]=tabtemp[i_temp-2];
			}
			tabtemp[0]=valeurtemp;
			aberanttemp=false;
			if(Tabnbtemp<4){
				Tabnbtemp++;
			}
		}
		// Additionne les valeurs obtenu au fur et à mesure.
		for (i_temp=0; i_temp< 4 ;i_temp++){

				sommetemp= sommetemp+ tabtemp[i_temp];
				
		}
		// Calcule la moyenne en divisant la somme par le nombre de valeur dans le tableau.
		moyennetemp = sommetemp / Tabnbtemp;

		// Switch qui traite les différant cas ou une valeur pourrait etre abérante .
		if(aberanttemp==true){
			switch (capteur) {
			
				case 'Temperaturesol':
					alert(" La température du sol de la sonde"+ nbsonde + " est anormale. Elle est de :" +valeurtemp); 
					break;
				case 'Temperatureamb' :
					alert(" La température de l'air ambiant de la sonde "+ nbsonde + " est anormale. Elle est de :" +valeurtemp); 
					break;
				
				case 'Niveaueau' :
					alert(" Le niveau de l'eau de la sonde "+ nbsonde + " est anormale. Elle est de :" +valeur); 
					break;
				case 'Luminositer' :
					alert(" La luminosité est de la sonde "+ nbsonde + " est anormale Elle est de :" + valeur);
					break;
			}
		}
	}

	function AlerteCapteurHumi( capteur , nbsonde,  valeurhumi, tabhumi) {
	
		var sommehumi= 0;
		var i_humi;
		var moyennehumi=45;
		var y_humi = 20;
		var Tabnbhumi = 4;
		var starthumi;
		var aberanthumi=true;
		
		// Défini le nombre de case vide dans le tableau.
		for(i_humi=0;i_humi < 4;i_humi ++){
			if(tabhumi[i_humi]==0){
				Tabnbhumi--;
			}
		}
		// Si le nombre de case vide dans le tableau est égale a 0 alors la valeur bool starttemp passe à TRUE et signifie que la prochaine valeur qui sera enregistré sera la première valeur du tableau.
		if(Tabnbhumi==0){
			Tabnbhumi++;
			starthumi== true;
			moyennehumi = valeurhumi;
		}
		
		// Si la valeur obtenu est compris entre la moyenne (haute et basse defini avec y) alors elle sera enregistrer dans le tableau dans la case la plus a droite.
		if (valeurhumi < moyennehumi + y_humi && valeurhumi > moyennehumi - y_humi || starthumi == true){
			for(i_humi=4; i_humi > 1 ; i_humi--){
				tabhumi[i_humi-1]=tabhumi[i_humi-2];
			}
			tabhumi[0]=valeurhumi;
			aberanthumi=false;
			if(Tabnbhumi<4){
				Tabnbhumi++;
			}
		}
		// Additionne les valeurs obtenu au fur et à mesure.
		for (i_humi=0; i_humi< 4 ;i_humi++){

				sommehumi= sommehumi+ tabhumi[i_humi];
				
		}
		// Calcule la moyenne en divisant la somme par le nombre de valeur dans le tableau.
		moyennehumi = sommehumi / Tabnbhumi;

		// Switch qui traite les différant cas ou une valeur pourrait etre abérante .
		if(aberanthumi==true){
			switch (capteur) {
				case 'Humiditesol' :
					alert(" L'humidité du sol de la sonde "+ nbsonde + " est anormale. Elle est de :" +valeurhumi); 
					break;
				case 'Humiditeamb':
					alert(" L'humidité de l'air ambiant de la sonde "+ nbsonde + " est anormale. Elle est de :" +valeurhumi); 
					break;
							
			}	
		}
}

function Affichage (aberanthumi,aberanttemp,valeurhumi,valeurtemp) {
	var test = document.getElementById("test");
	var testtxt = document.getElementById("testtxt");
		// Par défaut on déclare la zone où sera afficher les valeurs aberante comme cacher.
		test.style="display:none";
		// Test qui permet de verifier et d'afficher le cas ou les valeurs (humi et temp) sont abérantes.
		if((aberanthumi ==true) && (aberanttemp == true)){
			
			test.style="";
			testtxt.innerHTML= "Humidité : "+valeurhumi +" "+ "Température : "+valeurtemp ;
		}
		// Test qui permet de verifier et d'afficher le cas ou la valeurs (humi) est abérante.
		else if((aberanthumi == true) && (aberanttemp == false )){
			test.style="";
			testtxt.innerHTML= valeurhumi;
		}
		// Test qui permet de verifier et d'afficher le cas ou la valeurs (temp) est abérante.
		else if((aberanthumi ==false) && ( aberanttemp == true)){
			test.style="";
			testtxt.innerHTML = valeurtemp;
		}
		
}

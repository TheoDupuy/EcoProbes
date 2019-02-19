
	function init(){

		tabtemp=[15,15,15,15];
		
		alerteCapteurTemp("Temperatureamb", 1 , 16 , tabtemp);
		
		test(false,true,26,16);
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
		
		
		for(i_temp=0;i_temp < 4;i_temp ++){
			if(tabtemp[i_temp]==0){
				Tabnbtemp--;
			}
		}

		if(Tabnbtemp==0){
			Tabnbtemp++;
			starttemp== true;
			moyennetemp = valeurtemp;
		}
		
		
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
		for (i_temp=0; i_temp< 4 ;i_temp++){

				sommetemp= sommetemp+ tabtemp[i_temp];
				
		}
		moyennetemp = sommetemp / Tabnbtemp;

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
		
		
		for(i_humi=0;i_humi < 4;i_humi ++){
			if(tabhumi[i_humi]==0){
				Tabnbhumi--;
			}
		}
		
		if(Tabnbhumi==0){
			Tabnbhumi++;
			starthumi== true;
			moyennehumi = valeurhumi;
		}
		
		
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
		for (i_humi=0; i_humi< 4 ;i_humi++){

				sommehumi= sommehumi+ tabhumi[i_humi];
				
		}
		moyennehumi = sommehumi / Tabnbhumi;
		//alert("Valeur de l'humiditer ambiante  : " +valeurhumi);
		//alert("Moyenne de l'huimiditer ambiante  : " +moyennehumi);
	
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

function test (aberanthumi,aberanttemp,valeurhumi,valeurtemp) {
	var test = document.getElementById("test");
	var testtxt = document.getElementById("testtxt");
		test.style="display:none";
		if((aberanthumi ==true) && (aberanttemp == true)){
			
			test.style="";
			testtxt.innerHTML= "Humidité : "+valeurhumi +" "+ "Température : "+valeurtemp ;
		}
		else if((aberanthumi == true) && (aberanttemp == false )){
			test.style="";
			testtxt.innerHTML= valeurhumi;
		}
		else if((aberanthumi ==false) && ( aberanttemp == true)){
			test.style="";
			testtxt.innerHTML = valeurtemp;
		}
		
}

// quand la page html est charge lance la fonction
$(document).ready(function() {
	
	// appelle la méthode pour charger la base données dans la datatable
	loadDatatable();
	
	// déclaration d'une variable table;
	var table = $('#FilmTable').DataTable();

    // fonction appelée lors du click
	$("#btn-get").click(function() {
		getFilm(); // affiche le film sélectionné dans la DataTable
	});
	
	// Bouton Ajouter
    $("#btn-post").click(function() {
		film_submit($("#btn-post"), "POST", table);	
	});
    
    // Bouton Supprimer
    $("#btn-delete").click(function() {
		deleteFilm(); // efface le film en fonction de l'identifiant		
	});

    // pour faire le titre du tableau Json
    var json = "<h3>Server Response format JSON</h3><pre>Titre trouvé :<br>" + JSON.stringify(data, null, 4)+ "</pre>";
    $('#filmTable tbody').on( 'dblclick', 'tr', function () {
            	let dataRow = table.row( this ).data();
                $("#resultat").html(json);
                $("#id").val(data.id);
                $("#titre").val(data.titre);
                $("#genre").val(data.genre);
                $("#real").val(data.real);
                $("#annee").val(data.annee);
                $("#duree").val(data.duree);
                console.log("SUCCESS : ", data);
            });
            error : function(e) {

                var json = "<h3>Server Response</h3><pre>" + e.responseText    + "</pre>";

                $("#resultat").html(json);

                console.log("ERROR : ", e);
            }
});
    
function loadDatatable() {
	$('#filmTable').DataTable({
		"columnDefs": [
	            {
	                "targets": [ 0 ],
	                "sortable" : false
	            },
	            {
	                "targets": [ 3 ],
	                "visible": true
	            }
	        ],
		"ajax" : {
			url : '/api/films',
			dataSrc : ''
		},
		"columns" : [ 
			{"data" : "id"},
			{"data" : "titre"},
			{"data" : "genre"}, 
			{"data" : "real"},
			{"data" : "duree"},
			{"data" : "annee"},]
	});
	
};

/**
 * Méthode qui traite les POST et PUT
 * @param button
 * @param httpVerb
 * @returns
 */
function film_submit(button, httpVerb, table) {

	var film = {};
	// on récupère les valeurs saisies
	film["id"] = $("#id").val();
	film["titre"] = $("#titre").val();
	film["genre"] = $("#genre").val();
	film["real"] = $("#real").val();
	film["duree"] = $("#duree").val();
	film["duree"] = $("#duree").val();
	
	// on initialise l'url du back
	var url = "/api/film";
	
	// si c'est une modification, on passe l'identifiant
	if(httpVerb == "PUT")
		url += "/" + film["id"];
	
	// on désactive le bouton en cours 
	button.prop("disabled", true);

	// on lance la méthode ajax pour faire le lien avec les méthodes back du constructeur
	$.ajax({
		type : httpVerb,						// méthode POST ou PUT
		contentType : "application/json",		// type de données
		url : url,								// url destinatrice
		data : JSON.stringify(apprenant),		// on transforme les données de la variable Javascript "apprenant" en format JSON
		dataType : 'json',						// on précise le mode de transfert
		cache : false,							// pas de cache sollicité
		timeout : 600000,						// délai d'attente
		success : function(data) {				// si ok

			var json = "<h3>Server Response au format JSON</h3><pre>film (modifié/ajouté) :<br>" + JSON.stringify(data, null, 4) + "</pre>";
			
			$('#feedbackfilm').html(json); // renvoie les infos aux format JSON adapté au HTML dans la balise "<DIV id="feedbackfilm"> 

			console.log("SUCCESS : ", data);
			button.prop("disabled", false);

			resetForm()
		},
		error : function(e) {

			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackfilm').html(json);

			console.log("ERROR : ", e);
			button.prop("disabled", false);

		}
	});
	
	table.ajax.reload(); // on recharge les données via ajax et la méthode reload()
}

function resetForm() {
	$('#film-form')[0].reset();
}

function resetFeedBackFilm() {
	$('#feedbackfilm').html("");
}

/**
 * Méthode qui récupère un apprenant
 * @returns
 */
function getFilm() {

	var idFilm = $("#id").val(); // on récupère la variable

	$.ajax({
		type : "GET",
		contentType : "application/json",
		url : "/api/film/" + idFilm,
		data : {},
		dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			var json = "<h3>Server Response format JSON</h3><pre>Film trouvé :<br>" + JSON.stringify(data, null, 4) + "</pre>";
			$('#feedbackfilm').html(json);
			$("#id").val(data.id);
			$("#titre").val(data.titre);
			$("#genre").val(data.genre);
			$("#real").val(data.real);
			$("#duree").val(data.duree);
			$("#annee").val(data.anne);
			console.log("SUCCESS : ", data);
		},
		error : function(e) {

			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackfilm').html(json);

			console.log("ERROR : ", e);
		}
	});
}

/**
 * méthode pour supprimer un apprenant
 * @returns
 */
function deleteFilmt() {

	var idFilm = $("#id").val();

	$.ajax({
		type : "DELETE",
		contentType : "application/json",
		url : "/api/film/" + idFilm,
		//data : {},
		//dataType : 'json',
		cache : false,
		timeout : 600000,
		success : function(data) {

			var json = "<h3>Server Response</h3><pre>Film " + idFilm + " deleted.</pre>";
			$('#feedbackfilm').html(json);
			console.log("SUCCESS : ", data);

			resetForm();
		},
		error : function(e) {
			var json = "<h3>Server Response</h3><pre>" + e.responseText	+ "</pre>";
			
			$('#feedbackFilm').html(json);
			console.log("ERROR : ", e);
		}
	});
}


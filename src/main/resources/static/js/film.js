$(document).ready(function() {

    // appelle la méthode pour charger la base données dans la datatable
    loadDatatable();

    // déclaration d'une variable table;
    var table = $('#filmTable').DataTable();

    /* Si vous double-cliquez sur une ligne de la datatable
       vous récupérez la valeur des attributs de la ligne concernée (row)
       aux différentes zones de saisie
    */
    $('#filmTable tbody').on('dblclick', 'tr', function() {
        let dataRow = table.row(this).data();
        $("#id").val(dataRow.id);
        $("#titre").val(dataRow.titre);
        $("#genre").val(dataRow.genre);
        $("#reali").val(dataRow.reali);
        $("#duree").val(dataRow.duree);
        $("#annee").val(dataRow.annee);
    });

    // si vous cliquez sur le bouton click "btn-post"
    // on appelle la méthode "film_submit()
    // en lui passant 2 paramètres : la référence du bouton pour le désactiver et la type de méthode, ici POST.
    $("#btn-post").click(function() {
        film_submit($("#btn-post"), "POST", table);

    });

    // si vous cliquez sur le bouton click "btn-put"
    // on appelle la méthode "film_submit()
    // en lui passant 2 paramètres : la référence du bouton pour le désactiver et la type de méthode, ici PUT.
    $("#btn-put").click(function() {
        film_submit($("#btn-put"), "PUT", table);

    });

    //click on RESET
    $("#btn-reset").click(function() {
        resetForm(); // méthode qui met les valeurs des zones de textes du formulaire à blanc
        resetFeedBackFilm();
    });

    //click on GET
    $("#btn-get").click(function() {
        getFilm(); // affiche le film sélectionné(e) dans la DataTable
    });

    //click on DELETE
    $("#btn-delete").click(function() {
        deleteFilm(); // efface le film en fonction de l'identifiant


    });
});

/**
 * Charge les données dans la DataTable (JQuery)
 * @returns
 */
function loadDatatable() {
    $('#filmTable').DataTable({
        "columnDefs": [{
                "targets": [0],
                "sortable": false
            },
            {
                "targets": [1],
                "visible": true
            },
            {
                "targets": [2],
                "visible": true
            },
            {
                "targets": [3],
                "visible": true
            },
            {
                "targets": [4],
                "visible": true
            },
            {
                "targets": [5],
                "visible": true
            },

        ],
        "ajax": {
            url: '/api/film',
            dataSrc: ''
        },
        "columns": [
            { "data": "id" },
            { "data": "titre" },
            { "data": "genre" },
            { "data": "reali" },
            { "data": "duree" },
            { "data": "annee" }
        ]
    });

}
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
    film["reali"] = $("#reali").val();
    film["duree"] = $("#duree").val();
    film["annee"] = $("#annee").val();

    // on initialise l'url du back
    var url = "/api/film";

    // si c'est une modification, on passe l'identifiant
    if (httpVerb == "PUT")
        url += "/" + film["id"];

    // on désactive le bouton en cours 
    button.prop("disabled", true);

    // on lance la méthode ajax pour faire le lien avec les méthodes back du constructeur
    $.ajax({
        type: httpVerb, // méthode POST ou PUT
        contentType: "application/json", // type de données
        url: url, // url destinatrice
        data: JSON.stringify(film), // on transforme les données de la variable Javascript "film" en format JSON
        dataType: 'json', // on précise le mode de transfert
        cache: false, // pas de cache sollicité
        timeout: 600000, // délai d'attente
        success: function(data) { // si ok

            var json = "<h3>Server Response au format JSON</h3><pre>film (modifié/ajouté) :<br>" + JSON.stringify(data, null, 4) + "</pre>";

            $('#feedbackfilm').html(json); // renvoie les infos aux format JSON adapté au HTML dans la balise "<DIV id="feedbackfilm"> 

            console.log("SUCCESS : ", data);
            button.prop("disabled", false);

            resetForm()
        },
        error: function(e) {

            var json = "<h3>Server Response</h3><pre>" + e.responseText + "</pre>";

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
 * Méthode qui récupère un film
 * @returns
 */
function getFilm() {

    var idFilm = $("#id").val(); // on récupère la variable

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/api/film/" + idFilm,
        data: {},
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {

            var json = "<h3>Server Response format JSON</h3><pre>Film trouvé :<br>" + JSON.stringify(data, null, 4) + "</pre>";
            $('#feedbackfilm').html(json);
            $("#id").val(data.id);
            $("#titre").val(data.titre);
            $("#genre").val(data.genre);
            $("#reali").val(data.reali);
            $("#duree").val(data.duree);
            $("#annee").val(data.annee);
            console.log("SUCCESS : ", data);
        },
        error: function(e) {

            var json = "<h3>Server Response</h3><pre>" + e.responseText + "</pre>";

            $('#feedbackfilm').html(json);

            console.log("ERROR : ", e);
        }
    });
}

/**
 * méthode pour supprimer un film
 * @returns
 */
function deleteFilm() {

    var idFilm = $("#id").val();

    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/api/film/" + idFilm,
        //data : {},
        //dataType : 'json',
        cache: false,
        timeout: 600000,
        success: function(data) {

            var json = "<h3>Server Response</h3><pre>film " + idFilm + " deleted.</pre>";
            $('#feedbackfilm').html(json);
            console.log("SUCCESS : ", data);

            resetForm();
        },
        error: function(e) {
            var json = "<h3>Server Response</h3><pre>" + e.responseText + "</pre>";

            $('#feedbackfilm').html(json);
            console.log("ERROR : ", e);
        }
    });
}

// quand la page html est charge lance la fonction
$(document).ready(function() {

    // fonction appelée lors du click
    $("#btn-get").click(function(e) {
        getByTitre(e);
    });

    function getByTitre(e) {

        var titre = $("#titre").val(); // on récupère la variable
        e.preventDefault();

        $.ajax({// .ajax pour ne pas recharger la page mais juste le resultat de la fonction
            type : "GET",
            contentType : "application/json",
            url : "/api/bytitre/" + titre,
            data : {},// tableau vide pour recevoir la reponse body du controleur
            dataType : 'json',
            cache : false,// false car pas besoin de faire de cache
            timeout : 600000,
            success : function(data) {

                // pour faire le titre du tableau Json
                var json = "<h3>Server Response format JSON</h3><pre>Titre trouvé :<br>" + JSON.stringify(data, null, 4)+ "</pre>";

                $("#resultat").html(json);
                $("#id").val(data.id);
                $("#titre").val(data.titre);
                $("#real").val(data.real);
                $("#annee").val(data.annee);
                $("#duree").val(data.duree);
                console.log("SUCCESS : ", data);
            },
            error : function(e) {

                var json = "<h3>Server Response</h3><pre>" + e.responseText    + "</pre>";

                $("#resultat").html(json);

                console.log("ERROR : ", e);
            }
        });
    
    
});
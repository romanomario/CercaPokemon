$(document).ready(function() {
    $("form").keyup(delay(function(e) {
        e.preventDefault();

        function createCORSRequest(method, url) {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // XHR per Chrome/Firefox/Opera/Safari
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != "undefined") {
                // XDomainRequest per IE
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                // CORS non supportato
                xhr = null;
            }
            return xhr;
        }
        //Metodo di supporto per analizzare il tag del titolo dalla risposta
        function getTitle(text) {
            return text.match("<title>(.*)?</title>")[1];
        }
        // Realizzare la seguente richiesta CORS

        //la stringa viene passata in "$(#search").val();"
        var userInput = $("#search").val();
        document.getElementById('errorOut').style.display = "none";

        if(!userInput){
            document.getElementById('pokeOutput').style.display = "none";

        } else Ricerca(userInput);

        function Ricerca(userInput){
            var url = "https://pokeapi.co/api/v2/pokemon/" + userInput;

            $.ajax({
                url: url,
                dataType: "json",
                method: "GET",
                success: function(data) {
                    document.getElementById('pokeOutput').style.display = "block";
                    document.getElementById('errorOut').style.display = "none";


                    var name = data.forms[0].name,
                        pokeImgFront = data.sprites.front_default,
                        pokeImgBack = data.sprites.back_default,
                        frontImg = true,
                        speed = "<span class='stat'>Velocità: </span>" + data.stats[0].base_stat,
                        spDef = "<span class='stat'>Difesa speciale </span>" + data.stats[1].base_stat,
                        spAtk = "<span class='stat'>Attacco speciale: </span>" + data.stats[2].base_stat,
                        def = "<span class='stat'>Difesa: </span>" + data.stats[3].base_stat,
                        atk = "<span class='stat'>Attacco: </span>" + data.stats[4].base_stat,
                        hp = "<span class='stat'>PV: </span>" + data.stats[5].base_stat,
                        id = "#" + data.id,
                        weight = "<span class='stat'>Peso: </span>" + data.weight,
                        height = "<span class='stat'>Altezza: </span>" + data.height,
                        types = [];

                    for (var i = 0; i < data.types.length; i++) {

                        var type = data.types[i].type.name;
                        if (type == "normal") type = "normale";
                        else if (type == "grass") type = "erba";
                        else if (type == "ground") type = "terra";
                        else if (type == "rock") type = "roccia";
                        else if (type == "fighting") type = "lotta";
                        else if (type == "steel") type = "acciaio";
                        else if (type == "fire") type = "fuoco";
                        else if (type == "electric") type = "elettrico";
                        else if (type == "flying") type = "volante";
                        else if (type == "psychic") type = "psico";
                        else if (type == "bug") type = "insetto";
                        else if (type == "dragon") type = "drago";
                        else if (type == "water") type = "acqua";
                        else if (type == "ice") type = "ghiaccio";
                        else if (type == "poison") type = "veleno";
                        else if (type == "dark") type = "ombra";
                        else if (type == "ghost") type = "fantasma";
                        else if (type == "water") type = "folletto";

                        types.push(type);
                    }

                    function pokemonType(types) {
                        $("#types").html("");
                        for (var i = 0; i < types.length; i++) {
                            $("#types").append(
                                "<div class='pokeType poke-info " +
                                types[i] +
                                "'>" +
                                types[i] +
                                " </div>"
                            );
                        }
                    }

                    $(".changeBtn").click(function() {
                        if (frontImg == true) {
                            frontImg = false;
                            $("#pokeImage").attr("src", pokeImgBack);
                        } else if (frontImg == false) {
                            frontImg = true;
                            $("#pokeImage").attr("src", pokeImgFront);
                        }
                    });

                    $(".name").html(name);
                    $(".idNum").html(id);
                    $("#pokeImage").attr("src", pokeImgFront);
                    $(".speed").html(speed);
                    $(".height").html(height);
                    $(".weight").html(weight);
                    $(".hp").html(hp);
                    $(".attack").html(atk);
                    $(".defense").html(def);
                    pokemonType(types);
                }, //SUCCESS
                error: function(xhr, ajaxOptions, thrownError) {
                    if (xhr.status == 404) {
                        RicercaParziale(userInput);
                    }
                }
            }); } //AJAX 
            function RicercaParziale(userInput){
                var url2 = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=900";
                        $.ajax({
                            url: url2,
                            dataType: "json",
                            method: "GET",
                            success: function(data2) {
                                var len = userInput.length;
                                var res = false;
                                for (var i = 0; i < data2.results.length && res == false; i++) {
                                    var x = data2.results[i].name.substr(0, len);
                                    if ($("#search").val() == x) {
                                        console.log("Forse intendevi " + data2.results[i].name);
                                        res = true;
                                    }
                                    
                                }

                            if(res){
                                Ricerca(data2.results[i-1].name);
                            }else
                                document.getElementById('pokeOutput').style.display = "none";
                                var error = "<span class='stat'>Spiacenti non è stato trovato nessun pokemon: </span>";
                                $(".error").html(error);
                                document.getElementById('errorOut').style.display = "block";
                            } 
                        })
            }
        }, 200));
    function delay(callback, ms) {
        var timer = 0;
        return function() {
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                callback.apply(context, args);
            }, ms || 0);
        };
    }
    //FORM
});
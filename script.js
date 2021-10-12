$(document).ready(function() {
    $("input").keyup(delay(function(e) {
        e.preventDefault();

        //la stringa viene passata in "$(#search").val();"
        var userInput = $("#search").val();
        document.getElementById('errorOut').style.display = "none";

        if(!userInput){
            document.getElementById('pokeOutput').style.display = "none";

        } else RicercaFetch(userInput);

        /** nuovo tipo di ricerca usando il fetch e non più il json */
        function RicercaFetch(userInput){
            var urlf = "https://pokeapi.co/api/v2/pokemon/" + userInput; 
            fetch(urlf).then(response => {
                if (response.ok) {
                    response.json().then(data => {

                        //metodo corretto per prendere i dati in json da questo metdono di merda
                        document.getElementById('pokeOutput').style.display = "block";
                    document.getElementById('errorOut').style.display = "none";

                        var name = data.forms[0].name,
                        pokeImgFront = data.sprites.front_default,
                        pokeImgBack = data.sprites.back_default,
                        frontImg = true,
                        speed = "<span class='stat'>Velocità: </span>" + data.stats[0].base_stat,
                        def = "<span class='stat'>Difesa: </span>" + data.stats[3].base_stat,
                        atk = "<span class='stat'>Attacco: </span>" + data.stats[4].base_stat,
                        hp = "<span class='stat'>PV: </span>" + data.stats[5].base_stat,
                        id = "#" + data.id,
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
                    $(".hp").html(hp);
                    $(".attack").html(atk);
                    $(".defense").html(def);
                    pokemonType(types);
                    });
                //successo finito
                }
                if (response.status >= 100 && response.status < 200) {
                   console.log("Informazioni per il client");
                }
                if (response.status >= 300 && response.status < 399) {
                   console.log("Redirezione");
                }
                if (response.status >= 400 && response.status < 499) {
                    //mettere qui l'errore e la chiamata a ricerca parziale
                   console.log("Richiesta errata");
                   RicercaParzialeFetch(userInput);
                }
                if (response.status >= 500 && response.status < 599) {
                   console.log("Errore sul server");
                }
            }).catch(error => console.log("Si è verificato un errore!"))
        }   
            //la ricarca parziale deve essere sempre evocata e illustrare più tipi di pokemon 
            function RicercaParzialeFetch(userInput){
                fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=900").then(response => {
                if (response.ok) {
                    console.log("Contenuto ricevuto nella ricerca parziale");
                    response.json().then(data2 => {
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
                                RicercaFetch(data2.results[i-1].name);
                            }else{
                                document.getElementById('pokeOutput').style.display = "none";
                                var error = "<span class='stat'>Spiacenti non è stato trovato nessun pokemon: </span>" + userInput;
                                $(".error").html(error);
                                document.getElementById('errorOut').style.display = "block";
                            }
                      });
                }
                if (response.status >= 100 && response.status < 200) {
                console.log("Informazioni per il client nella ricerca parziale");
                }
                if (response.status >= 300 && response.status < 399) {
                console.log("Redirezione nella ricerca parziale");
                }
                if (response.status >= 400 && response.status < 499) {
                console.log("Richiesta errata nella ricerca parziale");
                }
                if (response.status >= 500 && response.status < 599) {
                console.log("Errore sul server nella ricerca parziale");
                }
            }).catch(error => console.log("Si è verificato un errore nella ricerca parziale!"))
            }
        }, 300));

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
});
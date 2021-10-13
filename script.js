$(document).ready(function() {
    document.getElementById('errorOut').style.display = "none";
    document.getElementById('loading').style.display = "none";

    var type = new Array();
    type['normal'] = 'normale';
    type['grass'] = 'erba';
    type['ground'] = 'terra';
    type['rock'] = 'roccia';
    type['fighting'] = 'lotta';
    type['steel'] = 'acciaio';
    type['fire'] = 'fuoco';
    type['electric'] = 'elettro';
    type['flying'] = 'volante';
    type['psychic'] = 'psico';
    type['bug'] = 'insetto';
    type['dragon'] = 'drago';
    type['water'] = 'acqua';
    type['ice'] = 'ghiaccio';
    type['poison'] = 'veleno';
    type['dark'] = 'ombra';
    type['ghost'] = 'fantasma';
    type['fairy'] = 'folletto';

    $("input").keydown(function(e){
            document.getElementById('loading').style.display = "block";
        }
    );

    $("input").keyup(delay(function(e) {
        console.log("Siamo entrati nella richiesta con keyup");
        Ricerca();
    }, 300));

    $("form").on("submit", function(e) {
        e.preventDefault();
        console.log("siamo entarti con submit");
       Ricerca();
    });

    //FUNZIONI
    function Ricerca(){
        document.getElementById('loading').style.display = "none";

        let userInput = $("#search").val();
        document.getElementById('errorOut').style.display = "none";

        if(!userInput){
            document.getElementById('pokeOutput').style.display = "none";

        } else RicercaFetch(userInput);
    }

    function delay(callback, ms) {
        let timer = 0;
        return function() {
            let context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() {
                callback.apply(context, args);
            }, ms || 0);
        };
    }
    function RicercaFetch(userInput){
            
        const url = "https://pokeapi.co/api/v2/pokemon/" + userInput; 
        fetch(url).then(response => {
            if (response.ok) {
                document.getElementById('errorOut').style.display = "none";
                
                response.json().then(data => {
                    let name = data.forms[0].name,
                    pokeImgFront = data.sprites.front_default,
                    pokeImgBack = data.sprites.back_default,
                    frontImg = true,
                    speed = "<span class='stat'>Velocità: </span>" + data.stats[0].base_stat,
                    def = "<span class='stat'>Difesa: </span>" + data.stats[3].base_stat,
                    atk = "<span class='stat'>Attacco: </span>" + data.stats[4].base_stat,
                    hp = "<span class='stat'>PV: </span>" + data.stats[5].base_stat,
                    id = "#" + data.id,
                    types = [];

                for (let i = 0; i < data.types.length; i++) {
                    types.push(type[data.types[i].type.name]);
                }

                function pokemonType(types) {
                    $("#types").html("");
                    for (let i = 0; i < types.length; i++) {
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
                
                document.getElementById('pokeOutput').style.display = "block";
            });
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
                let y;
                let len = userInput.length;
                        let res = false;
                        for (let i = 0; i < data2.results.length && res == false; i++) {
                            let x = data2.results[i].name.substr(0, len);
                            if ($("#search").val() == x) {
                                console.log("Forse intendevi " + data2.results[i].name);
                                res = true;
                                y=i;
                            }
                            
                        }
                    if(res){
                        RicercaFetch(data2.results[y].name);
                    }else{
                        document.getElementById('pokeOutput').style.display = "none";
                        let error = "<span class='stat'>Spiacenti non è stato trovato nessun pokemon: </span>" + userInput;
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
});
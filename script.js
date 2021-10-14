$(document).ready(function() {
    document.getElementById('loading').style.display = "none";

    var typingTimer;         
    var doneTypingInterval = 200;

    var tipo = new Array();
    tipo['normal'] = 'Normale';
    tipo['grass'] = 'Erba';
    tipo['ground'] = 'Terra';
    tipo['rock'] = 'Roccia';
    tipo['fighting'] = 'Lotta';
    tipo['steel'] = 'Acciaio';
    tipo['fire'] = 'Fuoco';
    tipo['electric'] = 'Elettro';
    tipo['flying'] = 'Volante';
    tipo['psychic'] = 'Psico';
    tipo['bug'] = 'Insetto';
    tipo['dragon'] = 'Drago';
    tipo['water'] = 'Acqua';
    tipo['ice'] = 'Ghiaccio';
    tipo['poison'] = 'Veleno';
    tipo['dark'] = 'Ombra';
    tipo['ghost'] = 'Fantasma';
    tipo['fairy'] = 'Folletto';

    $("input").keydown(function(e){
            document.getElementById('loading').style.display = "block";
        }
    );

    $("input").keyup(function(e){
        clearTimeout(typingTimer);
        typingTimer = setTimeout(Ricerca, doneTypingInterval);
    }
    );

    $("form").on("submit", function(e) {
        e.preventDefault();
        console.log("siamo entarti con submit");
       Ricerca();
    });

    //FUNZIONI
    function Ricerca(){
        document.getElementById('loading').style.display = "none";

        let userInput = $("#search").val();

        if(userInput == ""){
            console.log("la lista è vuota");
        }
        
        fetchPokemon(userInput);
    }

    function fetchPokemon(userInput) {
        const promises = [];

        fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=900").then(response => {
            if (response.ok) {
                console.log("Contenuto ricevuto nella ricerca");
                document.getElementById('error').style.display = "none";
                response.json().then(data => {
                    let y;
                    let len = userInput.length;
                    let res = false;
                    for (let i = 0; i < data.results.length; i++) {
                        let x = data.results[i].name.substr(0, len);
                        if (userInput == x) {
                            console.log(data.results[i].name);
    
                            var url = `https://pokeapi.co/api/v2/pokemon/${data.results[i].name}`;
                            promises.push(fetch(url).then((res) => res.json()));
                        }  
                    }
    
                    Promise.all(promises).then((results) => {
                        const pokemon = results.map((result) => ({
                            name: result.name,
                            image: result.sprites['front_default'],
                            type: result.types.map((type) => tipo[type.type.name]).join(', '),
                            id: result.id,
                            defense: result.stats[3].base_stat,
                            attack: result.stats[4].base_stat
                        }));
                        displayPokemon(pokemon);
                    });
                  
                    if(promises.length == 0){
                        console.log("promise lengt == 0");
                        document.getElementById('error').style.display = "block";  
                        displayError(userInput);
                      }
    
                  });
                  
            }
        }).catch(error => console.log("Si è verificato un errore nella ricerca!"))
        
    }
    
    function displayPokemon(pokemon){
        const pokemonHTMLString = pokemon
            .map(
                (pokeman) => `
            <li class="card">
                <img class="card-image" src="${pokeman.image}"/>
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p class="card-subtitle">Tipo:${pokeman.type}</p>
                <p class="card-subtitle">Attacco: ${pokeman.attack} </p>
                <p class="card-subtitle">Difesa: ${pokeman.defense} </p>
            </li>
        `
            )
            .join('');
      
        document.getElementById('pokedex').innerHTML = pokemonHTMLString;
    }


    function displayError(msg){
        document.getElementById('error').innerHTML = '<li class="card"><p class="card-subtitle"> Non è stata trovato nessun pokemon '+ msg +'</p></li>';
    }
});
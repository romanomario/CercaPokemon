$(document).ready(function() {
    displayNone('loading');

    $("input").keydown(function(e) {
        displayBlock('loading');
    });
    
    var timeout = null
$('input').on('keyup', function(e) {
    clearTimeout(timeout)
    timeout = setTimeout(function() {
        e.preventDefault();
        console.log("Siamo entrati con keyup");
        Ricerca();
    }, 500)
})
    
    $("form").on("submit", function(e) {
        e.preventDefault();
        console.log("Siamo entrati con submit");
        Ricerca();
    });
});

function Ricerca(){
    const userInput = document.getElementById('search').value.toLowerCase();
        
    if(userInput == ""){ 
        displayPokemon([]);
        displayNone('loading');
        displayNone('error');
    }else{
        displayNone('error');
        fetchPokemon(userInput).then((pokemonList) =>{
            if(pokemonList == false){
                displayError(userInput);
                displayBlock('error');
            }
            displayPokemon(pokemonList);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            displayNone('loading');
        });
    }
}

function displayNone(id){
    document.getElementById(id).style.display = "none";
}
function displayBlock(id){
    document.getElementById(id).style.display = "block";
}
function displayError(msg) {
    console.log("Non è stato trovato nessun pokemon: " + msg);
    document.getElementById('error').innerHTML = '<li class="card"><p class="card-subtitle"> Non è stato trovato nessun pokemon ' + msg + '</p></li>';
}

function displayPokemon(pokemon) {
    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <form id="${pokeman.id}" action="pokemon.html">
        <li class="card" onclick="scheda(this.id)" id="${pokeman.id}" >
            <img class="card-image mx-auto d-block" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Tipo: ${pokeman.type}</p>
            <p class="card-subtitle">Attacco: ${pokeman.attack} </p>
            <p class="card-subtitle">Difesa: ${pokeman.defense} </p>
            <input type = "hidden" name = "nome" value = "${pokeman.name}" />
            </li>
        </form>
    `
        )
        .join('');
    
    
    document.getElementById('pokedex').innerHTML = pokemonHTMLString;
}

function scheda(val){
    console.log("è stato cliccato " + val);
    document.getElementById(val).submit();
}

function displayPokemonComplete(pokemon) {
    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <li class="card">
            <img class="card-image mx-auto d-block" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Tipo: ${pokeman.type}</p>
            <p class="card-subtitle">Attacco: ${pokeman.attack} </p>
            <p class="card-subtitle">Attacco Speciale: ${pokeman.special_attack} </p>
            <p class="card-subtitle">Difesa: ${pokeman.defense} </p>
            <p class="card-subtitle">Difesa Speciale: ${pokeman.special_defense} </p>
            <p class="card-subtitle">Altezza: ${pokeman.height} </p>
            <p class="card-subtitle">Peso: ${pokeman.weight} </p>
            <p class="card-subtitle">Velocità: ${pokeman.speed} </p>
        </li>
    `
        )
        .join('');
    
    document.getElementById('pokemon').innerHTML = pokemonHTMLString;
}
let vuoto = new Array();
let tipo = {
normal: 'Normale',
grass: 'Erba',
gound: 'Terra',
rock: 'Roccia',
fighting: 'Lotta',
steel: 'Acciaio',
fire: 'Fuoco',
electric: 'Elettro',
psychic: 'Psico',
bug: 'Insetto',
dragon: 'Drago',
water: 'Acqua',
ice: 'Ghiaccio',
poison: 'Veleno',
dark: 'Ombra',
ghost: 'Fantasma',
fairy: 'Folletto'
};
/**
 * realizzare una funzione FetchPokem a cui viene passato l'user input,restituido tutti i pokemon risultato
 * realizzare funzione che li manda in output con displayPokemon
 * realizzare in script js , tutta la funzione di ricerca con gli errori e le funzioni che stanno qua
 * gestendo anche l'icona di carimento e i messaggi di errore 
 * 
 * fare in modo che la funzione di ricerca possa essere resa universale
 * eliminare tutto il codice jquery e usare solo il codice javascript
 * aggiustare funzione di delay poichè non funzionanete perchè non cancella il settimeout usare clearingtimeout
 */

function fetchPokemon() {
    console.log("Fetch");
    const promises = [];
    displayNone('loading');
    let userInput = $("#search").val().toLowerCase();
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=900").then(response => {
        if (response.ok && userInput !== "") {
            displayNone('error');
            response.json().then((data) => {
                let y;
                let len = userInput.length;
                for (let i = 0; i < data.results.length; i++) {
                    let x = data.results[i].name.substr(0, len);
                    if (userInput === x) {
                        const url = `https://pokeapi.co/api/v2/pokemon/${data.results[i].name}`;
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

                if (promises.length === 0) {
                    displayBlock('error');
                    displayError(userInput);
                }

            });
        }
        if (userInput === "") {
            console.log("Non è stata inserita nessuna stringa");
            displayPokemon(vuoto);
        }
    }).catch(error => console.log("C'è stato un problema nella ricerca"))

}

function displayPokemon(pokemon) {
    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <li class="card">
            <img class="card-image mx-auto d-block" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Tipo: ${pokeman.type}</p>
            <p class="card-subtitle">Attacco: ${pokeman.attack} </p>
            <p class="card-subtitle">Difesa: ${pokeman.defense} </p>
        </li>
    `
        )
        .join('');

    document.getElementById('pokedex').innerHTML = pokemonHTMLString;
}

function displayError(msg) {
    console.log("Non è stato trovato nessun pokemon: " + msg);
    document.getElementById('error').innerHTML = '<li class="card"><p class="card-subtitle"> Non è stato trovato nessun pokemon ' + msg + '</p></li>';
}
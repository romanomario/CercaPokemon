const tipo = {
    normal: 'Normale' ,
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
    ice: 'Ghiaccio' ,
    poison: 'Veleno',
    dark: 'Ombra',
    ghost: 'Fantasma',
    fairy: 'Folletto',
};

function occ(userInput,item){ 
    var punteggio = 0;
    for (let j = 0; j < userInput.length; j++) {
        for (let i = 0; i < item.name.length; i++) {
            if(userInput[j] === item.name.substr(i,userInput[j].length)){
                punteggio++;
            }
        }
    }
    if(punteggio){
        item.punteggio = punteggio;
        return item;
    }
}

function fetchPokemon(userInput) {
    return fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=900").then((response) => response.json())
        .then((data) => {
            const promises = data.results.filter((item) => occ(userInput, item))
                .map((item) => fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`).then((response) => response.json())
                    .then((data) => ({
                        name: data.name,
                        image: data.sprites['front_default'],
                        type: data.types.map((type) => tipo[type.type.name]).join(' '),
                        id: data.id,
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        special_attack: data.stats[3].base_stat,
                        special_defense: data.stats[4].base_stat,
                        speed: data.stats[5].base_stat,
                        weight: data.weight,
                        height: data.height,
                        punteggio: item.punteggio,
                    })));
        return Promise.all(promises);
    });
}
function fetchPokemonComplete(nome) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`).then((response) => response.json())
            .then((data) => ({
                name: data.name,
                image: data.sprites['front_default'],
                image2: data.sprites['back_default'],
                type: data.types.map((type) => tipo[type.type.name]).join(' '),
                id: data.id,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                special_attack: data.stats[3].base_stat,
                special_defense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
                weight: data.weight,
                height: data.height,
            }));
}   

/** 
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
*/

  
    
    
    
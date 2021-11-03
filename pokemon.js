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
    for (let i = 0; i < item.name.length; i++) {
        if(userInput === item.name.substr(i,userInput.length)){
            console.log(item.name + " => " + userInput);
            return item;
        }
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
                    })));
        return Promise.all(promises);
    });
}


  
    
    
    
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

function fetchPokemon(userInput) {
    return fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=900").then((response) => response.json())
        .then((data) => {
            const promises = data.results.filter((item) => userInput === item.name.substr(0, userInput.length))
                .map((item) => fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`).then((response) => response.json())
                    .then((data) => ({
                        name: data.name,
                        image: data.sprites['front_default'],
                        type: data.types.map((type) => tipo[type.type.name]).join(' '),
                        id: data.id,
                        defense: data.stats[3].base_stat,
                        attack: data.stats[4].base_stat,
                    })));
        return Promise.all(promises);
    });
}
    
    
    
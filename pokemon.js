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
fairy: 'Folletto'};

var prova = [];


function fetchPokemon(userInput) {
    const promises = [];
    var pokemon = [];
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=900").then(response => {
        if (response.ok) {
            response.json().then((data) => {
                data.results.forEach(d => {
                    if (userInput === d.name.substr(0, userInput.length)) {
                        fetch(`https://pokeapi.co/api/v2/pokemon/${d.name}`).then(res => {
                            if (response.ok) {
                                promises.push(res.json());
                                Promise.all(promises).then((results) => {
                                    pokemon = results.map((result) => ({
                                    name: result.name,
                                    image: result.sprites['front_default'],
                                    type: result.types.map((type) => tipo[type.type.name]).join(' '),
                                    id: result.id,
                                    defense: result.stats[3].base_stat,
                                    attack: result.stats[4].base_stat,
                                    })
                                    //,prova.push(...pokemon)
                                    );
                                    prova.push(pokemon);
                                    
                                    //console.log(results);
                                    //console.log([...results]);
                                    //displayPokemon(pokemon);
                                });
                            }
                        })
                    }
                });
            });
        }
    })
    //console.log(prova);
    return prova;
}




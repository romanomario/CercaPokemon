
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var nome = urlParams.get('nome');

fetchPokemonComplete(nome).then((pokemonList) =>{
    if(pokemonList == false){
    }
    displayPokemonComplete(pokemonList);
});

function fetchPokemonComplete(userInput) {
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


function displayPokemonComplete(pokemon) {
const pokemonHTMLString = pokemon
.map((pokeman) => `
<li class="cardo">
    <img class="card-image2 mx-auto d-block" src="${pokeman.image}"/>
    <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
</li>
<li class="cardo">
    <p class="card-tile">Tipo: <p class="card-subtitle">${pokeman.type}</p></p>
    <p class="card-tile">Altezza: <p class="card-subtitle">${pokeman.height}</p></p>
    <p class="card-tile">Peso: <p class="card-subtitle">${pokeman.weight}</p></p>
</li>
<li class="cardo">
    <p class="card-tilte">Attacco:<p class="card-subtitle">${pokeman.attack}</p></p>
    <p class="card-tilte">Attacco Speciale:<p class="card-subtitle">${pokeman.special_attack}</p></p>
    <p class="card-tilte">Difesa:<p class="card-subtitle">${pokeman.defense}</p></p>
    <p class="card-tilte">Difesa Speciale:<p class="card-subtitle">${pokeman.special_defense}</p></p>
    <p class="card-tilte">Velocità:<p class="card-subtitle">${pokeman.speed}</p></p>
</li>
`
)
.join('');

document.getElementById('pokemon').innerHTML = pokemonHTMLString;
}

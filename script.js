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
        Ricerca();
    }, 500)
})
    
    $("form").on("submit", function(e) {
        e.preventDefault();
        Ricerca();
    });
});

function Ricerca(){
    const userInput = document.getElementById('search').value.toLowerCase();
    var input = [];
    $('#1').addClass('d-none');
    $('#2').removeClass('d-none');

    userInput.trim();

    input = userInput.trim().split(' ');

    input = [...new Set(input)];

    console.log(input);
    
    if(input == ""){ 
        displayPokemon([]);
        displayNone('loading');
        displayNone('error');
        console.log("Non è stata inserita nessuna stringa");
    }else{
        displayNone('error');
        fetchPokemon(input).then((pokemonList) =>{
            if(pokemonList == false){
                displayError(userInput);
                displayBlock('error');
            }
            displayPokemon(pokemonList,input);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            displayNone('loading');
        });   
    }
}

function displayNone(id){
    document.getElementById(id).style.display = 'none';
}
function displayBlock(id){
    document.getElementById(id).style.display = 'block';
}
function displayError(msg) {
    console.log("Non è stato trovato nessun pokemon: " + msg);
    document.getElementById('error').innerHTML = '<li class="card"><p class="card-subtitle"> Non è stato trovato nessun pokemon ' + msg + '</p></li>';
}

function mySorter(a, b){
    var vA = a.punteggio;
    var vB = b.punteggio;
    if(vA > vB) return -1;
    if(vA < vB) return 1;
    return 0;
}

function scheda(val){
    $('#2').addClass('d-none');
    $('#1').removeClass('d-none');
    fetchPokemonComplete(val).then((pokemon) =>{
        displayPokemonComplete(pokemon);
    });
}

function comeback(){
    $('#2').removeClass('d-none');
    $('#1').addClass('d-none');
    document.getElementById('#search').focus();
}


function occNome(nome,input){

    var x = [];
    
    for (let p = 0; p < input.length; p++) {
        for (let i = 0, j = 0; i < nome.length; i++) {
            if(nome[i] == input[p][j]){
                j ++;
            }else{
                j = 0;
            }
            if(j == input[p].length){
                for (let z = 0; z < input[p].length; z++) {
                    x.push(z+i-(j-1));
                }
                j = 0;
            }
        }
    }

    x.sort();

    nome = capitalize(nome);

    //console.log("Nome = " + nome + " occ " + x);

    var stringa = "<h2>";
    for (let i = 0,j = 0; i < nome.length; i++) {
        if(i == x[j]){
            stringa = stringa + '<span id="ev">';
            while(i == x[j]){
                stringa = stringa + nome[i];
                i++;
                j++;
            }
            stringa = stringa + "</span>";
            if((i !== x[j]) && (i < nome.length)){
                stringa = stringa + nome[i];
            }
        }else{
            stringa = stringa + nome[i];
        }
    }
    stringa = stringa + "</h2>";
    
    return stringa;
}

function capitalize(sentence){
    return sentence && sentence[0].toUpperCase() + sentence.slice(1);
}

function displayPokemon(pokemon,input) {

    pokemon.sort(mySorter);

    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <li class="card" onclick="scheda(this.id)" id="${pokeman.id}" >
            <img class="card-image mx-auto d-block" src="${pokeman.image} "/>
            <h2 class="card-title">${pokeman.id}. ${occNome(pokeman.name,input)}</h2>
        </li>
    `
        )
        .join('');
    
    
    document.getElementById('pokedex').innerHTML = pokemonHTMLString;
}

function displayPokemonComplete(pokeman) {



    const pokemonHTMLString =`
    <li class="cardo2">
        <img class="card-image2 mx-auto d-block " id="image1" onclick="change()" src="${pokeman.image}"/>
        <img class="card-image2 mx-auto d-block d-none" id="image2" onclick="change2()" src="${pokeman.image2}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
    <li class="cardo2">
        <p>Tipo: <p class="card-subtitle">${pokemonType(pokeman.type)}</p></p>
        <p>Altezza: <p class="card-subtitle">${pokeman.height} cm</p></p>
        <p>Peso: <p class="card-subtitle">${pokeman.weight} kg</p></p>
    </li>
    <li class="cardo2">
        <p>Attacco:<p class="card-subtitle">${pokeman.attack}</p></p>
        <p>Attacco Speciale:<p class="card-subtitle">${pokeman.special_attack}</p></p>
        <p>Difesa:<p class="card-subtitle">${pokeman.defense}</p></p>
        <p>Difesa Speciale:<p class="card-subtitle">${pokeman.special_defense}</p></p>
        <p>Velocità:<p class="card-subtitle">${pokeman.speed}</p></p>
    </li>`;
    
    document.getElementById('pokemon').innerHTML = pokemonHTMLString;
}

function pokemonType(types) {
    var a=[],s=[];
    a = types.split(' ');

    a.forEach(element => {
      s = s + '<span class="pokeType poke-info ' + element + '">' + element + '</span> ';  
    });

    console.log(s);

    return s;
}

function change(){
    $('#image2').removeClass('d-none');
    $('#image1').addClass('d-none');
}
function change2(){
    $('#image1').removeClass('d-none');
    $('#image2').addClass('d-none');
}


    
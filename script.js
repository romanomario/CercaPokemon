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

    for (let i = userInput.length,z = userInput.length; i != -2; i--) {
        if((userInput[i] == " ") || (i < 0)){
            input.push(userInput.substring(i+1,z));
            z = i;
        }
    }

    input = [...new Set(input)]

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

function displayPokemon(pokemon,input) {

    pokemon.sort(mySorter);

    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <form id="${pokeman.id}" action="pokemon.html">
        <li class="card" onclick="scheda(this.id)" id="${pokeman.id}" >
            <img class="card-image mx-auto d-block" src="${pokeman.image} "/>
            <h2 class="card-title">${pokeman.id}. ${occNome(pokeman.name,input)}</h2>
            <input type = "hidden" name = "nome" value = "${pokeman.name}" />
            </li>
        </form>
    `
        )
        .join('');
    
    
    document.getElementById('pokedex').innerHTML = pokemonHTMLString;
}

function scheda(val){
    document.getElementById(val).submit();
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

    console.log("Nome = " + nome + " occ " + x);

    var stringa = "<h2>";
    for (let i = 0,j = 0; i < nome.length; i++) {
        if(i == x[j]){
            stringa = stringa + "<span>";
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
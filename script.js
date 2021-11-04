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
            displayPokemon(pokemonList,userInput);
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

function displayPokemon(pokemon,userInput) {
    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <form id="${pokeman.id}" action="pokemon.html">
        <li class="card" onclick="scheda(this.id)" id="${pokeman.id}" >
            <img class="card-image mx-auto d-block" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.id}. ${occNome(pokeman.name,userInput)}</h2>
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

function occNome(nome,userInput){
    var x = [];
    for (let i = 0, j = 0; i < nome.length ; i++) {
        if(nome[i] == userInput[j]){
            j ++;
        }else{
            j = 0;
        }
        if(j == userInput.length){
            x.push(i-(j-1));
            j == 0;
        }
    }
    
    var lenx = userInput.length;
    var stringa = "<h2>",index = 0,j = 0;
    while((index < nome.length) && ((j-1) <= userInput.length)){
        lenx = userInput.length;    
        if(index == x[j]){
            stringa = stringa + "<span >" + nome[index];
            lenx--;
            while(lenx > 0){
                index++;
                stringa = stringa + nome[index];
                lenx--;
            }
            if(lenx == 0){
                stringa = stringa + "</span>";
                j++;
            }
        }else{
            stringa = stringa + nome[index];
        }
        index++;
    }

    return stringa;
}
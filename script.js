$(document).ready(function() {
    displayNone('loading');

    //metaKey altKey ctrlKey
    $("input").keydown(function(e) {
        if((!e.shiftKey) && (!e.metaKey) && (!e.altKey) && (e.crtlKey)){
            displayBlock('loading');
        }
    });
    
    var timeout = null
$('input').on('keyup', function(e) {
    clearTimeout(timeout)
    timeout = setTimeout(function() {
        e.preventDefault();
        if((!e.shiftKey) && (!e.metaKey) && (!e.altKey) && (e.crtlKey)){
            Ricerca();
        }
    }, 500)
})
    
    $("form").on("submit", function(e) {
        e.preventDefault();
        Ricerca();
    });
});

function Ricerca(){    
    $('#1').addClass('d-none');
    $('#2').removeClass('d-none');

    const userInput = document.getElementById('search').value.toLowerCase();
    var input = correctInput(userInput);
    
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

/**
 * 
 * @param {*} userInput 
 * Canecellare tutti gli spazi presenti nell'input
 * Cancellare tutti gli elementi non unici
 */
function correctInput(userInput){
    var input = [];

    userInput.trim();//elimina spazi iniziali e finali

    userInput = userInput.split(' ');

    userInput.forEach(element => {
        if(element.trim()){
            input.push(element.trim());
        }
    });

    input = [...new Set(input)];

    return input;
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

function removeClass(id){
    const s = "#" + id;
    $(s).removeClass('d-none');
}

function addClass(id){
    const s = "#" + id;
    $(s).addClass('d-none');
}

function scheda(val){
    addClass(2);
    removeClass(1);
    fetchPokemonComplete(val).then((pokemon) =>{
        displayPokemonComplete(pokemon);
    });
}

function comeback(){
    console.log("Stiamo tornando indietro");
    removeClass(2);
    addClass(1);
    displayNone("button");
    document.getElementById('#search').focus();
}

function occNome(nome,input){

    var x = [];
    
    /*
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
    }*/

    //giriamo tutti gli input a disposizione
    for (let p = 0; p < input.length; p++) {
        //giriamo tutto il nome fornito
        for (let i = 0, j = 0; i < nome.length; i++) {
            if(nome[i] == input[p][j]){
                if(input[p].length == 1){
                    x.push(i);
                }
                //test
                else if(input[p].length > 1){
                    let z;
                    j++;
                    i++;
                    for (z = 1 ;((z < input[p].length) && (j > 0)); z++,i++) {
                        if(nome[i] == input[p][z]){
                            j++;
                        }else{
                            j = 0;
                        }
                    }
                    i = i - (z);
                    if( j == input[p].length){
                        //i posizione della prima occorrenza
                        //dobbiamo pushare in x, tutti i fino a input[p].lenght
                        for ( z = 0; z < input[p].length; z++) {
                            x.push(i);
                            i++;
                        }
                    }
                    j = 0;
                }
            }
        }
    }

    x.sort();

    nome = capitalize(nome);

    x = [...new Set(x)];

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

    displayBlock("button");
    const pokemonHTMLString =`
    <li class="cardo2">
        <img class="card-image2 mx-auto d-block " id="image1" onclick="change()" src="${pokeman.image}"/>
        <img class="card-image2 mx-auto d-block d-none" id="image2" onclick="change2()" src="${pokeman.image2}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
    <li class="cardo2">
        <div class="container">
            <div class="row my-3">
            <div class="col">
                <p>Tipo:</p>
            </div>
            <div class="col-9">
                    <p class="card-subtitle">${pokemonType(pokeman.type)}</p>
                </div>
            </div>
            <div class="row justify-content-between my-3">
                <div class="col-8">
                    <p>Altezza:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle">${pokeman.height} cm</p>
                </div>
            </div>
            <div class="row justify-content-between my-3">
                <div class="col-8">
                    <p>Peso:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle">${pokeman.weight} kg</p>
                </div>
            </div>
        </div>
    </li>
    <li class="cardo2">
    <div class="row justify-content-between my-2">
                <div class="col-8">
                    <p>Attacco:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle">${pokeman.attack}</p>
                </div>
            </div>
            <div class="row justify-content-between my-2">
            <div class="col-8">
                <p>Attacco Speciale:</p>
            </div>
            <div class="col">
                <p class="card-subtitle">${pokeman.special_attack}</p>
            </div>
        </div>
        <div class="row justify-content-between my-2">
                <div class="col-8">
                    <p>Difesa:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle">${pokeman.defense}</p>
                </div>
            </div>
            <div class="row justify-content-between my-2">
                <div class="col-8">
                    <p>Difesa Speciale:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle">${pokeman.special_defense}</p>
                </div>
            </div>
            <div class="row justify-content-between my-2">
                <div class="col-8">
                    <p>Velocità:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle">${pokeman.speed} </p>
                </div>
            </div>

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


    
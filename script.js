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
    $('#pokemon').addClass('d-none');
    $('#pokedex').removeClass('d-none');

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
    addClass('pokedex');
    removeClass('pokemon');
    fetchPokemonComplete(val).then((pokemon) =>{
        displayPokemonComplete(pokemon);
    });
}

function comeback(){
    console.log("Stiamo tornando indietro");
    removeClass('pokedex');
    addClass('pokemon');
    displayNone("button");
    document.getElementById('#search').focus();
}

// Precondition: inputs cannot contain "".
function occNome(nome,input){

    const x = [];
    
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
        for (let i = 0; i < nome.length; i++) {
            let j = 0;
            const word = input[p];
            if (nome[i] === word[j]) {
                if(word.length === 1){
                    if (!x.includes(i)) {
                        // if (nome === 'bulbasaur') { console.log('adding single', i); }
                        x.push(i);
                    }
                } else {
                    j++;
                    i++;
                    // if (nome === 'bulbasaur') { console.log('_', i, j); }
                    let z = 1;
                    while (z < word.length && nome[i++] === word[z]) {
                        j++;
                        z++;
                    }
                    i -= z;
                    if (z === word.length) {
                        //i posizione della prima occorrenza
                        //dobbiamo pushare in x, tutti i fino a word.lenght
                        for (z = 0; z < word.length; z++) {
                            if (!x.includes(i)) {
                                // if (nome === 'bulbasaur') { console.log('adding box', i); }
                                x.push(i);
                            }
                            i++;
                        }
                    } else {
                        // if (nome === 'bulbasaur') { console.log('sss'); }
                    }
                }
            }
        }
    }

    x.sort((a, b) => a - b);

    // if (nome === 'bulbasaur') { console.log(x); }
    nome = capitalize(nome);

    let stringa = "<h2>";
    let i = 0, j = 0;
    let inBox = false;
    while (i < nome.length) {
        if (!inBox && i === x[j]) {
            inBox = true;
            stringa += '<span id="ev">';
            // if (nome === 'Bulbasaur') { console.log('blocco aperto su', x[j]); }
        }
        stringa += nome[i++];
        if (inBox) {
            j++;
        }
        // if (nome === 'Bulbasaur') { console.log('scritto "', nome[i - 1], '": ', i, j, x[j]); }
        if (inBox && (i >= nome.length || i !== x[j])) {
            inBox = false;
            stringa += "</span>";
            // if (nome === 'Bulbasaur') { console.log('blocco chiuso su', x[j - 1]); }
        }
    }
    stringa += "</h2>";

    return stringa;
}

function capitalize(sentence){
    /*
    Equivalente
    if (sentence) {
        return sentence[0].toUpperCase() + sentence.slice(1).toLowerCase();
    }
    return sentence;
    */
    return sentence && (sentence[0].toUpperCase() + sentence.slice(1).toLowerCase());
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
        <img class="card-image2 mx-auto" id="pokemon_showcase_image"
             onclick="alternatePokemonShowcaseImage()"
             src="${pokeman.image}"
             meta-front-src="${pokeman.image}"
             meta-back-src="${pokeman.image2}"
        />
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

function alternatePokemonShowcaseImage(){
    const pokemonShowcaseImage = $('#pokemon_showcase_image');
    const src = pokemonShowcaseImage.attr('src');
    const frontSrc = pokemonShowcaseImage.attr('meta-front-src');
    const backSrc = pokemonShowcaseImage.attr('meta-back-src');
    if (src === frontSrc) {
        pokemonShowcaseImage.attr('src', backSrc);
    } else {
        pokemonShowcaseImage.attr('src', frontSrc);
    }
}

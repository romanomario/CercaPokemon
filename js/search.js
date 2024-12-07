$(document).ready(function() {

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

function Ricerca() {
    addClass('pokemon');
    removeClass('pokedex');
    addClass('button');

    const userInput = document.getElementById('search').value.toLowerCase();
    var input = correctInput(userInput);

    if (input == "") {
        displayPokemon([]);
        displayNone('loading');
        displayNone('error');
        console.log("Non è stata inserita nessuna stringa");
    } else {
        displayNone('error');
        fetchPokemon(input).then((pokemonList) => {
            if (pokemonList == false) {
                displayError(userInput);
                displayBlock('error');
            }
            displayPokemon(pokemonList, input);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            displayNone('loading');
        });
    }
}

function correctInput(userInput) {
    var input = [];

    userInput.trim(); //elimina spazi iniziali e finali

    userInput = userInput.split(' ');

    userInput.forEach(element => {
        if (element.trim()) {
            input.push(element.trim());
        }
    });

    input = [...new Set(input)];

    return input;
}

function caricamento() {
    displayBlock('loading');
}

function displayNone(id) {
    document.getElementById(id).style.display = 'none';
}

function displayBlock(id) {
    document.getElementById(id).style.display = 'block';
}

function displayError(msg) {
    console.log("Non è stato trovato nessun pokemon: " + msg);
    document.getElementById('error').innerHTML = '<li class="cardo2"><p class="card-subtitle"> Non è stato trovato nessun pokemon ' + msg + '</p></li>';
}

function mySorter(a, b) {
    var vA = a.punteggio;
    var vB = b.punteggio;
    if (vA > vB) return -1;
    if (vA < vB) return 1;
    return 0;
}

function removeClass(id) {
    const s = "#" + id;
    $(s).removeClass('d-none');
}

function addClass(id) {
    const s = "#" + id;
    $(s).addClass('d-none');
}

function scheda(val) {
    removeClass('button');
    addClass('pokedex');
    removeClass('pokemon');
    fetchPokemonComplete(val).then((pokemon) => {
        displayPokemonComplete(pokemon);
    });
}

function clickSearchBar() {
    document.getElementById('search').focus();
}

function comeback() {
    console.log("Stiamo tornando indietro");
    removeClass('pokedex');
    addClass('pokemon');
    displayNone("button");
    document.getElementById('search').focus();
}
// Precondition: inputs cannot contain "".
function occNome(nome, input) {

    const x = [];

    for (let p = 0; p < input.length; p++) {
        for (let i = 0; i < nome.length; i++) {
            let j = 0;
            const word = input[p];
            if (nome[i] === word[j]) {
                if (word.length === 1) {
                    if (!x.includes(i)) {
                        x.push(i);
                    }
                } else {
                    j++;
                    i++;
                    let z = 1;
                    while (z < word.length && nome[i++] === word[z]) {
                        j++;
                        z++;
                    }
                    i -= z;
                    if (z === word.length) {
                        for (z = 0; z < word.length; z++) {
                            if (!x.includes(i)) {
                                x.push(i);
                            }
                            i++;
                        }
                    } else {}
                }
            }
        }
    }

    x.sort((a, b) => a - b);

    nome = capitalize(nome);

    let stringa = "<h2>";
    let i = 0,
        j = 0;
    let inBox = false;
    while (i < nome.length) {
        if (!inBox && i === x[j]) {
            inBox = true;
            stringa += '<span id="ev">';
        }
        stringa += nome[i++];
        if (inBox) {
            j++;
        }
        if (inBox && (i >= nome.length || i !== x[j])) {
            inBox = false;
            stringa += "</span>";
        }
    }
    stringa += "</h2>";

    return stringa;
}

function capitalize(sentence) {
    return sentence && (sentence[0].toUpperCase() + sentence.slice(1).toLowerCase());
}

function displayPokemon(pokemon, input) {
    pokemon.sort(mySorter);

    const pokemonHTMLString = pokemon
        .map((pokeman) => `
        <li class="card" onclick="scheda(this.id)" id="${pokeman.id}" >
            <img class="card-image mx-auto d-block" src="${pokeman.image} "/>
            <h2 class="card-title">${pokeman.id}. ${occNome(pokeman.name,input)}</h2>
        </li>
        `)
        .join('');

    document.getElementById('pokedex').innerHTML = pokemonHTMLString;
}

function displayPokemonComplete(pokeman) {

    displayBlock("button");
    const pokemonHTMLString = `
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
            <div class="row my-4">
            <div class="col">
                <p style="text-align: left;">Tipo:</p>
            </div>
            <div class="col-9">
                    <p class="card-subtitle" style="text-align: right; margin-top:-5px; margin-right:-3px;">${pokemonType(pokeman.type)}</p>
                </div>
            </div>
            <div class="row justify-content-between my-4">
                <div class="col-8">
                    <p style="text-align: left;">Altezza:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle text-right" style="text-align: right;">${pokeman.height} cm</p>
                </div>
            </div>
            <div class="row justify-content-between my-4">
                <div class="col-8">
                    <p style="text-align: left;">Peso:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle text-right" style="text-align: right;">${(pokeman.weight)/10} kg</p>
                </div>
            </div>
        </div>
    </li>
    <li class="cardo2">
    <div class="row justify-content-between my-4">
                <div class="col-8">
                    <p style="text-align: left;">Attacco:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle" style="text-align: right;">${pokeman.attack}</p>
                </div>
            </div>
            <div class="row justify-content-between my-4">
            <div class="col-8">
                <p style="text-align: left;" >Attacco Speciale:</p>
            </div>
            <div class="col">
                <p class="card-subtitle" style="text-align: right;">${pokeman.special_attack}</p>
            </div>
        </div>
        <div class="row justify-content-between my-4">
                <div class="col-8">
                    <p style="text-align: left;" >Difesa:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle " style="text-align: right;">${pokeman.defense}</p>
                </div>
            </div>
            <div class="row justify-content-between my-4">
                <div class="col-8">
                    <p style="text-align: left;" >Difesa Speciale:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle" style="text-align: right;">${pokeman.special_defense}</p>
                </div>
            </div>
            <div class="row justify-content-between my-4">
                <div class="col-8">
                    <p style="text-align: left;" >Velocità:</p>
                </div>
                <div class="col">
                    <p class="card-subtitle" style="text-align: right;">${pokeman.speed} </p>
                </div>
            </div>

    </li>`;

    document.getElementById('pokemon').innerHTML = pokemonHTMLString;
}

function pokemonType(types) {
    var a = [],
        s = [];
    a = types.split(' ');

    a.forEach(element => {
        s = s + '<span class="pokeType poke-info ' + element + '">' + element + '</span> ';
    });

    return s;
}

function alternatePokemonShowcaseImage() {
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
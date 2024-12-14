document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    
    if (button) {
        // Ascolta l'evento di click sul pulsante
        button.addEventListener('click', function(event) {
            // Impedisci il comportamento predefinito del submit (ricaricamento pagina)
            event.preventDefault();
            
            // Ottieni i nomi dai campi di input
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;
            
            // Controlla che i nomi non siano vuoti
            if (player1Name && player2Name) {
                // Salva i nomi in localStorage
                localStorage.setItem('player1', player1Name);
                localStorage.setItem('player2', player2Name);
                
                // Mostra i nomi nella console
                console.log("Giocatori salvati!");
                console.log("Giocatore 1: " + player1Name);
                console.log("Giocatore 2: " + player2Name);
                
                // Puoi aggiungere qui altre azioni per avviare la battaglia o navigare a un'altra pagina
            } else {
                // Messaggio di errore se i nomi non sono stati inseriti
                console.log("Per favore inserisci i nomi di entrambi i giocatori.");
            }
        });
    } else {
        console.log("Elemento non trovato!");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');
    const pokemonSelection = document.getElementById('pokemonSelection');
    const startBattleButton = document.getElementById('startBattle');

    if (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;

            if (player1Name && player2Name) {
                localStorage.setItem('player1', player1Name);
                localStorage.setItem('player2', player2Name);

                // Mostra la sezione di selezione Pokémon
                pokemonSelection.classList.remove('d-none');
                generatePokemonSelectors('player1Pokemons', 5, "Giocatore 1");
                generatePokemonSelectors('player2Pokemons', 5, "Giocatore 2");
            } else {
                console.log("Per favore inserisci i nomi di entrambi i giocatori.");
            }
        });
    }

    // Crea i selettori per i Pokémon
    function generatePokemonSelectors(containerId, slots, playerName) {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Pulisce l'area
        for (let i = 1; i <= slots; i++) {
            const div = document.createElement('div');
            div.classList.add('mb-2');
            div.innerHTML = `
                <label for="${containerId}-pokemon${i}">Slot ${i} (${playerName})</label>
                <input type="text" id="${containerId}-pokemon${i}" class="form-control" placeholder="Inserisci il nome del Pokémon">
            `;
            container.appendChild(div);
        }
        startBattleButton.classList.remove('d-none');
    }

    // Gestione della battaglia
    startBattleButton.addEventListener('click', function () {
        const player1Pokemons = getPokemonsFromInput('player1Pokemons', 5);
        const player2Pokemons = getPokemonsFromInput('player2Pokemons', 5);

        if (player1Pokemons.length === 5 && player2Pokemons.length === 5) {
            console.log("Inizia la battaglia!");
            simulateBattle(player1Pokemons, player2Pokemons);
        } else {
            console.log("Ogni giocatore deve selezionare 5 Pokémon.");
        }
    });

    function getPokemonsFromInput(containerId, slots) {
        const pokemons = [];
        for (let i = 1; i <= slots; i++) {
            const input = document.getElementById(`${containerId}-pokemon${i}`);
            if (input && input.value) {
                pokemons.push(input.value);
            }
        }
        return pokemons;
    }

    function simulateBattle(player1Pokemons, player2Pokemons) {
        console.log("Giocatore 1:", player1Pokemons);
        console.log("Giocatore 2:", player2Pokemons);

        let player1Score = 0;
        let player2Score = 0;

        for (let i = 0; i < 5; i++) {
            const winner = Math.random() > 0.5 ? 1 : 2; // Semplice casualità
            console.log(`Battaglia ${i + 1}: ${player1Pokemons[i]} VS ${player2Pokemons[i]} - Vincitore: Giocatore ${winner}`);
            if (winner === 1) player1Score++;
            else player2Score++;
        }

        if (player1Score > player2Score) {
            console.log(`Giocatore 1 vince con punteggio ${player1Score} a ${player2Score}!`);
        } else if (player2Score > player1Score) {
            console.log(`Giocatore 2 vince con punteggio ${player2Score} a ${player1Score}!`);
        } else {
            console.log("La battaglia termina in parità!");
        }
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');
    const pokemonSelection = document.getElementById('pokemonSelection');
    const startBattleButton = document.getElementById('startBattle');

    if (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;

            if (player1Name && player2Name) {
                // Salva i nomi nel localStorage
                localStorage.setItem('player1', player1Name);
                localStorage.setItem('player2', player2Name);

                // Mostra la sezione di selezione Pokémon
                pokemonSelection.classList.remove('d-none');
                
                // Aggiorna i titoli con i nomi dei giocatori
                updatePlayerTitles(player1Name, player2Name);

                // Genera i selettori per i Pokémon
                generatePokemonSelectors('player1Pokemons', 5, player1Name);
                generatePokemonSelectors('player2Pokemons', 5, player2Name);
            } else {
                console.log("Per favore inserisci i nomi di entrambi i giocatori.");
            }
        });
    }

    // Aggiorna i titoli con i nomi dei giocatori
    function updatePlayerTitles(player1Name, player2Name) {
        const player1Title = document.querySelector("div#player1Pokemons ~ h4");
        const player2Title = document.querySelector("div#player2Pokemons ~ h4");
        if (player1Title) player1Title.textContent = player1Name;
        if (player2Title) player2Title.textContent = player2Name;
    }

    function generatePokemonSelectors(containerId, slots, playerName) {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Pulisce l'area
        for (let i = 1; i <= slots; i++) {
            const div = document.createElement('div');
            div.classList.add('mb-2');
            div.innerHTML = `
                <label for="${containerId}-pokemon${i}">Slot ${i} (${playerName})</label>
                <input type="text" id="${containerId}-pokemon${i}" class="form-control" placeholder="Inserisci il nome del Pokémon">
            `;
            container.appendChild(div);
        }
        startBattleButton.classList.remove('d-none');
    }

    startBattleButton.addEventListener('click', function () {
        const player1Pokemons = getPokemonsFromInput('player1Pokemons', 5);
        const player2Pokemons = getPokemonsFromInput('player2Pokemons', 5);

        if (player1Pokemons.length === 5 && player2Pokemons.length === 5) {
            console.log("Inizia la battaglia!");
            simulateBattle(player1Pokemons, player2Pokemons);
        } else {
            console.log("Ogni giocatore deve selezionare 5 Pokémon.");
        }
    });

    function getPokemonsFromInput(containerId, slots) {
        const pokemons = [];
        for (let i = 1; i <= slots; i++) {
            const input = document.getElementById(`${containerId}-pokemon${i}`);
            if (input && input.value) {
                pokemons.push(input.value);
            }
        }
        return pokemons;
    }

    function simulateBattle(player1Pokemons, player2Pokemons) {
        const player1Name = localStorage.getItem('player1');
        const player2Name = localStorage.getItem('player2');

        console.log(`${player1Name}:`, player1Pokemons);
        console.log(`${player2Name}:`, player2Pokemons);

        let player1Score = 0;
        let player2Score = 0;

        for (let i = 0; i < 5; i++) {
            const winner = Math.random() > 0.5 ? 1 : 2;
            console.log(`Battaglia ${i + 1}: ${player1Pokemons[i]} VS ${player2Pokemons[i]} - Vincitore: ${winner === 1 ? player1Name : player2Name}`);
            if (winner === 1) player1Score++;
            else player2Score++;
        }

        if (player1Score > player2Score) {
            console.log(`${player1Name} vince con punteggio ${player1Score} a ${player2Score}!`);
        } else if (player2Score > player1Score) {
            console.log(`${player2Name} vince con punteggio ${player2Score} a ${player1Score}!`);
        } else {
            console.log("La battaglia termina in parità!");
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');
    const pokemonSelection = document.getElementById('pokemonSelection');
    const startBattleButton = document.getElementById('startBattle');

    if (button) {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;

            if (player1Name && player2Name) {
                // Salva i nomi nel localStorage
                localStorage.setItem('player1', player1Name);
                localStorage.setItem('player2', player2Name);

                // Mostra la sezione di selezione Pokémon
                pokemonSelection.classList.remove('d-none');

                // Aggiorna i titoli con i nomi dei giocatori
                updatePlayerTitles(player1Name, player2Name);

                // Recupera i Pokémon dall'API
                const pokemonList = await fetchPokemonList();

                // Genera i selettori per i Pokémon
                generatePokemonSelectors('player1Pokemons', 5, player1Name, pokemonList);
                generatePokemonSelectors('player2Pokemons', 5, player2Name, pokemonList);
            } else {
                console.log("Per favore inserisci i nomi di entrambi i giocatori.");
            }
        });
    }

    async function fetchPokemonList() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        return data.results.map(pokemon => pokemon.name); // Restituisce un array con i nomi dei Pokémon
    }

    function updatePlayerTitles(player1Name, player2Name) {
        const player1Title = document.querySelector("div#player1Pokemons ~ h4");
        const player2Title = document.querySelector("div#player2Pokemons ~ h4");
        if (player1Title) player1Title.textContent = player1Name;
        if (player2Title) player2Title.textContent = player2Name;
    }

    function generatePokemonSelectors(containerId, slots, playerName, pokemonList) {
        const container = document.getElementById(containerId);
        container.innerHTML = ""; // Pulisce l'area
        for (let i = 1; i <= slots; i++) {
            const div = document.createElement('div');
            div.classList.add('mb-2');
            div.innerHTML = `
                <label for="${containerId}-pokemon${i}">Slot ${i} (${playerName})</label>
                <select id="${containerId}-pokemon${i}" class="form-control">
                    <option value="" disabled selected>Seleziona un Pokémon</option>
                    ${pokemonList.map(pokemon => `<option value="${pokemon}">${pokemon}</option>`).join('')}
                </select>
            `;
            container.appendChild(div);
        }
        startBattleButton.classList.remove('d-none');
    }

    startBattleButton.addEventListener('click', function () {
        const player1Pokemons = getPokemonsFromInput('player1Pokemons', 5);
        const player2Pokemons = getPokemonsFromInput('player2Pokemons', 5);

        if (player1Pokemons.length === 5 && player2Pokemons.length === 5) {
            console.log("Inizia la battaglia!");
            simulateBattle(player1Pokemons, player2Pokemons);
        } else {
            console.log("Ogni giocatore deve selezionare 5 Pokémon.");
        }
    });

    function getPokemonsFromInput(containerId, slots) {
        const pokemons = [];
        for (let i = 1; i <= slots; i++) {
            const input = document.getElementById(`${containerId}-pokemon${i}`);
            if (input && input.value) {
                pokemons.push(input.value);
            }
        }
        return pokemons;
    }

    function simulateBattle(player1Pokemons, player2Pokemons) {
        const player1Name = localStorage.getItem('player1');
        const player2Name = localStorage.getItem('player2');

        console.log(`${player1Name}:`, player1Pokemons);
        console.log(`${player2Name}:`, player2Pokemons);

        let player1Score = 0;
        let player2Score = 0;

        for (let i = 0; i < 5; i++) {
            const winner = Math.random() > 0.5 ? 1 : 2;
            console.log(`Battaglia ${i + 1}: ${player1Pokemons[i]} VS ${player2Pokemons[i]} - Vincitore: ${winner === 1 ? player1Name : player2Name}`);
            if (winner === 1) player1Score++;
            else player2Score++;
        }

        if (player1Score > player2Score) {
            console.log(`${player1Name} vince con punteggio ${player1Score} a ${player2Score}!`);
        } else if (player2Score > player1Score) {
            console.log(`${player2Name} vince con punteggio ${player2Score} a ${player1Score}!`);
        } else {
            console.log("La battaglia termina in parità!");
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('myButton');
    const pokemonSelection = document.getElementById('pokemonSelection');
    const startBattleButton = document.getElementById('startBattle');

    if (button) {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const player1Name = document.getElementById('player1').value;
            const player2Name = document.getElementById('player2').value;

            if (player1Name && player2Name) {
                localStorage.setItem('player1', player1Name);
                localStorage.setItem('player2', player2Name);
                pokemonSelection.classList.remove('d-none');
                updatePlayerTitles(player1Name, player2Name);

                const pokemonList = await fetchPokemonList();
                generatePokemonSelectors('player1Pokemons', 5, player1Name, pokemonList);
                generatePokemonSelectors('player2Pokemons', 5, player2Name, pokemonList);
            } else {
                console.log("Per favore inserisci i nomi di entrambi i giocatori.");
            }
        });
    }

    async function fetchPokemonList() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        return data.results.map(pokemon => pokemon.name);
    }

    function updatePlayerTitles(player1Name, player2Name) {
        const player1Title = document.querySelector("div#player1Pokemons ~ h4");
        const player2Title = document.querySelector("div#player2Pokemons ~ h4");
        if (player1Title) player1Title.textContent = player1Name;
        if (player2Title) player2Title.textContent = player2Name;
    }

    function generatePokemonSelectors(containerId, slots, playerName, pokemonList) {
        const container = document.getElementById(containerId);
        container.innerHTML = "";
        for (let i = 1; i <= slots; i++) {
            const div = document.createElement('div');
            div.classList.add('mb-2');
            div.innerHTML = `
                <label for="${containerId}-pokemon${i}">Slot ${i} (${playerName})</label>
                <select id="${containerId}-pokemon${i}" class="form-control">
                    <option value="" disabled selected>Seleziona un Pokémon</option>
                    ${pokemonList.map(pokemon => `<option value="${pokemon}">${pokemon}</option>`).join('')}
                </select>
            `;
            container.appendChild(div);
        }
        startBattleButton.classList.remove('d-none');
    }

    startBattleButton.addEventListener('click', async function () {
        const player1Pokemons = getPokemonsFromInput('player1Pokemons', 5);
        const player2Pokemons = getPokemonsFromInput('player2Pokemons', 5);

        if (player1Pokemons.length === 5 && player2Pokemons.length === 5) {
            console.log("Inizia la battaglia!");

            // Recupera statistiche per tutti i Pokémon selezionati
            const player1Details = await fetchPokemonDetails(player1Pokemons);
            const player2Details = await fetchPokemonDetails(player2Pokemons);

            console.log("Giocatore 1 Pokémon dettagli:", player1Details);
            console.log("Giocatore 2 Pokémon dettagli:", player2Details);

            // Simula la battaglia
            simulateBattle(player1Details, player2Details);
        } else {
            console.log("Ogni giocatore deve selezionare 5 Pokémon.");
        }
    });

    function getPokemonsFromInput(containerId, slots) {
        const pokemons = [];
        for (let i = 1; i <= slots; i++) {
            const input = document.getElementById(`${containerId}-pokemon${i}`);
            if (input && input.value) {
                pokemons.push(input.value);
            }
        }
        return pokemons;
    }

    async function fetchPokemonDetails(pokemonNames) {
        const details = await Promise.all(
            pokemonNames.map(async name => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                return {
                    name: data.name,
                    stats: {
                        hp: data.stats[0].base_stat,
                        attack: data.stats[1].base_stat,
                        defense: data.stats[2].base_stat,
                        speed: data.stats[5].base_stat
                    },
                    image: data.sprites.front_default
                };
            })
        );
        return details;
    }

    function simulateBattle(player1Details, player2Details) {
        const player1Name = localStorage.getItem('player1');
        const player2Name = localStorage.getItem('player2');

        console.log(`${player1Name}:`, player1Details);
        console.log(`${player2Name}:`, player2Details);

        let player1Score = 0;
        let player2Score = 0;

        for (let i = 0; i < 5; i++) {
            const player1Pokemon = player1Details[i];
            const player2Pokemon = player2Details[i];

            const player1Power = calculatePower(player1Pokemon);
            const player2Power = calculatePower(player2Pokemon);

            console.log(`Battaglia ${i + 1}: ${player1Pokemon.name} (${player1Power}) VS ${player2Pokemon.name} (${player2Power})`);

            if (player1Power > player2Power) {
                console.log(`${player1Pokemon.name} vince!`);
                player1Score++;
            } else if (player2Power > player1Power) {
                console.log(`${player2Pokemon.name} vince!`);
                player2Score++;
            } else {
                console.log("Pareggio!");
            }
        }

        if (player1Score > player2Score) {
            console.log(`${player1Name} vince con punteggio ${player1Score} a ${player2Score}!`);
        } else if (player2Score > player1Score) {
            console.log(`${player2Name} vince con punteggio ${player2Score} a ${player1Score}!`);
        } else {
            console.log("La battaglia termina in parità!");
        }
    }

    function calculatePower(pokemon) {
        return pokemon.stats.hp + pokemon.stats.attack + pokemon.stats.defense + pokemon.stats.speed;
    }
});

function generatePokemonSelectors(containerId, slots, playerName, pokemonList) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let i = 1; i <= slots; i++) {
        const div = document.createElement('div');
        div.classList.add('mb-2');
        div.innerHTML = `
            <label for="${containerId}-pokemon${i}">Slot ${i} (${playerName})</label>
            <select id="${containerId}-pokemon${i}" class="form-control">
                <option value="" disabled selected>Seleziona un Pokémon</option>
                ${pokemonList.map(pokemon => `<option value="${pokemon}">${pokemon}</option>`).join('')}
            </select>
            <img id="${containerId}-pokemon${i}-image" src="" alt="" class="pokemon-preview" style="display:none; width: 100px; margin-top: 10px;">
        `;
        container.appendChild(div);

        // Aggiungi un listener per aggiornare l'immagine quando il Pokémon viene selezionato
        const selectElement = div.querySelector(`#${containerId}-pokemon${i}`);
        const imageElement = div.querySelector(`#${containerId}-pokemon${i}-image`);

        selectElement.addEventListener('change', async function () {
            const pokemonName = selectElement.value;
            if (pokemonName) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
                const data = await response.json();
                imageElement.src = data.sprites.front_default;
                imageElement.style.display = "block";
                imageElement.alt = pokemonName;
            }
        });
    }
}

function simulateBattle(player1Details, player2Details) {
    const battleLog = document.getElementById('battleLog');
    battleLog.innerHTML = "";

    const player1Name = localStorage.getItem('player1');
    const player2Name = localStorage.getItem('player2');

    for (let i = 0; i < 5; i++) {
        const player1Pokemon = player1Details[i];
        const player2Pokemon = player2Details[i];

        const player1Power = calculatePower(player1Pokemon);
        const player2Power = calculatePower(player2Pokemon);

        const roundDiv = document.createElement('div');
        roundDiv.classList.add('battle-round');
        roundDiv.innerHTML = `
            <div class="row">
                <div class="col text-center">
                    <img src="${player1Pokemon.image}" alt="${player1Pokemon.name}" style="width: 100px;">
                    <p>${player1Pokemon.name}</p>
                    <p>Potenza: ${player1Power}</p>
                </div>
                <div class="col text-center">
                    <img src="${player2Pokemon.image}" alt="${player2Pokemon.name}" style="width: 100px;">
                    <p>${player2Pokemon.name}</p>
                    <p>Potenza: ${player2Power}</p>
                </div>
            </div>
            <hr>
        `;
        battleLog.appendChild(roundDiv);
    }
}

function showBattleResults(player1Details, player2Details, player1Score, player2Score) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <h3>Risultati della Battaglia</h3>
        <div class="row">
            <div class="col">
                <h4>Giocatore 1</h4>
                ${player1Details.map(pokemon => `
                    <div>
                        <img src="${pokemon.image}" alt="${pokemon.name}" style="width: 100px;">
                        <p>${pokemon.name}</p>
                        <p>HP: ${pokemon.stats.hp}, Attacco: ${pokemon.stats.attack}, Difesa: ${pokemon.stats.defense}, Velocità: ${pokemon.stats.speed}</p>
                    </div>
                `).join('')}
            </div>
            <div class="col">
                <h4>Giocatore 2</h4>
                ${player2Details.map(pokemon => `
                    <div>
                        <img src="${pokemon.image}" alt="${pokemon.name}" style="width: 100px;">
                        <p>${pokemon.name}</p>
                        <p>HP: ${pokemon.stats.hp}, Attacco: ${pokemon.stats.attack}, Difesa: ${pokemon.stats.defense}, Velocità: ${pokemon.stats.speed}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        <h4 class="text-center mt-3">Punteggio: ${player1Score} - ${player2Score}</h4>
    `;
}



document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const pokemonSelectionContainer = document.getElementById("pokemonSelectionContainer");
    const player1NameDisplay = document.getElementById("player1Name");
    const player2NameDisplay = document.getElementById("player2Name");
    const player1Slots = document.getElementById("player1Slots");
    const player2Slots = document.getElementById("player2Slots");
    const pokemonList = document.getElementById("pokemonList");
    const startBattleButton = document.getElementById("startBattle");

    let player1Selected = [];
    let player2Selected = [];
    let currentPlayer = 1; // Indica il giocatore corrente (1 o 2)

    button.addEventListener("click", async function (event) {
        event.preventDefault();

        // Ottieni i nomi dei giocatori
        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;

        if (player1Name && player2Name) {
            pokemonSelectionContainer.classList.remove("d-none");
            player1NameDisplay.textContent = player1Name;
            player2NameDisplay.textContent = player2Name;

            initializeSlots(player1Slots);
            initializeSlots(player2Slots);

            try {
                const pokemonListData = await fetchPokemonList();
                populatePokemonList(pokemonList, pokemonListData);
            } catch (error) {
                console.error("Errore durante il caricamento dei Pokémon:", error);
                alert("Si è verificato un errore durante il caricamento dei Pokémon.");
            }
        } else {
            alert("Inserisci i nomi di entrambi i giocatori.");
        }
    });

    function initializeSlots(container) {
        container.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const slot = document.createElement("div");
            slot.classList.add("pokemon-slot", "m-2", "p-2", "border", "rounded", "text-center");
            slot.textContent = "Vuoto";
            container.appendChild(slot);
        }
    }

    async function fetchPokemonList() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        if (!response.ok) throw new Error("Errore durante il fetch");
        const data = await response.json();
        return data.results;
    }

    async function populatePokemonList(container, pokemonListData) {
        container.innerHTML = "";
        for (const pokemon of pokemonListData) {
            try {
                const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
                const stats = {
                    hp: pokemonDetails.stats.find((stat) => stat.stat.name === "hp").base_stat,
                    attack: pokemonDetails.stats.find((stat) => stat.stat.name === "attack").base_stat,
                    defense: pokemonDetails.stats.find((stat) => stat.stat.name === "defense").base_stat,
                };

                const card = document.createElement("div");
                card.classList.add("pokemon-card", "m-2", "p-2", "border", "rounded", "text-center");
                card.innerHTML = `
                    <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}" class="img-fluid mb-2">
                    <p><strong>${pokemonDetails.name}</strong></p>
                    <p>HP: ${stats.hp} | Attacco: ${stats.attack} | Difesa: ${stats.defense}</p>
                    <button 
                        class="btn btn-primary select-pokemon" 
                        data-name="${pokemonDetails.name}" 
                        data-image="${pokemonDetails.sprites.front_default}" 
                        data-hp="${stats.hp}" 
                        data-attack="${stats.attack}" 
                        data-defense="${stats.defense}">
                        Seleziona
                    </button>
                `;
                container.appendChild(card);
            } catch (error) {
                console.error("Errore durante il caricamento dei dettagli Pokémon:", error);
            }
        }
    }

    pokemonList.addEventListener("click", function (event) {
    if (event.target.classList.contains("select-pokemon")) {
        const pokemonName = event.target.getAttribute("data-name");
        const pokemonImage = event.target.getAttribute("data-image");
        const pokemonHp = event.target.getAttribute("data-hp");
        const pokemonAttack = event.target.getAttribute("data-attack");
        const pokemonDefense = event.target.getAttribute("data-defense");

        if (currentPlayer === 1 && player1Selected.length < 5) {
            addPokemonToSlot(player1Slots, player1Selected, pokemonName, pokemonImage, pokemonHp, pokemonAttack, pokemonDefense);
            if (player1Selected.length === 5) currentPlayer = 2;
        } else if (currentPlayer === 2 && player2Selected.length < 5) {
            addPokemonToSlot(player2Slots, player2Selected, pokemonName, pokemonImage, pokemonHp, pokemonAttack, pokemonDefense);
            if (player2Selected.length === 5) {
                startBattleButton.classList.remove("d-none");

                // Nascondi la lista dei Pokémon selezionabili
                pokemonList.classList.add("d-none"); // Assicurati che la classe d-none sia definita nel CSS

                alert("Entrambi i giocatori hanno selezionato i loro Pokémon!");
            }
        } else {
            alert("Il giocatore corrente ha già scelto 5 Pokémon.");
        }
    }
});


    function addPokemonToSlot(container, selectedList, name, image, hp, attack, defense) {
        const emptySlot = Array.from(container.children).find((slot) => slot.textContent === "Vuoto");
        if (emptySlot) {
            emptySlot.innerHTML = `
                <img src="${image}" alt="${name}" class="img-fluid mb-2">
                <p><strong>${name}</strong></p>
                <p>HP: ${hp} | Attacco: ${attack} | Difesa: ${defense}</p>
            `;
            selectedList.push({ name, image, hp, attack, defense });
        }
    }

    // viene avviata quando si clicca start battle
    document.querySelector("#startBattle").addEventListener("click", function () {
        console.log('Bottone Inizia la Battaglia cliccato!');
        console.log('POkémon primo giocatore');
        console.log(player1Selected); //lista pokemon giocatore 1
        console.log('POkémon secondo giocatore');
        console.log(player2Selected); // lista pokemno giocatore 2
        // todo @mario far iniziare la battaglia tra tutti i pokomon selezionati
        document.querySelector("#startBattle").addEventListener("click", function () {
            if (player1Selected.length > 0 && player2Selected.length > 0) {
                const player1Pokemon = player1Selected[0];
                const player2Pokemon = player2Selected[0];
        
                // Mostra l'area di battaglia
                const battleArea = document.getElementById("battleArea");
                battleArea.classList.remove("d-none");
        
                // Visualizza i Pokémon in battaglia
                const player1Battle = document.getElementById("player1Pokemon");
                const player2Battle = document.getElementById("player2Pokemon");
        
                player1Battle.innerHTML = `
                    <img src="${player1Pokemon.image}" alt="${player1Pokemon.name}" class="img-fluid">
                    <p><strong>${player1Pokemon.name}</strong></p>
                    <p>HP: ${player1Pokemon.hp}</p>
                `;
                player2Battle.innerHTML = `
                    <img src="${player2Pokemon.image}" alt="${player2Pokemon.name}" class="img-fluid">
                    <p><strong>${player2Pokemon.name}</strong></p>
                    <p>HP: ${player2Pokemon.hp}</p>
                `;
        
                // Avvia la battaglia
                startTurnBasedBattle(player1Pokemon, player2Pokemon);
            } else {
                alert("Entrambi i giocatori devono selezionare almeno un Pokémon per iniziare la battaglia.");
            }
        });
        
        function startTurnBasedBattle(pokemon1, pokemon2) {
            let turn = 1;
            let pokemon1Hp = pokemon1.hp;
            let pokemon2Hp = pokemon2.hp;
        
            const battleLog = document.getElementById("battleLog");
        
            function battleTurn() {
                if (pokemon1Hp <= 0 || pokemon2Hp <= 0) {
                    const winner = pokemon1Hp > 0 ? pokemon1.name : pokemon2.name;
                    battleLog.textContent = `La battaglia è terminata! Il vincitore è ${winner}!`;
                    return;
                }
        
                battleLog.textContent = `Turno ${turn}: `;
                if (turn % 2 !== 0) {
                    // Turno del Pokémon 1
                    const damage = Math.max(pokemon1.attack - pokemon2.defense, 1);
                    pokemon2Hp -= damage;
                    battleLog.textContent += `${pokemon1.name} attacca ${pokemon2.name} infliggendo ${damage} danni!`;
                } else {
                    // Turno del Pokémon 2
                    const damage = Math.max(pokemon2.attack - pokemon1.defense, 1);
                    pokemon1Hp -= damage;
                    battleLog.textContent += `${pokemon2.name} attacca ${pokemon1.name} infliggendo ${damage} danni!`;
                }
        
                // Aggiorna gli HP visualizzati
                document.querySelector("#player1Pokemon p:nth-child(3)").textContent = `HP: ${Math.max(pokemon1Hp, 0)}`;
                document.querySelector("#player2Pokemon p:nth-child(3)").textContent = `HP: ${Math.max(pokemon2Hp, 0)}`;
        
                turn++;
                setTimeout(battleTurn, 1000);
            }
        
            battleTurn();
        }
        
    });

});

function startTurnBasedBattle(team1, team2) {
    let currentPokemonIndex1 = 0;
    let currentPokemonIndex2 = 0;
    let turn = 1;

    const battleLog = document.getElementById("battleLog");

    function getCurrentPokemon(team, index) {
        return index < team.length ? team[index] : null;
    }

    function updateHpDisplay(pokemon1, pokemon2) {
        const player1HpElement = document.querySelector("#player1Pokemon p:nth-child(3)");
        const player2HpElement = document.querySelector("#player2Pokemon p:nth-child(3)");
        if (player1HpElement) {
            player1HpElement.textContent = `HP: ${pokemon1 ? Math.max(pokemon1.hp, 0) : 0}`;
        }
        if (player2HpElement) {
            player2HpElement.textContent = `HP: ${pokemon2 ? Math.max(pokemon2.hp, 0) : 0}`;
        }
    }

    function battleTurn() {
        let pokemon1 = getCurrentPokemon(team1, currentPokemonIndex1);
        let pokemon2 = getCurrentPokemon(team2, currentPokemonIndex2);

        // Se uno dei team non ha più Pokémon, la battaglia termina
        if (!pokemon1) {
            battleLog.textContent = "La battaglia è terminata! Il vincitore è Giocatore 2!";
            return;
        }
        if (!pokemon2) {
            battleLog.textContent = "La battaglia è terminata! Il vincitore è Giocatore 1!";
            return;
        }

        // Controlla se uno dei Pokémon è stato sconfitto
        if (pokemon1.hp <= 0) {
            currentPokemonIndex1++;
            battleLog.textContent = `${pokemon1.name} è stato sconfitto!`;
            setTimeout(battleTurn, 2000);
            return;
        }

        if (pokemon2.hp <= 0) {
            currentPokemonIndex2++;
            battleLog.textContent = `${pokemon2.name} è stato sconfitto!`;
            setTimeout(battleTurn, 2000);
            return;
        }

        // Esegue il turno
        battleLog.textContent = `Turno ${turn}: `;
        if (turn % 2 !== 0) {
            // Turno del Pokémon 1
            const damage = Math.max(pokemon1.attack - pokemon2.defense, 1);
            pokemon2.hp -= damage;
            battleLog.textContent += `${pokemon1.name} attacca ${pokemon2.name} infliggendo ${damage} danni!`;
        } else {
            // Turno del Pokémon 2
            const damage = Math.max(pokemon2.attack - pokemon1.defense, 1);
            pokemon1.hp -= damage;
            battleLog.textContent += `${pokemon2.name} attacca ${pokemon1.name} infliggendo ${damage} danni!`;
        }

        // Aggiorna gli HP visualizzati
        updateHpDisplay(pokemon1, pokemon2);

        turn++;
        setTimeout(battleTurn, 1000);
    }

    battleTurn();
}

document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");
    const pokemonSelectionContainer = document.getElementById("pokemonSelectionContainer");
    const player1NameDisplay = document.getElementById("player1Name");
    const player2NameDisplay = document.getElementById("player2Name");
    const player1Slots = document.getElementById("player1Slots");
    const player2Slots = document.getElementById("player2Slots");
    const pokemonListContainer = document.getElementById("pokemonListContainer");
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

        // Verifica che i nomi siano validi
        if (player1Name && player2Name) {
            // Mostra la sezione di selezione
            pokemonSelectionContainer.classList.remove("d-none");
            player1NameDisplay.textContent = player1Name;
            player2NameDisplay.textContent = player2Name;

            // Inizializza gli slot vuoti
            initializeSlots(player1Slots);
            initializeSlots(player2Slots);

            // Popola la lista dei Pokémon
            const pokemonListData = await fetchPokemonList();
            populatePokemonList(pokemonList, pokemonListData);
        } else {
            alert("Inserisci i nomi di entrambi i giocatori.");
        }
    });

    // Funzione per inizializzare gli slot vuoti
    function initializeSlots(container) {
        container.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            const slot = document.createElement("div");
            slot.classList.add("pokemon-slot", "m-2", "p-2", "border", "rounded", "text-center");
            slot.textContent = "Vuoto";
            container.appendChild(slot);
        }
    }

    // Funzione per ottenere una lista di Pokémon dall'API
    async function fetchPokemonList() {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
        const data = await response.json();
        return data.results;
    }

    // Funzione per popolare la lista di Pokémon
    async function populatePokemonList(container, pokemonListData) {
        container.innerHTML = "";

        for (const pokemon of pokemonListData) {
            const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());

            const card = document.createElement("div");
            card.classList.add("pokemon-card", "m-2", "p-2", "border", "rounded", "text-center");
            card.innerHTML = `
                <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}" class="img-fluid mb-2">
                <p><strong>${pokemonDetails.name}</strong></p>
                <button class="btn btn-primary select-pokemon" data-name="${pokemonDetails.name}" data-image="${pokemonDetails.sprites.front_default}">Seleziona</button>
            `;
            container.appendChild(card);
        }
    }

    // Funzione per gestire la selezione dei Pokémon
    pokemonList.addEventListener("click", function (event) {
        if (event.target.classList.contains("select-pokemon")) {
            const pokemonName = event.target.getAttribute("data-name");
            const pokemonImage = event.target.getAttribute("data-image");

            if (currentPlayer === 1 && player1Selected.length < 5) {
                addPokemonToSlot(player1Slots, player1Selected, pokemonName, pokemonImage);
                if (player1Selected.length === 5) currentPlayer = 2; // Passa al giocatore 2
            } else if (currentPlayer === 2 && player2Selected.length < 5) {
                addPokemonToSlot(player2Slots, player2Selected, pokemonName, pokemonImage);
                if (player2Selected.length === 5) {
                    startBattleButton.classList.remove("d-none"); // Mostra il pulsante per la battaglia
                    alert("Entrambi i giocatori hanno selezionato i loro Pokémon!");
                }
            } else {
                alert("Giocatore corrente ha già scelto 5 Pokémon.");
            }
        }
    });

    // Funzione per aggiungere un Pokémon nello slot
    function addPokemonToSlot(container, selectedList, name, image) {
        const emptySlot = Array.from(container.children).find((slot) => slot.textContent === "Vuoto");
        if (emptySlot) {
            emptySlot.innerHTML = `
                <img src="${image}" alt="${name}" class="img-fluid mb-2">
                <p><strong>${name}</strong></p>
            `;
            selectedList.push(name);
        }
    }
});

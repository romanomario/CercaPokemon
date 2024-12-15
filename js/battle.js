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
});

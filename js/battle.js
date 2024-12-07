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

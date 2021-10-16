$(document).ready(function() {
    displayNone('loading');


    $("input").keydown(function(e) {
        displayBlock('loading');
    });

    $('input').on('keyup', function(e) {
        setTimeout(function() {
            fetchPokemon();
        }, 500);
    });

    $("form").on("submit", function(e) {
        e.preventDefault();
        fetchPokemon();
    });
    
});

function displayNone(id){
    document.getElementById(id).style.display = "none";
}
function displayBlock(id){
    document.getElementById(id).style.display = "block";
}



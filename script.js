$(document).ready(function() {
  $("form").on("submit", function(e) {
    e.preventDefault();

    function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR per Chrome/Firefox/Opera/Safari
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest per IE
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        // CORS non supportato
        xhr = null;
      }
      return xhr;
    }
    //Metodo di supporto per analizzare il tag del titolo dalla risposta
    function getTitle(text) {
      return text.match("<title>(.*)?</title>")[1];
    }
    // Realizzare la seguente richiesta CORS
    function makeCorsRequest() {
      // Un server di esempio che supporta la richiesta CORS
      var url =
        "http://html5rocks-cors.s3-website-us-east-1.amazonaws.com/index.html";
      var xhr = createCORSRequest("GET", url);
      if (!xhr) {
        alert("CORS not supported");
        return;
      }
      // Response handlers.
      xhr.onload = function() {
        var text = xhr.responseText;
        var title = getTitle(text);
        alert("Response from CORS request to " + url + ": " + title);
      };
      xhr.onerror = function() {
        alert("Woops, there was an error making the request.");
      };
      xhr.send();
    }

    var userInput = $("#search").val();
    var url = "https://pokeapi.co/api/v2/pokemon/" + userInput;
    console.log(url);
    $.ajax({
      url: url,
      dataType: "json",
      method: "GET",
      success: function(data) {
        var name = data.forms[0].name,
          pokeImgFront = data.sprites.front_default,
          shiny = false,
          frontImg = true,
          def = "<span class='stat'>Difesa: </span>" + data.stats[3].base_stat,
          atk = "<span class='stat'>Attacco: </span>" + data.stats[4].base_stat,
          hp = "<span class='stat'>PV: </span>" + data.stats[5].base_stat,
          id = "#" + data.id,
          types = [];

        for (var i = 0; i < data.types.length; i++) {
          var type = data.types[i].type.name;
          types.push(type);
        }

        function pokemonType(types) {
          $("#types").html("");
          for (var i = 0; i < types.length; i++) {
            $("#types").append(
              "<div class='pokeType poke-info " +
                types[i] +
                "'>" +
                types[i] +
                " </div>"
            );
          }
        }

        $("#defaultBtn").click(function() {
          $("#pokeImage").attr("src", pokeImgFront);
          shiny = false;
          frontImg = true;
        });

        $(".name").html(name);
        $(".idNum").html(id);
        $("#pokeImage").attr("src", pokeImgFront);
        $(".hp").html(hp);
        $(".attack").html(atk);
        $(".defense").html(def);
        pokemonType(types);
      } //SUCCESS
    }); //AJAX
  }); //FORM
});
var callAPI = (function () {

    var loadData = function() {
        const url = "https://api.punkapi.com/v2/beers";

        $.getJSON(url)
            .done(function(data){
                var beers = [];
                var beerSection = $("#beerlist"); 

                for(var beer in data) {
                    var newBeer = new Object();
                    newBeer = data[beer];

                    var beerHtml = '<article class="beer"><img src="' + newBeer.image_url + '" alt="' + newBeer.name + '"><h3>' + newBeer.name + '</h3><p>' + newBeer.tagline + '</p></article>';
                    beers.push(beerHtml)
                }

                beerSection.html(beers);
            }).fail(function(){
                beerSection.html("The list of beers could not be loaded.");
            });
    }

    return {
        loadData: loadData
    }
})();
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

                    var beerHtml = '<dl><dt id="beer'+ newBeer.id + '" class="accordion">' + newBeer.name + '</dt><dd class="beer"><p>' + newBeer.tagline + '. (First brewed date: '+ newBeer.first_brewed +')</p></dd></dl>';
                    beers.push(beerHtml)
                }

                beerSection.html(beers);

            })
            .done(function() {
                // we need to wait until the dom is complete to call this functions
                accordion.openThis();
                accordion.openAll();
                accordion.closeAll();
            })
            .fail(function(){
                beerSection.html("The list of beers could not be loaded.");
            });
    }

    return {
        loadData: loadData
    }
})();

var accordion = (function () {
    
    var openThis = () => { 
        var acc = $('.accordion');
        var beer = $('.beer');

        beer.hide();

        for (i in acc) {
            acc[i].onclick = function() {
                beer.slideUp();
                $(this).next().slideDown();
            }
        }
    }

    var openAll = () => {
        var seeAll = $('.seeAll');      
        var beer = $('.beer');

        seeAll.on('click', function() {
            beer.slideDown();
        })
    }

    var closeAll = () => {
        var hideAll = $('.hideAll');      
        var beer = $('.beer');

        hideAll.on('click', function() {
            beer.slideUp();
        })
    }


    return {
        openThis: openThis,
        openAll: openAll,
        closeAll: closeAll
    }

})();
document.onload = callAPI.loadData();
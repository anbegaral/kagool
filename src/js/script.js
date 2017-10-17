let callAPI = (function () {

    let loadData = function() {
        let url = "https://api.punkapi.com/v2/beers";

        $.getJSON(url)
            .done(function(data){
                let beers = [];
                let beerSection = $(".beerlist"); 

                for(let beer in data) {
                    let newBeer = new Object();
                    newBeer = data[beer];

                    let beerHtml = '<dl><dt id="beer'+ newBeer.id + '" class="accordion">' + newBeer.name + '</dt><dd class="beer"><p>' + newBeer.tagline + '. (First brewed date: '+ newBeer.first_brewed +')</p><p>' + newBeer.description + '</p></dd></dl>';
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

let accordion = (function () {
    
    let openThis = () => { 
        let acc = $('.accordion');
        let beer = $('.beer');

        beer.hide();

        for (let i = 0; i < acc.length; i++) {
            acc[i].onclick = function() {
                beer.slideUp();
                $(this).next().slideDown();
            }
        }
    }

    let openAll = () => {
        let seeAll = $('.seeAll');      
        let beer = $('.beer');

        seeAll.on('click', function() {
            beer.slideDown();
        })
    }

    let closeAll = () => {
        let hideAll = $('.hideAll');      
        let beer = $('.beer');

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
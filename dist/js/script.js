"use strict";var callAPI={loadData:function(){$.getJSON("https://api.punkapi.com/v2/beers").done(function(data){var beers=[],beerSection=$(".beerlist");for(var beer in data){var newBeer=new Object,beerHtml='<dl><dt id="beer'+(newBeer=data[beer]).id+'" class="accordion">'+newBeer.name+'</dt><dd class="beer"><p>'+newBeer.tagline+". (First brewed date: "+newBeer.first_brewed+")</p><p>"+newBeer.description+"</p></dd></dl>";beers.push(beerHtml)}beerSection.html(beers)}).done(function(){accordion.openThis(),accordion.openAll(),accordion.closeAll()}).fail(function(){beerSection.html("The list of beers could not be loaded.")})}},accordion={openThis:function(){var acc=$(".accordion"),beer=$(".beer");beer.hide();for(var i=0;i<acc.length;i++)acc[i].onclick=function(){beer.slideUp(),$(this).next().slideDown()}},openAll:function(){var seeAll=$(".seeAll"),beer=$(".beer");seeAll.on("click",function(){beer.slideDown()})},closeAll:function(){var hideAll=$(".hideAll"),beer=$(".beer");hideAll.on("click",function(){beer.slideUp()})}};document.onload=callAPI.loadData();
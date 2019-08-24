function loadJson(){
    $.getJSON('../data/burgers.json', function(obj) {
        filterBurgers(obj, 20);
    });
}

function filterBurgers(burgers, maxPrice){
    var filteredBurgers = burgers.slice();
    filteredBurgers = filteredBurgers.filter((burger) => (Number(burger.Price.substring(1)) <= maxPrice));
    filteredBurgers.forEach((element) => {
        console.log(element.Price);
    });
}
//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker?
var currentLocation;
var upperBurgerPrice;

//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap() {

    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(-41.289955235463474, 174.77653881396486);

    //Map options.
    var options = {
        center: centerOfMap, //Set center.
        zoom: 13 //The zoom value.
    };

    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options);

    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        markerLocation();
    });
}

//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    currentLocation = marker.getPosition();
    //Add lat and lng values to a field that we can save.
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude

}

function storeBurgerPrice() {
    upperBurgerPrice = document.getElementById('priceLimit').value;
}


//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);

function submitInput() {
    var x = document.getElementById("showBurgers");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    storeBurgerPrice();

    console.log(currentLocation.lat()); //latitude
    console.log(upperBurgerPrice); //latitude


    //document.getElementById('showBurgers').style.display = "block";
    
}

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
//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker?
var currentLocation;
var lowerBurgerPrice;
var upperBurgerPrice;
//var APIKey = "AIzaSyAXfBF4xyoh1TM3QxULSMM23xSAd2m4LXA";
var burgers;//all burgers

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
    console.log("MAP LOADING");
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
    lowerBurgerPrice = document.getElementById('priceMin').value;
    upperBurgerPrice = document.getElementById('priceMax').value;
}

//Load the map when the page has finished loading.
//google.maps.event.addDomListener(window, 'load', initMap);

function submitInput() {
    var x = document.getElementById("showBurgers");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    storeBurgerPrice();
    console.log(currentLocation.lat() + " " + currentLocation.lng())

    //document.getElementById('showBurgers').style.display = "block";
    let filteredBurgers = filterBurgers(burgers, lowerBurgerPrice, upperBurgerPrice);
    console.log(filteredBurgers);

    let sortedBurgers = sortBurgersByDistance(filteredBurgers, -41.2907081, 174.7737182, 0.1, 10);
    console.log(sortedBurgers);
}

function loadJson(){
    $.getJSON('../data/burgers.json', function(obj) {
        burgers = obj;
    });

}

function filterBurgers(burgers, minPrice, maxPrice){
    var filteredBurgers = burgers.slice();
    filteredBurgers = filteredBurgers.filter((burger) => (Number(burger.Price.substring(1)) <= maxPrice && 
        Number(burger.Price.substring(1)) >= minPrice));
    filteredBurgers.forEach((element) => {
    });

    return filteredBurgers;
}

function sortBurgersByDistance(burgers, latitude, longitude, range, maxNum){
    var sortedBurgers = burgers.slice();
    sortedBurgers = sortedBurgers.filter((burger) => (
        getDistanceFromLatLonInKm(latitude, longitude,  burger.lat, burger.lon) <= range
    ));
    return sortedBurgers.slice(0, Math.min(maxNum, sortedBurgers.length));
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI/180)
}

window.onload = function () { initMap() };

//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker?
var currentLocation;
var lowerBurgerPrice;
var upperBurgerPrice;
var APIKey = "AIzaSyAXfBF4xyoh1TM3QxULSMM23xSAd2m4LXA";
var burgers;//all burgers
images = [
  'https://goodcms.s3.amazonaws.com/woap/event/woap-burger-19-190305-121648.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/IMG_2295-190306-133016.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/Lulu_woap_2019-190325-072304.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/Arcimboldi---Burger-190520-121341.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/Burger-Wellington---Astoria-190321-083207.jpeg',
  'https://goodcms.s3.amazonaws.com/woap/event/53671917_1349376458537388_8529644263460306944_n-190306-203805.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/B98221DA-3291-466C-B292-DB8B1D6981D4-190306-110030-190522-133004.jpeg',
  'https://goodcms.s3.amazonaws.com/woap/event/woap-burger-190321-135032.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/Burger-Welly-2019-Bin44-Bin44-Restaurant-Bar-190524-135849.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/Charley-Noble----Burger-190520-134640.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/DSC_0039-190820-135521.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/burger-woap-19-190306-132232.jpeg',
  'https://goodcms.s3.amazonaws.com/woap/event/Hashigo-Zake--Burger-190520-143124.png',
  'https://goodcms.s3.amazonaws.com/woap/event/Royale-Fromage---Image-190708-145617.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/Meow---Burger-190520-143919.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/NikauBurgerWOAP2019-190228-175216.jpg',
  'https://goodcms.s3.amazonaws.com/woap/event/20190614133105_IMG_2190-190618-065208.jpg'
];

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
    lowerBurgerPrice = document.getElementById('priceMin').value;
    upperBurgerPrice = document.getElementById('priceMax').value;
}

//Load the map when the page has finished loading.
//google.maps.event.addDomListener(window, 'load', initMap);

function submitInput() {

    // var x = document.getElementById("showBurgers");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }

    storeBurgerPrice();

    let filteredBurgers = filterBurgers(burgers, lowerBurgerPrice, upperBurgerPrice);
    // document.getElementById('showBurgers').style.display = "block";

    let str = '<div class="burger-container">';
    let i = 0;
    filteredBurgers.slice(0,10).forEach(function (burger) {
        str += '<div class="burger-item">';
            str += '<div class="column left">';
                str += '<div class="restaurant-details">';
                    str += '<h3 class="restaurant-name">'+ burger.Restaurant +'</h3>';
                    str += '<h5 class="burger-details">Phone number: ' + burger.Phone + '</h5>';
                    str += '<h5 class="burger-details">' + burger.Wheelchair + '</h5>';
                    str += '<a class="burger-details" href="' + burger.Website +'"> Website link to WOAP</a>';
                str += '</div>';

                str += '<div class="restaurant-details">';
                    str += '<h3 class="burger-name">' + burger.Burger + '</h3>';
                    str += '<h5 class="burger-details">Protein Used: ' + burger["Burger Protien"] + '</h5>';
                    str += '<h5 class="burger-details">Dietary Requirements: ' + burger["Dietary Requirements"] + '</h5>';
                    str += '<h5 class="burger-details">Dietary Requirements: ' + burger.Fries + '</h5>';
                    str += '<h5 class="burger-details">' + burger.Description + '</h5>';
                    str += '<h3 class="burger-price">Price: ' + burger.Price + '</h3>';
                    str += '<h3 class="burger-price">With beer: ' + burger["with Beer"] + '</h3>';
                str += '</div>';
            str += '</div>';

            str += '<div class="column">';
                str += '<img alt="burger image" src="' + images[i] + '"/>';
            str += '</div>';
        str += '</div>';
        i++;
    });
    str += '</div>';
    document.getElementById("results-div").innerHTML = str;
    document.getElementById("results-div").style.display = "block";
}

// getVenueLocation(element.resturant);

function getVenueLocation(venue) {
    var dataObject;
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var Http = new XMLHttpRequest();
    const url=`https://maps.googleapis.com/maps/api/geocode/json?address=Apache+Wellington+NZ,+CA&key=${APIKey}`;
    Http.open("GET", url);
    Http.send();

    Http.onload = function() {
        dataObject =  JSON.parse(Http.responseText);
        // console.log(dataObject.results[0].geometry.location.lat);
    };
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

var APIKey = "AIzaSyAXfBF4xyoh1TM3QxULSMM23xSAd2m4LXA";
var dataObject;
var burgers;


var fs = require('fs');
burgers = JSON.parse(fs.readFileSync('../data/burgers.json', 'utf8'));

burgers.forEach((element) => {
    getVenueLocation(element.Restaurant);
});

function getVenueLocation(venue){
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var Http = new XMLHttpRequest();
    const url=`https://maps.googleapis.com/maps/api/geocode/json?address=${venue}+Wellington+NZ,+CA&key=${APIKey}`;
    Http.open("GET", url);
    Http.send();


    Http.onload = function() {
        dataObject =  JSON.parse(Http.responseText);
        console.log(venue + ", " + dataObject.results[0].geometry.location.lat + ", " + dataObject.results[0].geometry.location.lng);
    };
}



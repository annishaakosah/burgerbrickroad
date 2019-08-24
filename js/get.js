var APIKey = "AIzaSyAXfBF4xyoh1TM3QxULSMM23xSAd2m4LXA";
var dataObject;

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var Http = new XMLHttpRequest();
const url=`https://maps.googleapis.com/maps/api/geocode/json?address=Apache+Wellington+NZ,+CA&key=${APIKey}`;
Http.open("GET", url);
Http.send();


Http.onload = function() {
    dataObject =  JSON.parse(Http.responseText);
    console.log(dataObject.results[0].geometry.location.lat);
};


var APIKey = "AIzaSyAXfBF4xyoh1TM3QxULSMM23xSAd2m4LXA";


var geocoder = new google.maps.Geocoder();

var address = "Apache";
geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
        });
    } else {
        alert('Geocode was not successful for the following reason: ' + status);
    }
});
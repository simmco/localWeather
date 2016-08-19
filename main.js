(function() {

  var lat = '';
  var lon = '';
  var tempSign = " °C";
  var temperature = '';
  var location = '';
  var icon = '';
  var countryCode = '';



  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.latitude;
      lat = position.coords.longitude;
    });

  }

/* var positionAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=true";
$.getJSON(positionAPI, function (data) {

  location = data.results[3].formatted_address;

}); */





  var weatherAPI = " https://api.forecast.io/forecast/a318a4996d504d004f217c64c53ae60f/" + lat + "," + lon;


    $.getJSON(weatherAPI, {
        units = si;




    }) .done function(data) {

      //location = data.name;
      temperature = Math.round(data.currently.temperature);
      icon = data.currently.icon;
      document.getElementById('location').innerHTML = location;
      document.getElementById('temperature').innerHTML = temperature + tempSign;
      document.getElementById('icon').innerHTML = " <img src='" + icon + "'>";



    });

    $(".btn").click(function() {

      if (temp == " °C") {
        temperature = Math.round(temperature * 9 / 5 + 32);
        tempSign = " °F";
        document.getElementById('temperature').innerHTML = temperature + tempSign;
      } else {
        temperature = Math.round((temperature - 32) * 5 / 9);
        tempSign = " °C";
        document.getElementById('temperature').innerHTML = temperature + tempSign;

      }
    });

})();

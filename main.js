(function() {

  var lat = '';
  var lon = '';
  var tempSign = " °C";
  var temperature = '';
  var location = '';
  var icon = '';
  var countryCode = '';



function getLocation() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("no Address provided!");
}
}

function showPosition(position) {
    lon = position.coords.latitude;
    lat = position.coords.longitude;
}

/* var positionAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&sensor=true";
$.getJSON(positionAPI, function (data) {

  location = data.results[3].formatted_address;


}); */





  var weatherAPI = " http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=a58334c0eb6e894d9d377e657fc876ea&units=metric";


    $.getJSON(weatherAPI, function(data) {

      location = data.name;
      temperature = Math.round(data.main.temp);
      icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
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

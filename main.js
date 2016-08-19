(function() {
  


  $.getJSON("http://ip-api.com/json", function(data) {
    
      var lon = "";
      var lat = "";
  
      function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
           lon = data.lon;
           lat = data.lat;
    }
}

function showPosition(position) {
    lon = position.coords.latitude;
    lat = position.coords.longitude;
}
    

    var countryCode = data.countryCode;
    var city = data.city;

    var temp = '';
    var temperature = '';
    var location = '';
    var icon = '';

    if (countryCode == "US") {
      var weatherAPI = " http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=a58334c0eb6e894d9d377e657fc876ea&units=imperial";
      temp = " °F";
    } else {
      var weatherAPI = " http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=a58334c0eb6e894d9d377e657fc876ea&units=metric";
      temp = " °C"

    }

    $.getJSON(weatherAPI, function(data) {

      location = data.name;
      temperature = Math.round(data.main.temp);
      icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      document.getElementById('location').innerHTML = location + " - " + city;

      document.getElementById('temperature').innerHTML = temperature + temp;
      document.getElementById('icon').innerHTML = " <img src='" + icon + "'>";

      $(".btn").click(function() {
        console.log(temp);

        if (temp == " °C") {
          temperature = Math.round(temperature * 9 / 5 + 32);
          temp = " °F";
          document.getElementById('temperature').innerHTML = temperature + temp;
        } else {
          temperature = Math.round((temperature - 32) * 5 / 9);
          temp = " °C";
          document.getElementById('temperature').innerHTML = temperature + temp;

        }
      });

    });
  });
})();

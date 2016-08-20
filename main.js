(function() {

  var lat = '';
  var lon = '';
  var tempSign = " °F";
  var temperature = '';
  var tempMin1 = '';
  var tempMax1 = '';
  var tempMin2 = '';
  var tempMax2 = '';
  var tempMin3 = '';
  var tempMax3 = '';
  var location = '';
  var locationAdd = '';
  var icon = '';

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeather(lat, lon);
      getPosition(lat, lon);
    });

  } else {
    alert("no Location provided!")
  }

  function getPosition(latiude, longitude) {
    var positionAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latiude + "," + longitude;
    //console.log(positionAPI);
    $.getJSON(positionAPI, function(data) {

      location = data.results[0].address_components[3].long_name;
      locationAdd = data.results[0].address_components[5].long_name;
    });
  }

  function getWeather(latitude, longitude) {
    var weatherAPI = " https://api.forecast.io/forecast/a318a4996d504d004f217c64c53ae60f/" + latitude + "," + longitude + "?callback=?";

    console.log(weatherAPI)
    $.getJSON(weatherAPI, function(data) {

      temperature = Math.round(data.currently.temperature);
      tempMin1 = Math.round(data.daily.data[1].temperatureMin);
      tempMax1 = Math.round(data.daily.data[1].temperatureMax);
      tempMin2 = Math.round(data.daily.data[2].temperatureMin);
      tempMax2 = Math.round(data.daily.data[2].temperatureMax);
      tempMin3 = Math.round(data.daily.data[3].temperatureMin);
      tempMax3 = Math.round(data.daily.data[3].temperatureMax);

      var precip1 = "  " + ((Math.round(data.daily.data[1].precipProbability * 10) / 10) * 100) + " %";
      var precip2 = "  " + ((Math.round(data.daily.data[2].precipProbability * 10) / 10) * 100) + " %";
      var precip3 = "  " + ((Math.round(data.daily.data[3].precipProbability * 10) / 10) * 100) + " %";
      document.getElementById('location').innerHTML = location;
      document.getElementById('locationAdd').innerHTML = locationAdd;
      document.getElementById('temperatureNow').innerHTML = temperature + tempSign;
      document.getElementById('temperature1').innerHTML = tempMax1 + " / " + tempMin1 + tempSign;
      document.getElementById('temperature2').innerHTML = tempMax2 + " / " + tempMin2 + tempSign;
      document.getElementById('temperature3').innerHTML = tempMax3 + " / " + tempMin3 + tempSign;
      //console.log( document.getElementById('icon').className = "wi wi-forecast-io-" + icon + " wi-flip-horizontal");
      document.getElementById('rain1').innerHTML = precip1;

      document.getElementById('rain2').innerHTML = precip2;

      document.getElementById('rain3').innerHTML = precip3;

      var icon = data.currently.icon;
      var icon1 = data.daily.data[1].icon;
      var icon2 = data.daily.data[2].icon;
      var icon3 = data.daily.data[3].icon;
      var skycons = new Skycons({
        "color": "orange"
      });
      skycons.set("icon", icon);
      skycons.set("icon1", icon1);
      skycons.set("icon2", icon2);
      skycons.set("icon3", icon3);
      skycons.play();

      //sunrise & sunset

      function getTime(unix) {
        var date = new Date(unix * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
      }
      var sunrise = data.daily.data[0].sunriseTime;
      var sunset = data.daily.data[0].sunsetTime;

      document.getElementById('sunrise').innerHTML = getTime(sunrise);
      document.getElementById('sunset').innerHTML = getTime(sunset);

      //moon
      var moon = data.daily.data[0].moonPhase;
      var moonClass = '';
      if (moon <= 0.12) {
        moonClass = "wi wi-moon-new";
      } else if (moon > 0.12 && moon <= 0.36) {
        moonClass = "wi wi-moon-first-quarter";
      } else if (moon > 0.36 && moon <= 0.62) {
        moonClass = "wi wi-moon-full";
      } else if (moon > 0.62 && moon <= 0.88) {
        moonClass = "wi wi-moon-third-quarter";
      } else {
        moonClass = "wi wi-moon-new";
      }
      console.log(moon);
      console.log(moonClass);
      document.getElementById('moon').className = moonClass;

    });
  }

  $('#button').on('touchstart click', function() {
      changeSign();
      $(this).css('background-color', '#558592');
  });

  function changeSign() {
    if (tempSign == " °C") {
      temperature = Math.round(temperature * 9 / 5 + 32);
      tempMin1 = Math.round(tempMin1 * 9 / 5 + 32);
      tempMax1 = Math.round(tempMax1 * 9 / 5 + 32);
      tempMin2 = Math.round(tempMin2 * 9 / 5 + 32);
      tempMax2 = Math.round(tempMax2 * 9 / 5 + 32);
      tempMin3 = Math.round(tempMin3 * 9 / 5 + 32);
      tempMax3 = Math.round(tempMax3 * 9 / 5 + 32);
      tempSign = " °F";
      document.getElementById('temperatureNow').innerHTML = temperature + tempSign;
      document.getElementById('temperature1').innerHTML = tempMax1 + " / " + tempMin1 + tempSign;
      document.getElementById('temperature2').innerHTML = tempMax2 + " / " + tempMin2 + tempSign;
      document.getElementById('temperature3').innerHTML = tempMax3 + " / " + tempMin3 + tempSign;
    } else {
      temperature = Math.round((temperature - 32) * 5 / 9);
      tempMin1 = Math.round((tempMin1 - 32) * 5 / 9);
      tempMax1 = Math.round((tempMax1 - 32) * 5 / 9);
      tempMin2 = Math.round((tempMin2 - 32) * 5 / 9);
      tempMax2 = Math.round((tempMax2 - 32) * 5 / 9);
      tempMin3 = Math.round((tempMin3 - 32) * 5 / 9);
      tempMax3 = Math.round((tempMax3 - 32) * 5 / 9);
      tempSign = " °C";
      document.getElementById('temperatureNow').innerHTML = temperature + tempSign;
      document.getElementById('temperature1').innerHTML = tempMax1 + " / " + tempMin1 + tempSign;
      document.getElementById('temperature2').innerHTML = tempMax2 + " / " + tempMin2 + tempSign;
      document.getElementById('temperature3').innerHTML = tempMax3 + " / " + tempMin3 + tempSign;

    }
  }

  var now = new Date();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('day1').innerHTML = days[now.getDay() + 1];
  document.getElementById('day2').innerHTML = days[now.getDay() + 2];
  document.getElementById('day3').innerHTML = days[now.getDay() + 3];

})();

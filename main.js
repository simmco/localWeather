(function() {

  var lat = '';
  var lon = '';
  var tempSign = " °C";
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
    console.log(positionAPI);
    $.getJSON(positionAPI, function(data) {

      location = data.results[1].formatted_address;

    });
  }

  function getWeather(latitude, longitude) {
    var weatherAPI = " https://api.forecast.io/forecast/a318a4996d504d004f217c64c53ae60f/" + latitude + "," + longitude + "?callback=?&units=si";

    console.log(weatherAPI)
    $.getJSON(weatherAPI, function(data) {

      temperature = Math.round(data.currently.temperature);
      var temperature4h = Math.round(data.hourly.data[4].temperature);
      var temperature8h = Math.round(data.hourly.data[8].temperature);
      var temperature12h = Math.round(data.hourly.data[12].temperature);
      tempMin1 = Math.round(data.daily.data[1].temperatureMin);
      tempMax1 = Math.round(data.daily.data[1].temperatureMax);
      tempMin2 = Math.round(data.daily.data[2].temperatureMin);
      tempMax2 = Math.round(data.daily.data[2].temperatureMax);
      tempMin3 = Math.round(data.daily.data[3].temperatureMin);
      tempMax3 = Math.round(data.daily.data[3].temperatureMax);
      document.getElementById('temperatureNow').innerHTML = temperature + tempSign;
      document.getElementById('temperature4h').innerHTML = temperature4h + tempSign;
      document.getElementById('temperature8h').innerHTML = temperature8h + tempSign;
      document.getElementById('temperature12h').innerHTML = temperature12h + tempSign;
      document.getElementById('temperature1').innerHTML = tempMax1 + " / " + tempMin1 + tempSign;
      document.getElementById('temperature2').innerHTML = tempMax2 + " / " + tempMin2 + tempSign;
      document.getElementById('temperature3').innerHTML = tempMax3 + " / " + tempMin3 + tempSign;
      //rain
      var precip1 = "   " + ((Math.round(data.daily.data[1].precipProbability * 10) / 10) * 100) + " %";
      var precip2 = "   " + ((Math.round(data.daily.data[2].precipProbability * 10) / 10) * 100) + " %";
      var precip3 = "   " + ((Math.round(data.daily.data[3].precipProbability * 10) / 10) * 100) + " %";
      document.getElementById('rain1').innerHTML = precip1;
      document.getElementById('rain2').innerHTML = precip2;
      document.getElementById('rain3').innerHTML = precip3;
      //sunshineDay
      var sunshine1 = " " + (100 - ((Math.round(data.daily.data[1].cloudCover * 10) / 10) * 100)) + " %";
      var sunshine2 = " " + (100 - ((Math.round(data.daily.data[2].cloudCover * 10) / 10) * 100)) + " %";
      var sunshine3 = " " + (100 - ((Math.round(data.daily.data[3].cloudCover * 10) / 10) * 100)) + " %";
      document.getElementById('sunshine1').innerHTML = sunshine1;
      document.getElementById('sunshine2').innerHTML = sunshine2;
      document.getElementById('sunshine3').innerHTML = sunshine3;
      //location
      document.getElementById('location').innerHTML = location;


      //icons - skycons
      var icon = data.currently.icon;
      var icon1 = data.daily.data[1].icon;
      var icon2 = data.daily.data[2].icon;
      var icon3 = data.daily.data[3].icon;
      var icon4h = data.hourly.data[4].icon;
      var icon8h = data.hourly.data[8].icon;
      var icon12h = data.hourly.data[12].icon;
      var skycons = new Skycons({
        "color": "orange"
      });
      skycons.set("icon", icon);
      skycons.set("icon1", icon1);
      skycons.set("icon2", icon2);
      skycons.set("icon3", icon3);
      skycons.set("icon4h", icon4h);
      skycons.set("icon8h", icon8h);
      skycons.set("icon12h", icon12h);
      skycons.play();

      // get times


      function getTime(unix) {
        var date = new Date(unix * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        return formattedTime;
      }
      //sunrise & sunset
      var sunrise = data.daily.data[0].sunriseTime;
      var sunset = data.daily.data[0].sunsetTime;
      document.getElementById('sunrise').innerHTML = getTime(sunrise);
      document.getElementById('sunset').innerHTML = getTime(sunset);

      //timeData
      var timeData = data.currently.time;
      var time4h = data.hourly.data[4].time;
      var time8h = data.hourly.data[8].time;
      var time12h = data.hourly.data[12].time;

      document.getElementById('timeData').innerHTML = getTime(timeData) ;
        document.getElementById('time4h').innerHTML = "<u>" + getTime(time4h)+ "</u>";
        document.getElementById('time8h').innerHTML =  "<u>" +getTime(time8h)+ "</u>";
        document.getElementById('time12h').innerHTML = "<u>" + getTime(time12h)+ "</u>";

      //moon
      var moonPhase = data.daily.data[0].moonPhase;
      var moonClass = '';
      function getMoonPhase (moon) {
      if (moon <= 0.036) {
        moonClass = "wi wi-moon-alt-new";
      } else if (moon > 0.036 && moon <= 0.072) {
        moonClass = "wi wi-moon-alt-waxing-crescent-1";
      } else if (moon > 0.072 && moon <= 0.108) {
        moonClass = "wi wi-moon-alt-waxing-crescent-2";
      } else if (moon > 0.108 && moon <= 0.144) {
        moonClass = "wi wi-moon-alt-waxing-crescent-3";
      }
      else if (moon > 0.144 && moon <= 0.18) {
        moonClass = "wi wi-moon-alt-waxing-crescent-4";
      }
      else if (moon > 0.18 && moon <= 0.216) {
        moonClass = "wi wi-moon-alt-waxing-crescent-5";
      }
      else if (moon > 0.216 && moon <= 0.249) {
        moonClass = "wi wi-moon-alt-waxing-crescent-6";
      }
      else if (moon > 0.249 && moon <= 0.288) {
        moonClass = "wi wi-moon-alt-first-quarter";
      }
      else if (moon > 0.288 && moon <= 0.324) {
        moonClass = "wi wi-moon-alt-waxing-gibbous-1";
      }
      else if (moon > 0.324 && moon <= 0.36) {
        moonClass = "wi wi-moon-alt-waxing-gibbous-2";
      }
      else if (moon > 0.36 && moon <= 0.396) {
        moonClass = "wi wi-moon-alt-waxing-gibbous-3";
      }
      else if (moon > 0.396 && moon <= 0.432) {
        moonClass = "wi wi-moon-alt-waxing-gibbous-4";
      }
       else if (moon > 0.432 && moon <= 0.468) {
        moonClass = "wi wi-moon-alt-waxing-gibbous-5";
      }
       else if (moon > 0.468 && moon <= 0.499) {
        moonClass = "wi wi-moon-alt-waxing-gibbous-6";
      }
       else if (moon > 0.5 && moon <= 0.536) {
        moonClass = "wi wi-moon-alt-full";
      }
      else if (moon > 0.536 && moon <= 0.572) {
        moonClass = "wi wi-moon-alt-waning-gibbous-1";
      }
      else if (moon > 0.572 && moon <= 0.608) {
        moonClass = "wi wi-moon-alt-waning-gibbous-2";
      }
      else if (moon > 0.608 && moon <= 0.644) {
        moonClass = "wi wi-moon-alt-waning-gibbous-3";
      }
      else if (moon > 0.644 && moon <= 0.68) {
        moonClass = "wi wi-moon-alt-waning-gibbous-4";
      }
      else if (moon > 0.68 && moon <= 0.716) {
        moonClass = "wi wi-moon-alt-waning-gibbous-5";
      }
      else if (moon > 0.716 && moon <= 0.749) {
        moonClass = "wi wi-moon-alt-waning-gibbous-6";
      }
      else if (moon > 0.749 && moon <= 0.785) {
        moonClass = "wi wi-moon-alt-third-quarter";
      }
      else if (moon > 0.785 && moon <= 0.821) {
        moonClass = "wi wi-moon-alt-waning-crescent-1";
      }
      else if (moon > 0.821 && moon <= 0.857) {
        moonClass = "wi wi-moon-alt-waning-crescent-2";
      }
      else if (moon > 0.857 && moon <= 0.893) {
        moonClass = "wi wi-moon-alt-waning-crescent-3";
      }
      else if (moon > 0.893 && moon <= 0.929) {
        moonClass = "wi wi-moon-alt-waning-crescent-4";
      }
      else if (moon > 0.929 && moon <= 0.959) {
        moonClass = "wi wi-moon-alt-waning-crescent-5";
      }
      else if (moon > 0.959 && moon <= 0.995) {
        moonClass = "wi wi-moon-alt-waning-crescent-6";
      }
       else {
        moonClass = "wi wi-moon-alt-new";
      }
      }
      getMoonPhase(moonPhase)
      document.getElementById('moon').className = moonClass;

     // humidity

      var humidity = data.currently.humidity *100;
      document.getElementById('humidity').innerHTML = humidity;

     // wind
     var windSpeed = data.currently.windSpeed;
     var windBearing = data.currently.windBearing;
     var beaufortWind = 0;

     function getBeaufortWind (wind) {
       if (wind <= 0.2) {
         beaufortWind = 0;
       }
       else if(wind > 0.3 && wind <= 1.5) {
         beaufortWind = 1;
       }
       else if(wind > 1.5 && wind <=3.3) {
         beaufortWind = 2;
       }
       else if(wind > 3.3 && wind <=5.4) {
         beaufortWind = 3;
       }
       else if(wind > 5.4 && wind <=7.9) {
         beaufortWind = 4;
       }
       else if(wind > 7.9 && wind <=10.7) {
         beaufortWind = 5;
       }
       else if(wind > 10.7 && wind <=13.8) {
         beaufortWind = 6;
       }
     }
      var direction = '';
     function getWindIcon (bearing) {
       if(bearing <= 11.5) {
         direction = "wi wi-wind from-0-deg";
       }
       else if (bearing > 11.5 && bearing <= 34) {
         direction = "wi wi-wind from-23-deg"
       }
       else if (bearing > 34 && bearing <= 56.5) {
         direction = "wi wi-wind from-45-deg"
       }
       else if (bearing > 56.5 && bearing <= 79) {
         direction = "wi wi-wind from-68-deg"
       }
       else if (bearing > 79 && bearing <= 101.5) {
         direction = "wi wi-wind from-90-deg"
       }
       else if (bearing > 101.5 && bearing <= 124) {
         direction = "wi wi-wind from-113-deg"
       }
       else if (bearing > 124 && bearing <= 146.5) {
         direction = "wi wi-wind from-135-deg"
       }
       else if (bearing > 146.5 && bearing <= 169) {
         direction = "wi wi-wind from-158-deg"
       }
       else if (bearing > 169 && bearing <= 190.5) {
         direction = "wi wi-wind from-180-deg"
       }
       else if (bearing > 190.5 && bearing <=214) {
         direction = "wi wi-wind from-203-deg"
       }
       else if (bearing > 214 && bearing <=236.5) {
         direction = "wi wi-wind from-225-deg"
       }
else if (bearing > 236.5 && bearing <=259) {
         direction = "wi wi-wind from-248-deg"
       }
else if (bearing > 259 && bearing <=281.5) {
         direction = "wi wi-wind from-270-deg"
       }
else if (bearing > 281.5 && bearing <=304) {
         direction = "wi wi-wind from-203-deg"
       }
else if (bearing > 304 && bearing <=324.5) {
         direction = "wi wi-wind from-203-deg"
       }
else if (bearing > 324.5 && bearing <=347) {
         direction = "wi wi-wind from-203-deg"
       }
else {
	direction = "wi wi-wind from-0-deg";
     }
     }
      getBeaufortWind(windSpeed);
      getWindIcon (windBearing);
     document.getElementById('wind').innerHTML = beaufortWind;
      document.getElementById('direction').className = direction;
    });
  }

  $('#button').on('click touchstart', function() {
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
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  document.getElementById('day').innerHTML = "<u>" + days[now.getDay()] + ", " + now.getDate() + "." + (now.getMonth() + 1) + "." + now.getFullYear() + "</u>";
  document.getElementById('day1').innerHTML = "<u>" + days[now.getDay() + 1] + "</u>";
  document.getElementById('day2').innerHTML = "<u>" +days[now.getDay() + 2]+ "</u>";
  document.getElementById('day3').innerHTML = "<u>" +days[now.getDay() + 3]+ "</u>";
  //console.log(hour);
  //console.log(minutes);

})();

//Note that the code uses a global variable for tempUnit and
//temp. This will be fixed later since it is usually a good practice
//to not define variables globally, and in this case will allow the
//temperature conversion function to be defined in the $(document).ready
//function. However, the global variables in this case do not prevent the
//execution of the program.

$(document).ready(function() {
  //initial values and geolocation setup
  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var latitude;
  var longitude;
  tempUnit = "C";
  var geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(exactLocation);

  //geolocation schenanigans
    function exactLocation(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      /*
      //info for the latitude and longitude displayed on the page
      var latRound = Math.round(latitude * 100) / 100;
      var lonRound = Math.round(longitude * 100) / 100;
      $("#lat").html("Latitude: " + latRound);
      $("#lon").html("Longitude: " + lonRound);
      */
      weather(latitude, longitude);
    }


//function that uses latitude and longitude to do an ajax call
function weather(latitude, longitude) {
  var urlString = api + "lat=" + latitude + "&lon=" + longitude;

  //this is the part that does the ajax call
  //also this displays the info back on the page based on the html element's id
  $.ajax({
    url: urlString, success: function (result) {
      $("#city").html("City: " + result.name);
      $("#country").html("Country: " + result.sys.country);
      temp = Math.round(result.main.temp*10)/10;
      $("#temp").html(temp + " " + String.fromCharCode(176) + " " + tempUnit);
      details = result.weather[0].main;
      $("#details").html("Weather description: " + details);

//this is the part that changes the background image depending on the weather
if (details == "Rainn") {

  $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/1zh1ue5d2kvbk4p/rain%20partial%20chance.jpg?dl=0)') //rain

} else if (details != "Rainn") {
if (temp > 27) {

  $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/4fo8ks1ybznqixr/beach%20hot%20weather.jpeg?dl=0)'); //beach hot temperature

 } else if (temp <= 27 && temp > 20) {

       $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/aswbxbogj7skuva/lake%20warm%20weather.jpeg?dl=0)') //lake warm temperature

  } else if (temp <= 20 && temp > 15) {

    $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/uwwge18a96efp7g/forest%20average%20weather.jpeg?dl=0)') //forest above average temperature

} else if (temp <= 15 && temp > 10) {

      $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/lyhhrw801jh4720/mountain%20average%20weather.jpeg?dl=0)') //mountain below average temperature

} else if (temp <= 10 && temp > 0) {

      $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/g6y81igkysb8c81/fall%20cool%20weather%20mountain.jpeg?dl=0)') //mountain cool temperature

} else if (temp <= 0) {

    $('body').css('background-image', 'url(https://dl.dropboxusercontent.com/s/s2umw9t9hnv2pnk/Snow%20cold%20weather.jpeg?dl=0)') //snow cold temperature

}
} //end else if != "Rain"
    } //end function in ajax call
  }); //end ajax
} //end weather
})  //end doc ready

//converts the temperature once the button is pressed
function tempConversion() {
    switch (tempUnit) {
      case "C":
        temp = Math.round((temp*(9/5)+32) * 10) / 10;
        tempUnit = "F";
        $("#temp").html(temp + " " + String.fromCharCode(176) + " " + tempUnit);
        break;
      case "F":
        temp = Math.round(((temp-32)*(5/9)) * 10) / 10;
        tempUnit = "C";
        $("#temp").html(temp + " " + String.fromCharCode(176) + " " + tempUnit);
        break;
    }
  }

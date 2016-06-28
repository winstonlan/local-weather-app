var temperatureFarenheit = 0;
var temperatureCelsius = 0;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=07bbfd3b8d8e40388c688f563aca659d&units=imperial", function(json) {
            $("#location").html(json.name + ", " + json.sys.country);
            temperatureFarenheit = Math.round(json.main.temp);
            temperatureCelsius = Math.round((temperatureFarenheit - 32) * (5 / 9));
            $("#temperature").html(temperatureFarenheit + "°F");

            // change the icon depending on what the weather description is
            switch(json.weather[0].description) {
                case "clear sky":
                    $("#weather-icon").addClass("wi-day-sunny");
                    break;
                case "few clouds":
                case "scattered clouds":
                case "broken clouds":
                    $("#weather-icon").addClass("wi-day-cloudy");
                    break;
                case "shower rain":
                    $("#weather-icon").addClass("wi-day-rain");
                    break;
                case "rain":
                    $("#weather-icon").addClass("wi-day-rain-mix");
                    break;
                case "thunderstorm":
                    $("#weather-icon").addClass("wi-day-thunderstorm");
                    break;
                case "snow":
                    $("#weather-icon").addClass("wi-day-snow");
                    break;
                case "mist":
                    $("#weather-icon").addClass("wi-day-fog");
                    break;
            }
        });
    });
};

$(document).ready(function() {
    $("#change-metric-button").on("click", function() {
        if ($(this).text() == "Celsius") {
            $("#temperature").html(temperatureCelsius + "°C");
            $(this).html("Farenheit");
        } else {
            $("#temperature").html(temperatureFarenheit + "°F");
            $(this).html("Celsius");
        }

    });
});

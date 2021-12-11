var cityNameEl = document.querySelector("#cityName")
var cityInputEl = document.querySelector("#cityInput")

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        weatherNinja(cityName);

        cityNameEl.value = "";
    } else {
        alert("Please enter a valid location");
    }
};

var weatherNinja = function (city) {
    
    var weatherNinjaUrl = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}&`

    fetch(weatherNinjaUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
            "x-rapidapi-key": "70ae343f6dmsh7bf694b2328aaa6p16256fjsn232bf43b441a"
        }
    })
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
            });
        } else {
            alert("Error: " + response.statusText);
        };
    });
}

cityInputEl.addEventListener("submit", formSubmitHandler);
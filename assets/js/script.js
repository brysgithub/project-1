var cityNameEl = document.querySelector("#cityName")
var cityInputEl = document.querySelector("#cityInput")
var currentCity = document.querySelector("#currentCity")
var searchedCityEl = document.querySelector("#searchedCity")
var responseText = document.querySelector("#responseText")
var searchTerm = ""
var responseData = ""

var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();

    if (cityName) {
        weatherNinja(cityName);

        cityNameEl.value = "";
        currentCity.innerHTML = cityName
    } else {
        $('#invalidLocation').foundation('open');
    }

    $(".result-card").removeClass("hidden");
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

                    if (data.feels_like <= 10) {
                        searchTerm += "Cold"
                        responseData += "Cold"
                    } else if (data.feels_like >= 25) {
                        searchTerm += "Hot"
                        responseData += "Hot"
                    } else {
                        searchTerm += "Nice"
                        responseData += "Nice"
                    }
                    if (data.cloud_pct >= 75 && data.humidity >= 85) {
                        searchTerm += "+Rainy"
                        responseData += " & Rainy"
                    }
                    giphySearch(searchTerm)
                    console.log(searchTerm)
                    responseText.innerHTML = responseData
                });
            } else {
                $('#errorModal').foundation('open');
                $("#statusText").html(response.statusText);
            };
        });
}

cityInputEl.addEventListener("submit", formSubmitHandler);

function giphySearch(searchTerm) {

    var giphyUrl = `https://giphy.p.rapidapi.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=${searchTerm}`
    console.log(searchTerm);

    fetch(giphyUrl, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "giphy.p.rapidapi.com",
            "x-rapidapi-key": "c79b1b3c61msh7a879540aede5e2p1b1548jsn1a5e1ce01f0d"
        }
    })
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (gifs) {
                    function renderGif() {
                        console.log(gifs)
                        var gifChoice = gifs.data[0].images.original.url;
                        var gif = document.createElement("img")
                        gif.src = gifChoice
                        $("#gifChoice").html(gif)

                    }
                    console.log(gifs);
                    renderGif()
                });
            } else {
                $('#errorModal').foundation('open');
                $("#statusText").html(response.statusText);
            };
        });
}

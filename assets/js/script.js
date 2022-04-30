var cityNameEl = document.querySelector("#cityName");
var cityInputEl = document.querySelector("#cityInput");
var currentCity = document.querySelector("#currentCity");
var searchedCityEl = document.querySelector("#searchedCity");
var responseText = document.querySelector("#responseText");
var searchTerm = "";
var responseData = "";

// Adds saved gif url to favorites
var savedGifs = localStorage.getItem("favoriteGif");
if (!savedGifs) {
} else {
  $("#favoriteGifs").append(
    `<li class = "drop-down-bg"><a href = ${savedGifs}>${savedGifs}</a></li>`
  );
}

// Handles entered search terms and calls error modal if entry is invalid
var formSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityNameEl.value.trim();

  if (cityName) {
    weatherNinja(cityName);

    cityNameEl.value = "";
    currentCity.innerHTML = cityName;
  } else {
    $("#invalidLocation").foundation("open");
  }

  $(".result-card").removeClass("hidden");
};

// Calls weather API to get weather data and outputs simple search terms
var weatherNinja = function (city) {
  var weatherNinjaUrl = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}&`;

  fetch(weatherNinjaUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "weather-by-api-ninjas.p.rapidapi.com",
      "x-rapidapi-key": "70ae343f6dmsh7bf694b2328aaa6p16256fjsn232bf43b441a",
    },
  }).then(function (response) {
    if (response.ok) {
      // console.log(response);
      response.json().then(function (data) {
        // console.log(data);

        if (data.feels_like <= 10) {
          searchTerm += "Cold";
          responseData = "Cold";
        } else if (data.feels_like >= 25) {
          searchTerm += "Hot";
          responseData = "Hot";
        } else {
          searchTerm += "Nice";
          responseData = "Nice";
        }
        if (data.cloud_pct >= 75 && data.humidity >= 85) {
          searchTerm += "+Rainy";
          responseData += " & Rainy";
        }
        giphySearch(searchTerm);
        // console.log(searchTerm)
        responseText.innerHTML = responseData;
      });
    } else {
      $("#errorModal").foundation("open");
      $("#statusText").html(response.statusText);
    }
  });
};

cityInputEl.addEventListener("submit", formSubmitHandler);

// Calls Giphy API and passes in search terms from WeatherNinja function to display weather gi
function giphySearch(searchTerm) {
  var giphyUrl = `https://giphy.p.rapidapi.com/v1/gifs/search?api_key=0vQIP8FFI9VcIN8ApDLeWwsPzrFIScXt&q=${searchTerm}`;
  // console.log(searchTerm);

  fetch(giphyUrl, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "giphy.p.rapidapi.com",
      "x-rapidapi-key": "c79b1b3c61msh7a879540aede5e2p1b1548jsn1a5e1ce01f0d",
    },
  }).then(function (response) {
    if (response.ok) {
      // console.log(response);
      response.json().then(function (gifs) {
        function renderGif() {
          // console.log(gifs)
          var randomNum = Math.floor(Math.random() * 6)
          var gifChoice = gifs.data[randomNum].images.original.url;
          var gif = document.createElement("img");
          gif.src = gifChoice;
          $("#gifChoice").html(gif);
        }
        // console.log(gifs);
        renderGif();
      });
    } else {
      $("#errorModal").foundation("open");
      $("#statusText").html(response.statusText);
    }
  });
}

// Grabs gif URL from img element to save to favorites
$("#saveButton").click(function saveGif() {
  var favGif = $("img[src^='https://']").attr("src");
  localStorage.setItem("favoriteGif", favGif);
  
  // Adds saved gif url to favorites
  var savedGifs = localStorage.getItem("favoriteGif");
  if (!savedGifs) {
  } else {
    $("#favoriteGifs").append(
      `<li class = "drop-down-bg"><a href = ${savedGifs}>${savedGifs}</a></li>`
    );
  }
});
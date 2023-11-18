// Global variables
var searchHistory = [];
var weatherApiRootUrl = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
var weatherApiKey = 'f8d62935017b3c6ac1ed01d4962d4ca5';
var fiveDayApi = "http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"

var city;
// DOM element references
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');
var todayContainer = document.querySelector('#today');
var forecastContainer = document.querySelector('#forecast');
var searchHistoryContainer = document.querySelector('#history');
var currentDate = dayjs().format();
// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);

// Function to display the search history list.
function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';

  // Start at end of history array and count down to show the most recent at the top.


    // `data-search` allows access to city name when click handler is invoked

}

// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
  // If there is no search term return the function

}

// Function to get search history from local storage
function initSearchHistory() {

}

// Function to display the current weather data fetched from OpenWeather api.
function renderCurrentWeather(city, weather) {

}

// Function to display a forecast card given an object from open weather api
// daily forecast.
function renderForecastCard(forecast) {
  // variables for data from api


  // Create elements for a card
  var col = document.createElement('div');
  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var cardTitle = document.createElement('h5');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');


  // Add content to elements
  cardTitle.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}

// Function to display 5 day forecast.
function renderForecast(dailyForecast) {
  // Create unix timestamps for start and end of 5 day forecast
 
}

function renderItems(city, data) {

}

// Fetches weather data for given location from the Weather Geolocation
// endpoint; then, calls functions to display current and forecast weather data.
function fetchWeather(location) {
 
  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderItems(city, data);
    })
    .catch(function (err) {
      console.error(err);
    });
}

function fetchCoords(search) {
  var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;


}

function handleSearchFormSubmit(e) {
  // Don't continue if there is nothing in the search form


  e.preventDefault();

}

function handleSearchHistoryClick(e) {
  // Don't do search if current elements is not a search history button
 

}
function getGeolocation(city){
  var latAndLongApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + weatherApiKey;

  fetch(latAndLongApi)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });
}
var searchBtn= document.querySelector(".search-button")
var weather_search=document.querySelector(".weather-search")
searchBtn.addEventListener("click",function (event) {
  event.preventDefault();
  
  var cityName = weather_search.value;
getGeolocation(cityName);
})
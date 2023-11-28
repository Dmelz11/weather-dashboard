// const { doc } = require("prettier");

// Global variables
var searchHistory = [];
var weatherApiKey = 'f8d62935017b3c6ac1ed01d4962d4ca5';

var cityName = document.querySelector("#searchedCity");
var searchBtn= document.querySelector(".search-button")
var weather_search=document.querySelector(".weather-search")

// DOM element references
var searchForm = document.querySelector('#search-form');
var searchInput = document.querySelector('#search-input');//input for current weather search
var todayContainer = document.querySelector('#weather-today');//current weather display
var forecastContainer = document.querySelector('#forecastFiveDay');
var searchHistoryContainer = document.querySelector('.history-btn');
var currentDate = document.querySelector('todayDate');
var toastHTML = '<span>Please enter a valid city!</span>';
// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);

// Function to display the search history list.
function renderSearchHistory(event) {
  event.preventDefault();
  let cityName= searchInput.value.trim();
  let btn = document.createElement("button")
  btn.className = ".history-btn";
  searchHistoryContainer.innerHTML = cityName; 
  buttons.appendChild(btn);
  listCity();
  if (!searchHistory.includes(cityName) && (cityName = "")) {
    searchHistory.push(cityName)
  };
};

  // Start at end of history array and count down to show the most recent at the top.


    // `data-search` allows access to city name when click handler is invoked



// Function to update history in local storage then updates displayed history.
function appendToHistory(search) {
  // If there is no search term return the function
history.forward()
}

// Function to get search history from local storage
function initSearchHistory() {

}

//function to display the current weather from the current weather data fetched from Openweather api
function getWeatherData(event){
  event.preventDefault();
  var city = cityInput.val();
  if (! city && city < ""){
    M.toast({ html:toastHTML });
  } else {
    cities.push(city);
    fetchWeather(city);
  }
};



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
  //cardTitle.textContent = dayjs(forecast.dt_txt).format('MM/DD/YYYY');
  
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  tempEl.textContent = `Temp: ${tempF} °F`;
  windEl.textContent = `Wind: ${windMph} MPH`;
  humidityEl.textContent = `Humidity: ${humidity} %`;

  forecastContainer.append(col);
}
// Create unix timestamps for start and end of 5 day forecast
// $(document).ready(function() {
  // var value = $("data.dt*1000").val(); //this retrieves the unix timestamp
  // var dateString = moment(value, 'MM/DD/YYYY', false).calendar(); 
  // alert(dateString);
// });
// function formatDateTime(dateString) {
  // const parsed = moment(new Date(dateString))

  // if (!parsed.isValid()) {
 //     return dateString
  // }

  // return parsed.format('MM/ D/ YYYY');

// Function to display 5 day forecast.
function fetch5DayForecast(lat, lon) {
  
  var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" +lon + "&appid=" + weatherApiKey;
  fetch(fiveDayUrl)
  .then(function (res) {
    return res.json();
  })

  .then(function (data) {
  
    
    console.log(data);

    for (var i = 0; i < data.list.length; i+=8){

      var humidity = data.list[i].main.humidity;
      var temperature = data.list[i].main.temp;
      var windspeed = data.list[i].wind.speed;
      var date = timeConverter(data.list[i].dt);
      var icon = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
  
      console.log(temperature, windspeed, date, icon);

      var cardDiv = document.createElement('div')
      var cardBodyDiv = document.createElement('div')
      var dateEl = document.createElement('h6')
      var iconEl = document.createElement('img')
      var tempEl = document.createElement('p')
      var windEl = document.createElement('p')
      var humidEl = document.createElement('p')
      
      humidEl.textContent = humidity;
      tempEl.textContent = temperature;
      windEl.textContent = windspeed;
      dateEl.textContent = date;
      iconEl.setAttribute('src', icon)

      cardDiv.setAttribute('class', 'card')

      cardBodyDiv.appendChild(dateEl)
      cardBodyDiv.appendChild(iconEl)
      cardBodyDiv.appendChild(tempEl)
      cardBodyDiv.appendChild(windEl)
      cardBodyDiv.appendChild(humidEl)

      cardDiv.appendChild(cardBodyDiv)
      
      forecastContainer.appendChild(cardDiv)
      var cardHtml = `<div class="card" id="card1">
      <div class="card-body">
        <h6></h6>
        <img class="card-icon" style="margin-left: 45%" />
        <p><strong>Temp: </strong><span id="card-1Temp"></span></p>
        <p><strong>Wind: </strong><span id="card-1Wind"></span></p>
        <p><strong>Humidity: </strong><span id="card-1Humidity"></span></p>
      </div>
    </div>`


    }

    
 
   })

   .catch(function (err) {
    console.error(err);
  });
  
}
// endpoint; then, calls functions to display current and forecast weather data.


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + ' ' + month + ' ' + year ;
  return time;
}

function fetchCurrentWeather(lat, lon) {
var weatherApiRootUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + weatherApiKey;
 
  fetch(weatherApiRootUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      //renderItems(city, data);
      var cityName = document.querySelector("#searchedCity");
      var humidEl = document.querySelector("#todayHumidity");
      var tempEl = document.querySelector("#todayTemp");
      var windEl = document.querySelector("#todayWind");
      var dateEl = document.querySelector("#todayDate");
      var iconEl = document.querySelector("#todayIcon");
      //
      console.log(data);
   
      var humidity = data.main.humidity;
      var temperature = data.main.temp;
      var windspeed = data.wind.speed;
      var date = timeConverter(data.dt);
      var icon = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
      var name = data.name
      console.log(humidity, temperature, windspeed, date, icon, name);

      cityName.textContent = name;
      humidEl.textContent = humidity + '%';
      tempEl.textContent = temperature + '°F';
      windEl.textContent = windspeed + 'mph';
      dateEl.textContent = date;
      iconEl.setAttribute('src', icon)
    })
    .catch(function (err) {
      console.error(err);
    });
}

      
  


// function handleSearchHistoryClick(e) {
//   // Don't do search if current elements is not a search history button
 

// }
// // Fetches weather data for given location from the Weather Geolocation

function getGeolocation(city){
  var latAndLongApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + weatherApiKey;

  fetch(latAndLongApi)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    var lat = data[0].lat;
    var lon = data[0].lon;
    fetchCurrentWeather(lat, lon)
    fetch5DayForecast(lat, lon)
  })
  .catch(function (err) {
    console.error(err);
  })
}

searchBtn.addEventListener("click",function (event){
  event.preventDefault();
 
  var cityName = weather_search.value;
  getGeolocation(cityName);
})
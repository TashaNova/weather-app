//Date
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let time = document.querySelector("#time-string");
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day} ${hour}:${minutes}`;
  //time.innerHTML = `${day} ${hour}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `<div class="col">
              <div class="forecast-days">
               ${formatForecastDay(forecastDay.dt)}
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="35PX">
              </div> 
              <div class="forecast-temperature">
               <span class="forecast-temperature-max">🌝 ${Math.round(
                 forecastDay.temp.max
               )}</span> 
               <span class="forecast-temperature-min">🌚 ${Math.round(
                 forecastDay.temp.min
               )}</span>
               </div>
		       </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8c49740cd3e1e284d60cee5be68d2a24";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function showCityTemp(response) {
  let newCity = document.querySelector("#cityName");
  let userTemp = document.querySelector("#current-temperature");
  let windSpeadElement = document.querySelector("#windSpead");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#time-string");

  newCity.innerHTML = response.data.name;
  userTemp.innerHTML = Math.round(response.data.main.temp);
  windSpeadElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "8c49740cd3e1e284d60cee5be68d2a24";
  //city = "Kyiv";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityTemp);
}

function getUserCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchMenu");
  searchCity(cityInput.value);
}

let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", getUserCity);

searchCity("New York");

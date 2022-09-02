//User temp
function searchCity(event) {
  event.preventDefault();
  let apiKey = "8c49740cd3e1e284d60cee5be68d2a24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityTemp);
}

let citySearch = document.querySelector("form");
let userCity = document.querySelector("#searchMenu");
let newCity = document.querySelector("#cityName");
let userTemp = document.querySelector("#current-temperature");

citySearch.addEventListener("click", searchCity);

function showCityTemp(response) {
  console.log(response);
  userTemp.innerHTML = Math.round(response.data.main.temp);
  newCity.innerHTML = userCity.value;
  let windSpeadElement = document.querySelector("#windSpead");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  windSpeadElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function getForecast(coordinates) {
  console.log(coordinates);
}

function displayForcast() {
  let forecastElement = document.querySelector("#forecast");
  let forcastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forcastHTML += `<div class="col-3">
              <div class="forcast-days">
                Fr
              <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="" width="35PX">
              </div> 
              <div class="forecast-temperature">
               <span>🌝 +18</span> 
               <span>🌚 +12</span>
               </div>
		       </div>`;
  });
  forcastHTML += `</div>`;
  forecastElement.innerHTML = forcastHTML;
}
displayForcast();
getForecast(response.data.coord);

//Date
function formatDate (timestamp)
let now = new Date();
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

time.innerHTML = `${day} ${hour}:${minutes}`;

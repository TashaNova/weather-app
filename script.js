//User temp

let citySearch = document.querySelector("form");
let userCity = document.querySelector("#searchMenu");
let newCity = document.querySelector("#cityName");
let userTemp = document.querySelector("#current-temperature");

citySearch.addEventListener("click", searchCity);

function searchCity(event) {
  event.preventDefault();
  let apiKey = "c08cfe93e8eb9d83c3e646f295df45f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityTemp);
}

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

//Date

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

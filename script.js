//User temp

let citySearch = document.querySelector("form");
let userCity = document.querySelector("#searchMenu");
let newCity = document.querySelector("#cityName");
newCity.innerHTML = `${userCity.value}`;

citySearch.addEventListener("click", searchCity);

function searchCity(event) {
  event.preventDefault();
  let apiKey = "c08cfe93e8eb9d83c3e646f295df45f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  console.log(response);
  let userTemp = document.querySelector("#current-temperature");
  userTemp.innerHTML = response.data;
}

//Date
let now = new Date();
let time = document.querySelector("#time-string");
let hour = now.getHours();
let minutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Tue", "Fr", "Sat"];
let day = days[1];

time.innerHTML = `${day} ${hour}:${minutes}`;

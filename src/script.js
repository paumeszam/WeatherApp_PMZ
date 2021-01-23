//Current Date
let date = new Date();
let day = date.getDay();
let hour = date.getHours();
let minutes = date.getMinutes();
let today = document.querySelector("#date");

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function setMinutes(minutes){
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return minutes;
}

today.innerHTML = (`${dayNames[day]}, ${hour}:${setMinutes(minutes)}`);

//Input City Search

function changeCity(event){
  event.preventDefault();
  let cityInput = document.querySelector("#search");
  let apiKey = "3298e39870d933f506bba233ba3572ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let submitButton = document.querySelector("#submit");
submitButton.addEventListener("click",changeCity);

//Current Temperature
function showWeather(response){
  let cityName = document.querySelector("#city");
  let location = (response.data.name);
  let degrees = document.querySelector("#degrees");
  let temperature = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#weather-icon")

  celsiusTemp = Math.round(response.data.main.temp);

  cityName.innerHTML = location;
  degrees.innerHTML = temperature;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description; 
  weatherIcon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
} 

//Current Location

function getLocation(){
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "3298e39870d933f506bba233ba3572ef";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    axios.get(apiUrl).then(showWeather);   
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getLocation);

//Conversion C to F

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
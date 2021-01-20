//Current Date
let date = new Date();
let day = date.getDay();
let hour = date.getHours();
let minutes = date.getMinutes();

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

let today = document.querySelector("h3");
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
    console.log(response);
    console.log(response.data.main.temp);
    let h1 = document.querySelector("#degrees");
    let temperature = Math.round(response.data.main.temp);
    h1.innerHTML = `${temperature}`;
    let h2 = document.querySelector("h2");
    let location = (response.data.name);
    h2.innerHTML = location;
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




// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempeElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const cityNameInputElement = document.querySelector(".cityName-input");

//APP DATA
const weather = {};
let inputCityName;

weather.temperature = {
  unit: "celsius",
};

//APP CONSTS AND VARS
const KELVIN = 273;
//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//CHECK IF BROWSERS SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
  // } else if (inputCityName !== undefined) {
  //   apiCallFuncWithName(inputCityName);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>Browser dosen't support Geolocation</p>`;
}

//SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

//Show error message
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//GET Weather from API
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  // let api = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=${key}`;

  // console.log("api @@", api);
  fetch(api)
    .then(function (responce) {
      let data = responce.json();
      return data;
    })
    .then(function (data) {
      console.log("data @@", data);
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

//DISPLAY WEATHER TO UI
function displayWeather() {
  iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  tempeElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C TO F CONVERSION
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

//WHEN THE USER CLICKS ON THE TEMPRATURE ELEMENT
tempeElement.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempeElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = "fahrenheit";
  } else {
    tempeElement.innerHTML = `${weather.temperature.value}°<span></span>`;
    weather.temperature.unit = "celsius";
  }
});

function apiCallFuncWithName(inputCityName) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&appid=${key}`;
  fetch(api)
    .then(function (responce) {
      let data = responce.json();
      return data;
    })
    .then(function (data) {
      console.log("data @@", data);
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

function cityNameInputFunction() {
  inputCityName = cityNameInputElement.value;
  apiCallFuncWithName(inputCityName);
  // console.log("inputCityName_01  @@", inputCityName);
  // console.log("input by user @@", cityNameInputElement.value);
}

//INPUT PALCE
cityNameInputElement.addEventListener("change", cityNameInputFunction);

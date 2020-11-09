class UI{
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.tempString = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.wind = document.getElementById('w-wind');
    this.feels = document.getElementById('w-feelsLike');
  }

  paintUI(weather) {
    console.log(weather);
    this.location.textContent = weather.name;
    this.desc.textContent = weather.weather[0].description;
    let tempF = (weather.main.temp - 273.15) * 1.80 + 32;
    this.tempString.textContent = tempF.toFixed(0) + "℉";
    let iconURL = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
    this.icon.setAttribute('src', iconURL);
    this.humidity.textContent = `Relative Humidity: ${weather.main.humidity}`;
    let tempFeels = (weather.main.feels_like - 273.15) * 1.80 + 32;
    this.feels.textContent = `Feels Like: ${tempFeels.toFixed(0)}℉`;
    this.wind.textContent = `Wind: ${weather.wind.speed}mph`
  }
}
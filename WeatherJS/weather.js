class Weather {
  constructor(city, state) {
    this.apiKey = 'd0ab68208095995cbe672cf9426c686a';
    this.city = city;
    this.state = state;
  }

  // fetch weather from API
  async getWeather() {
    const res = fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state},us&appid=${this.apiKey}`);

    const responseData = (await res).json();

    return responseData;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
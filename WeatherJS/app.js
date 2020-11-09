// Instantiate weather object
const weather = new Weather('Charlotte','NC');

weather.getWeather()
  .then(data => {
    console.log(data);
  })
  .catch(err => console.log(err));
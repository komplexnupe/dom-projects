// Instantiate weather object
const weather = new Weather('Charlotte','NC');
// Instantia
const ui = new UI();
// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// weather.changeLocation('Miami', 'FL')

function getWeather(){
weather.getWeather()
  .then(data => {
    // console.log(data.name);
    ui.paintUI(data)
  })
  .catch(err => console.log(err));
}
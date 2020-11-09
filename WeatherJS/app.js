// Instantiate local storage
const storage = new Storage();
// get storage location data
const weatherLocation = storage.getLocationData();

// Instantiate weather object
const weather = new Weather(weatherLocation.city,weatherLocation.state);
// Instantia
const ui = new UI();
// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location Event
document.getElementById('w-changeBtn').addEventListener('click', (e) => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  weather.changeLocation(city, state);

  // Set location in LS
storage.setLocationData(city,state);
  // Get weather and display
  getWeather();

  // Close Modal
  $('#locModal').modal('hide');

})

function getWeather(){
weather.getWeather()
  .then(data => {
    // console.log(data.name);
    ui.paintUI(data)
  })
  .catch(err => console.log(err));
}
$('.searchBtn').on('click', function(e){
  var text = $('.textBox').val();
  console.log(text);

  var apiKey = 'a117bd3438c59731d79d48ddad0a6a5e';

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ text +'&appid='+ apiKey, {
  method: 'GET', //GET is the default.
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    console.log(data.main.temp);

    var lat = data.coord.lat;
    var lon = data.coord.lon;

    //2nd API call with lat and lon
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon=' +lon+ '&appid='+ apiKey, {
      method: 'GET', //GET is the default.
      credentials: 'same-origin', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
    })
      .then(function (uvResponse) {
        return uvResponse.json();
      })
      .then(function (e) {
        console.log(e.current.uvi)
        
      });
  });
});

if (localStorage.getItem('weatherInfo')) {
  var weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))
} else{
  var weatherInfo = []
}


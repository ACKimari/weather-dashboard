$('.searchBtn').on('click', function(e){
  var text = $('.textBox').val();
  console.log(text);

  var apiKey = 'a117bd3438c59731d79d48ddad0a6a5e';

  fetch('https://api.openweathermap.org/data/2.5/weather?q='+ text +'&appid='+ apiKey, {
  method: 'GET', 
  credentials: 'same-origin', 
  redirect: 'follow', 
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
      method: 'GET', 
      credentials: 'same-origin', 
      redirect: 'follow', 
    })
      .then(function (uvResponse) {
        return uvResponse.json();
      })
      .then(function (e) {
        console.log(e.current.uvi)
      
        fetch('api.openweathermap.org/data/2.5/forecast?q='+text+'&appid='+ apiKey,{
          method: 'GET', 
          credentials: 'same-origin', 
          redirect: 'follow',
        })
        
        .then(function (fiveDaytemp) {
          return fiveDaytemp.json();
        })
        .then(function (fiveDay) {
          console.log(fiveDay)
         
          var newObject = {
            date: [fiveDay.list[0].dt_txt, fiveDay.list[8].dt_txt, fiveDay.list[16].dt_txt, fiveDay.list[24].dt_txt, fiveDay.list[32].dt_txt, fiveDay.list[40].dt_txt,],
            name: data.name,
            icon: [fiveDay.list[0].weather[0].icon, fiveDay.list[8].weather[0].icon, fiveDay.list[16].weather[0].icon, fiveDay.list[24].weather[0].icon, fiveDay.list[32].weather[0].icon, fiveDay.list[40].weather[0].icon],
            temp: data.main.temp,
            wind: data.wind.speed,
            humidity: data.main.humidity,
            uvindex: e.current.uvi,
          };
          weatherInfo.push(newObject);
          localStorage.setItem('weatherInfo', JSON.stringify(weatherInfo));
          console.log(newObject)
        })

      });
  });
});

if (localStorage.getItem('weatherInfo')) {
  var weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))
} else{
  var weatherInfo = []
}


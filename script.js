$('.searchBtn').on('click', function (e) {
  var text = $('.textBox').val();
  console.log(text);

  var apiKey = 'a117bd3438c59731d79d48ddad0a6a5e';

  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + text + '&appid=' + apiKey, {
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
      fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
      })
        .then(function (uvResponse) {
          return uvResponse.json();
        })
        .then(function (e) {
          console.log(e.current.uvi)

          fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + text + '&appid=' + apiKey, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
          })

            .then(function (fiveDaytemp) {
              return fiveDaytemp.json();
            })
            .then(function (fiveDay) {
              console.log(fiveDay.list)

              var newObject = {
                date: [fiveDay.list[0].dt_txt, fiveDay.list[8].dt_txt, fiveDay.list[16].dt_txt, fiveDay.list[24].dt_txt, fiveDay.list[32].dt_txt, fiveDay.list[39].dt_txt],
                name: data.name,
                icon: [fiveDay.list[0].weather[0].icon, fiveDay.list[8].weather[0].icon, fiveDay.list[16].weather[0].icon, fiveDay.list[24].weather[0].icon, fiveDay.list[32].weather[0].icon, fiveDay.list[39].weather[0].icon],
                temp: [fiveDay.list[0].main.temp - 273.15, fiveDay.list[8].main.temp - 273.15, fiveDay.list[16].main.temp - 273.15, fiveDay.list[24].main.temp - 273.15, fiveDay.list[32].main.temp - 273.15, fiveDay.list[39].main.temp - 273.15],
                wind: [fiveDay.list[0].wind.speed, fiveDay.list[8].wind.speed, fiveDay.list[16].wind.speed, fiveDay.list[24].wind.speed, fiveDay.list[32].wind.speed, fiveDay.list[39].wind.speed],
                humidity: [fiveDay.list[0].main.humidity, fiveDay.list[8].main.humidity, fiveDay.list[16].main.humidity, fiveDay.list[24].main.humidity, fiveDay.list[32].main.humidity, fiveDay.list[39].main.humidity],
                uvindex: e.current.uvi,
              };
              weatherInfo.push(newObject);
              localStorage.setItem('weatherInfo', JSON.stringify(weatherInfo));
              console.log(newObject);
              renderSingleTxt();

              displayCurrentWeather(newObject);
            })

        });
    });
});

if (localStorage.getItem('weatherInfo')) {
  var weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))
} else {
  var weatherInfo = []
}

function displayCurrentWeather(weatherAttributes) {
  var iconurl = "http://openweathermap.org/img/w/" + weatherAttributes.icon[0] + ".png";

  $('#place').text(weatherAttributes.name);
  $('#icon').attr("src", iconurl);
  $('#date').text("Date: " + weatherAttributes.date[0]);
  $('#temp').text("Temp: " + weatherAttributes.temp[0].toFixed(2));
  $('#wind').text("Wind Speed: " + weatherAttributes.wind[0]);
  $('#humidity').text("Humidity: " + weatherAttributes.humidity[0]);
  $('#uvindex').text("UV Index: " + weatherAttributes.uvindex);

  var iconurl = "http://openweathermap.org/img/w/" + weatherAttributes.icon[1] + ".png";

  $('#icon1').attr("src", iconurl);
  $('#date1').text("Date: " + weatherAttributes.date[1]);
  $('#temp1').text("Temp: " + weatherAttributes.temp[1].toFixed(2));
  $('#wind1').text("Wind Speed: " + weatherAttributes.wind[1]);
  $('#humidity1').text("Humidity: " + weatherAttributes.humidity[1]);

  var iconurl = "http://openweathermap.org/img/w/" + weatherAttributes.icon[2] + ".png";

  $('#icon2').attr("src", iconurl);
  $('#date2').text("Date: " + weatherAttributes.date[2]);
  $('#temp2').text("Temp: " + weatherAttributes.temp[2].toFixed(2));
  $('#wind2').text("Wind Speed: " + weatherAttributes.wind[2]);
  $('#humidity2').text("Humidity: " + weatherAttributes.humidity[2]);

  var iconurl = "http://openweathermap.org/img/w/" + weatherAttributes.icon[3] + ".png";

  $('#icon3').attr("src", iconurl);
  $('#date3').text("Date: " + weatherAttributes.date[3]);
  $('#temp3').text("Temp: " + weatherAttributes.temp[3].toFixed(2));
  $('#wind3').text("Wind Speed: " + weatherAttributes.wind[3]);
  $('#humidity3').text("Humidity: " + weatherAttributes.humidity[3]);

  var iconurl = "http://openweathermap.org/img/w/" + weatherAttributes.icon[4] + ".png";

  $('#icon4').attr("src", iconurl);
  $('#date4').text("Date: " + weatherAttributes.date[4]);
  $('#temp4').text("Temp: " + weatherAttributes.temp[4].toFixed(2));
  $('#wind4').text("Wind Speed: " + weatherAttributes.wind[4]);
  $('#humidity4').text("Humidity: " + weatherAttributes.humidity[4]);

  var iconurl = "http://openweathermap.org/img/w/" + weatherAttributes.icon[5] + ".png";

  $('#icon5').attr("src", iconurl);
  $('#date5').text("Date: " + weatherAttributes.date[5]);
  $('#temp5').text("Temp: " + weatherAttributes.temp[5].toFixed(2));
  $('#wind5').text("Wind Speed: " + weatherAttributes.wind[5]);
  $('#humidity5').text("Humidity: " + weatherAttributes.humidity[5]);
};

function renderHistoryBtn() {
  if (localStorage.getItem('weatherInfo')) {
    var weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))
    for (let i = 0; i < weatherInfo.length; i++) {
      var newBtn = $('<button>');
      newBtn.html(weatherInfo[i].name);
      $("#renderHist").append(newBtn);
    };
  };
  // $('#renderHist').on('click', function (event) {
  //   console.log('render Hist');
  //   var x = event.target;
  //   document.getElementById("place").innerHTML = x.tagName
  // });
};

function renderSingleTxt() {
  if (localStorage.getItem('weatherInfo')) {
    var weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))

    var newBtn = $('<button>');
    newBtn.html(weatherInfo[weatherInfo.length - 1].name);
    $("#renderHist").append(newBtn);

  };
};

renderHistoryBtn();
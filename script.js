fetch("https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "8f83ed2350mshefb6e0b519c53cbp14ec1fjsndff0ae398f6f",
		"x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com"
	}
})
.then(function (response){
  return response.json();
})
.then(function (data){
  console.log(data);
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

function WeatherForecastWidget(selector) {

  //Initialize the widget using the container parameters
  this.config={
      "location":selector.attr("data-location"),
      "unitGroup":selector.attr("data-unitGroup") || "us",
      "key": selector.attr("data-key") 
  }

  
  //the root HTML tag selector
  this.selector=selector;

  //weather forecasta data
  this.data=null;

  var me=this;
  //constructs Weather API request and then loads the weather forecast data from the Weather API
  this.loadForecastData=function() {
     ...
  }

  //displays the weather data inside the container tag
  this.refresh=function() {
     ...
  }
}
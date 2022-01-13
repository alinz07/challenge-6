var searchFormEl = document.getElementById("citySearchForm");
var cityDivEl = document.getElementById("cityHistoryDiv");

var cityList = [];

var saveCity = function () {
    localStorage.setItem("cities", JSON.stringify(cityList));
}

var loadCities = function () {

    //already proven cityList is indeed an array object
    var loadedList = JSON.parse(localStorage.getItem("cities"));

    for (var i =0; i<loadedList.length; i++) {
        //recreate cityList array from localstorage
        cityList.push(loadedList[i]);

        populateButtons(loadedList[i]);

    }
}

var populateButtons = function(citay) {

    var newButton = document.createElement("button");

    //add button text and styles
    newButton.className = "col-12 mybtn"
    newButton.innerText=citay;

    //append button to make visible and use
    cityDivEl.appendChild(newButton);
}

var createNewCityButton = function(city) {
    
    if (cityList.includes(city)) {
        return;
    }
    else {

        //add city input to array
        cityList.push(city);
        saveCity();

        //add button with new city
        populateButtons(city);
    }
};

var getLongLat = function (event) {

    event.preventDefault();

    var cityInputEl = document.querySelector("#city");
    var city = cityInputEl.value.trim();
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e6f7edaba6b949091a1ea142d0fa74fe";

    //console.log(apiUrl);

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    accessOpenWeather(lat, lon, city);
                    createNewCityButton(city);
                });
            }
            else {
                alert("Error: Api response not okay. Make sure it's a valid city with data from Open Weather");
            } 
        })
        .catch(function(error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            alert(error);
        });
}

var HistGetLongLat = function(event) {

    var city = event.target.innerText;
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e6f7edaba6b949091a1ea142d0fa74fe";

    //console.log(apiUrl);

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    accessOpenWeather(lat, lon, city);
                    createNewCityButton(city);
                });
            }
            else {
                alert("Error: Api response not okay. Make sure it's a valid city with data from Open Weather");
            } 
        })
        .catch(function(error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            alert(error);
        });
    
}

var accessOpenWeather = function (lat, lon, city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=e6f7edaba6b949091a1ea142d0fa74fe";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    currentWeatherLoad(data,city);
                });
            }
            else {
                alert("Error: unable to connect to Open Weather");
            } 
        })
        .catch(function(error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            alert("Unable to connect to Open Weather");
        });
};

var currentWeatherLoad = function(data,city) {
    //dynamically update the html of #current-weather
    var sectionElH2 = document.querySelector("#current-weather").firstElementChild;
    var iconUrl = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
    sectionElH2.innerHTML = city + " " + moment().format("(l)") + "<img src='" + iconUrl + "'/>";

    var dataDiv = document.getElementById("weather-data");
    dataDiv.innerHTML = "Temp: " + data.current.temp + "<br/> <br/> Wind: " + data.current.wind_speed + "<br/> <br/> Humidity: " + data.current.humidity + "%" + "<br/> <br/> UV Index: " + "<div>" + data.current.uvi + "</div>";

    var fiveDaySection = document.getElementById("5-day");
    fiveDaySection.innerText = "5-Day Forecast";
    var forecast = document.createElement("div");
    forecast.className = "row justify-content-between";
    fiveDaySection.appendChild(forecast);

    for (var i=0; i<5; i++) {

        //create a card to put tomorrow's data in
        var dayCard = document.createElement("div");

        //add a class to that div to make it a card and make mobilly responsive so 
        //that it takes up 20% of #5-day section until md screen when it goes to 100&
        dayCard.className = "card col-12 col-md-2";

        //add a list to the div
        var forecastUl = document.createElement("ul");
        forecastUl.className="list-group list-group-flush"
        dayCard.appendChild(forecastUl);

        //add day li element to the ul
        var forecastDayLi = document.createElement("li");
        forecastDayLi.className = "list-group-item"
        forecastDayLi.innerHTML = moment().add((1+i), 'd').format("l");
        forecastUl.appendChild(forecastDayLi);

        //add the weather icon
        var forecastIconLi = document.createElement("li");
        forecastIconLi.className = "list-group-item"
        forecastIconLi.innerHTML = "<img src='http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png' />";
        forecastUl.appendChild(forecastIconLi);

        //add the temp
        var forecastTempLi = document.createElement("li");
        forecastTempLi.className = "list-group-item"
        forecastTempLi.innerHTML = "Temp: " + data.daily[i].temp.max;
        forecastUl.appendChild(forecastTempLi);

        //add the windspeed
        var forecastWindLi = document.createElement("li");
        forecastWindLi.className = "list-group-item"
        forecastWindLi.innerHTML = "Wind: " + data.daily[i].wind_speed;
        forecastUl.appendChild(forecastWindLi);

        //add the humidity
        var forecastHumLi = document.createElement("li");
        forecastHumLi.className = "list-group-item"
        forecastHumLi.innerHTML = "Humidty: " + data.daily[i].humidity;
        forecastUl.appendChild(forecastHumLi);

        //append card to forecast div
        forecast.appendChild(dayCard);
    }

}

searchFormEl.addEventListener('submit', getLongLat);

cityDivEl.addEventListener('click', HistGetLongLat)

loadCities();


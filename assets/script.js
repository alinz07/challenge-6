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
    newButton.className = "col-12"
    newButton.innerText=citay;

    //append button to make visible and use
    cityDivEl.appendChild(newButton);
}

var createNewCityButton = function(city) {
    

    if (cityList.includes(city)) {
        currentWeatherLoad(city);
    }
    else {

        //add city input to array
        cityList.push(city);
        saveCity();

        //display city info in current weather div
        currentWeatherLoad(city);

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
                });
            }
            else {
                alert("Error: Response not okay");
            } 
        })
        .catch(function(error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            alert(error);
        });

    createNewCityButton(city);
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
                alert("Error: GitHub User Not Found");
            } 
        })
        .catch(function(error) {
            //notice this '.catch()' getting chained onto the end of the '.then()' method
            alert("Unable to connect to GitHub");
        });
};

var currentWeatherLoad = function(data,city) {
    //dynamically update the html of #current-weather
    var sectionElH2 = document.querySelector("#current-weather").firstElementChild;
    sectionElH2.innerHTML = city + " " + moment().format("(l)"); //+ cloudIcon;

    console.log(data.current.uvi);

    var dataDiv = document.getElementById("weather-data");
    dataDiv.innerHTML = "Temp: " + data.current.temp + "<br/> <br/> Wind: " + data.current.wind_speed + "<br/> <br/> Humidity: " + data.current.humidity + "%" + "<br/> <br/> UV Index: " + "<div>" + data.current.uvi + "</div>";
}

searchFormEl.addEventListener('submit', getLongLat);

loadCities();


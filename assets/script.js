var searchFormEl = document.getElementById("citySearchForm");
var cityDivEl = document.getElementById("cityHistoryDiv");

var cityList = [];

var accessOpenWeather = function (lat, lon) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=e6f7edaba6b949091a1ea142d0fa74fe";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
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

var getLongLat = function (event) {

    event.preventDefault();

    var cityInputEl = document.querySelector("#city");
    var city = cityInputEl.value.trim();
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e6f7edaba6b949091a1ea142d0fa74fe";

    console.log(apiUrl);

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
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

    createNewCityButton(city);
    
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

var currentWeatherLoad = function(city) {
    //use ajax to dynamically update the html
    console.log("will load weather for " + city);
}

//accessOpenWeather(46.60, -122.33);

searchFormEl.addEventListener('submit', getLongLat);

loadCities();







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

accessOpenWeather(46.60, -122.33);
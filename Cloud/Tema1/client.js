function getWeatherInfo() {
    var xhr = new XMLHttpRequest();
    var location = document.getElementById("location").value;
    xhr.onreadystatechange = function () {
        console.log(xhr);
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.cod == "404") {
                document.getElementById("weather").innerHTML = capitalizeFirstLetter(response.message);
                document.getElementById("temp").innerHTML = "";
                document.getElementById("temp_max").innerHTML = "";
                document.getElementById("temp_min").innerHTML = "";
                document.getElementById("humidity").innerHTML = "";
            }
            else {
                var weather_state = response.weather[0].main;
                var temp_max = response.main.temp_max;
                var temp_min = response.main.temp_min;
                var humidity = response.main.humidity;
                var temp = response.main.temp;
                document.getElementById("weather").innerHTML = "Stare curenta :" + weather_state;
                document.getElementById("temp").innerHTML = "Temperatura :" + (temp - 273).toFixed(2);
                document.getElementById("temp_max").innerHTML = "Temperatura maxima :" + (temp_max - 273).toFixed(2);
                document.getElementById("temp_min").innerHTML = "Temperatura minima :" + (temp_min - 273).toFixed(2);
                document.getElementById("humidity").innerHTML = "Umiditate :" + humidity;
            }
        }
    }
    xhr.open('GET', 'http://localhost:3001/getWeatherInfo?location=' + location, true);
    xhr.send();
}

function getTimeInfo() {
    var xhr = new XMLHttpRequest();
    var location = document.getElementById("second-location").value;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response.meta.code);
            if (response.meta.code == "401" || response.meta.code == "404") {
                document.getElementById("time").innerHTML = response.meta.message;
            }
            else {
                document.getElementById("time").innerHTML = response.data.datetime.date_time_txt;
            }
        }
    }
    xhr.open('GET', 'http://localhost:3001/getTimeInfo?location=' + location, true);
    xhr.send();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getMetrics()
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
           console.log(xhr.responseText.split('\n'));
           var logs =xhr.responseText.split('\n');
           document.body.style.backgroundImage ="";
           logs.forEach(log => {
            document.getElementById("metrics").innerHTML  =document.getElementById("metrics").innerHTML + log + " <br>";
           });
        }
    }
    xhr.open('GET', 'http://localhost:3001/getMetrics', true);
    xhr.send();
}

function getImage()
{   
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            document.body.style.backgroundImage ="url(" + response+")";
            document.getElementById("metrics").innerHTML="";
        }
    }
    xhr.open('GET', 'http://localhost:3001/getImage', true);
    xhr.send();
}
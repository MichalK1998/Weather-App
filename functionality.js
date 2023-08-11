const apiKey = "182caf401390c5881fadb6e16719b185";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchInput = document.querySelector('.searchText input');
let searchButton = document.querySelector('.searchbutton button');
let weatherIMG = document.querySelector('.mainContentIMG img');

async function uploadWeather(city) {

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.container').style.height = "auto";
        document.querySelector('.error').style.display = "block";
        document.querySelector('.mainContent').style.display = "none";
        document.querySelector('.additionalInformation').style.display = "none";
    }
    else {
        let data = await response.json();

        document.querySelector('.mainContentDestination').innerHTML = data.name;
        document.querySelector('.mainContentTemperature').innerHTML = Math.round(data.main.temp) + "℃";
        document.querySelector('.humidity p').innerHTML = data.main.humidity + "%";
        document.querySelector('.windSpeed p').innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clear") {
            weatherIMG.src = "img/sun.png";
        }
        else if (data.weather[0].main == "Clouds") {
            weatherIMG.src = "img/cloudy.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIMG.src = "img/mist.png";
        }
        else if (data.weather[0].main == "Rain" || data.weather[0].main == "Drizzle") {
            weatherIMG.src = "img/raining.png";
        }
      
        document.querySelector('.mainContent').style.display = "block";
        document.querySelector('.additionalInformation').style.display = "flex";
        document.querySelector('.container').style.height = "540px";
        document.querySelector('.error').style.display = "none";
        document.querySelector('.searchText input').value = "";
        
    }

  
}

searchButton.addEventListener("click", function () {
    uploadWeather(searchInput.value);
})

uploadWeather();
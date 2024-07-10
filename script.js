document.addEventListener('DOMContentLoaded', () => {
    getUserLocationWeather();
});

function getUserLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        }, error => {
            console.error('Error getting location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function getWeatherByCoordinates(lat, lon) {
    const apiKey = 'd4b7ba56a168d492a206c92494e5490d';
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(currentWeatherUrl).then(response => response.json()).then(data => {
        displayWeather(data);
    }).catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastUrl).then(response => response.json()).then(data => {
        displayHourlyForecast(data.list, data.city.timezone);
    }).catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
    });
}

function getWeather() {
    const apiKey = 'd4b7ba56a168d492a206c92494e5490d';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter city name');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl).then(response => response.json()).then(data => {
        displayWeather(data);
    }).catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });

    fetch(forecastUrl).then(response => response.json()).then(data => {
        displayHourlyForecast(data.list, data.city.timezone);
    }).catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
    });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    tempDivInfo.innerHTML = '';
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const city = data.name;
        const temp = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const windSpeed = Math.round((data.wind.speed *3.6).toFixed(2));
        const humidity = data.main.humidity;

        const tempHTML = `<p>${temp}°C</p>`;
        const weatherHTML = `
            <p class="city">${city}</p>
            <p>${description}</p>
            <div class="details">
                <div>
                    <p class="wind"><i class="fa fa-wind"></i>${windSpeed} km/h</p>
                    <p>Windspeed</p>
                </div>
                <div>
                    <p class="humidity"><i class="fa fa-tint"></i>${humidity}%</p>
                    <p>Humidity</p>
                </div>
            </div>
        `;

        tempDivInfo.innerHTML = tempHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData, timeZoneOffset) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);
    
    hourlyForecastDiv.innerHTML = '';

    next24Hours.forEach(item => {
        const time = new Date((item.dt + timeZoneOffset) * 1000);
        const hour = time.getUTCHours();
        const temp = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const hourlyItemHTML = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly weather icon">
                <span>${temp}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

    //  const apiKey = "d4b7ba56a168d492a206c92494e5490d";
    //  const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    //  const searchBar = document.querySelector(".search input");
    //  const searchBtn = document.querySelector(".search button");

    //  async function weatherCheck(city) {
    //      const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    //      var data = await response.json();
        
    //      console.log(data)
        
    //      document.querySelector(".city").innerHTML = data.name;
    //      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    //  }

    //  searchBtn.addEventListener("click", ()=> {
    //      weatherCheck(searchBar.value);
    //  });
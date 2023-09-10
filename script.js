const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastApiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
const apiKey = '3b8e920830f57915af0f208ab3e17f32'; // Replace with your OpenWeatherMap API key

function updateWeather(latitude, longitude) {
    const weatherUrl = `${weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    // Fetch current weather data
    fetch(weatherUrl)
        .then((response) => response.json())
        .then((data) => {
            // Update the weather section with the current weather data
            const locationElement = document.querySelector('.location');
            locationElement.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">
                <p>${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            document.querySelector('.weather').innerHTML = 'Could not fetch weather data.';
        });
}

function updateForecast(latitude, longitude) {
    const forecastUrl = `${forecastApiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    // Fetch 7-day forecast data
    fetch(forecastUrl)
        .then((response) => response.json())
        .then((data) => {
            // Process and display the 7-day forecast data
            const forecastInfo = '<div class="forecast">'; // You need to format the forecast data here
            document.querySelector('.forecast').innerHTML = forecastInfo;
        })
        .catch((error) => {
            console.error('Error fetching forecast data:', error);
            document.querySelector('.forecast').innerHTML = 'Could not fetch forecast data.';
        });
}

function updateLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Update the location
            updateWeather(latitude, longitude);
            updateForecast(latitude, longitude);

            // Fetch and display current time
            const timeElement = document.querySelector('.time');
            const currentTime = new Date();
            timeElement.textContent = `Current Time: ${currentTime.toLocaleTimeString()}`;
        }, (error) => {
            console.error('Error getting location:', error);
            document.querySelector('.location').innerHTML = 'Could not retrieve your location.';
        });
    } else {
        document.querySelector('.location').innerHTML = 'Geolocation is not supported by your browser.';
    }
}

// Call updateLocation to initialize the app
updateLocation();

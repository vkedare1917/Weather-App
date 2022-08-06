const cityInput = document.getElementById("city-input");
const cityName = document.querySelector(".city-name");
const weatherImg = document.querySelector(".weather-img");
const feelsLike = document.querySelector(".feels-like");
const submitData = document.getElementById("submit-data");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const showMinTemp = document.querySelector(".min-temp"); 
const showMaxTemp = document.querySelector(".max-temp"); 

submitData.addEventListener("click", () => {
   displayData(cityInput.value);
});

async function displayData(city) {
   // Fetching data from API
   const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cad7ec124945dcfff04e457e76760d90`);
   const responseData = await data.json();  

   // City
   cityName.textContent = responseData.name;
   
   // Icon
   weatherImg.src = `https://openweathermap.org/img/wn/${responseData.weather[0].icon}.png`;

   // Description
   feelsLike.textContent = responseData.weather[0].description;
   
   // Temperature
   let temperatureData = responseData.main.temp;
   temperatureData -= 273.15;
   temperature.textContent = `Temperature: ${Math.round(temperatureData)} °C`;
   
   // Min/Max Temperature
   let minTemperature = responseData.main.temp_min;
   let maxTemperature = responseData.main.temp_max;
   minTemperature -= 273.15;
   maxTemperature -= 273.15;
   showMinTemp.textContent = `Min-Temp: ${minTemperature.toFixed(2)} °C`;
   showMaxTemp.textContent = `Max-Temp: ${maxTemperature.toFixed(2)} °C`;

   // Humidity
   humidity.textContent = `Humidity: ${responseData.main.humidity}%`;

   cityInput.value = "";
}

// On Pressing Enter Key
cityInput.addEventListener("keyup", (e) => {
   if(e.key == "Enter") {
      displayData(cityInput.value);
   }
});

// Default City Weather
displayData("mumbai");

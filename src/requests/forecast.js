const axios = require("axios");

const WEATHER_API_URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 3;

const fetchForecast = async (location) => {
  try {
    return await axios({
      url: WEATHER_API_URL,
      method: "get",
      params: {
        q: location,
        days: FORECAST_DAYS,
        key: process.env.WEATHER_API_KEY,
      },
      responseType: "json",
    }).then((res) => {
      const city = res.data.location.name;
      const region = res.data.location.region;
      const country = res.data.location.country;
      const locationName = `${city}, ${region}, ${country}`;
      const weatherData = res.data.forecast.forecastday.map((forecastDay) => {
        return {
          date: forecastDay.date,
          minTemp_C: forecastDay.day.mintemp_c,
          maxTemp_C: forecastDay.day.maxtemp_c,
          minTemp_F: forecastDay.day.mintemp_f,
          maxTemp_F: forecastDay.day.maxtemp_f,
        };
      });

      return { locationName, weatherData };
    });
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching ${locationName} forecast data`);
  }
};

module.exports = {
  fetchForecast,
};

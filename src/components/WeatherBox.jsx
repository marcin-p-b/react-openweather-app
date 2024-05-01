import React from "react";
import { FaWater, FaWind } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function WeatherBox({ weatherData = " " }) {
  //Display image according to the current weather condition
  let image = "";
  switch (weatherData.weather[0].main) {
    case "Clear":
      image = "src/assets/clear.png";
      break;

    case "Rain":
      image = "src/assets/rain.png";
      break;

    case "Snow":
      image = "src/assets/snow.png";
      break;

    case "Clouds":
      image = "src/assets/cloud.png";
      break;

    case "Haze":
      image = "src/assets/mist.png";
      break;

    default:
      image = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      break;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="weather-box">
        <img src={image} />
        <p className="temperature">
          {Math.floor(weatherData.main.temp - 272.15)}
          <span>°C</span>
        </p>
        <p className="description">{weatherData.weather[0].description}</p>
      </div>
      <div className="weather-details">
        <div className="humidity">
          <FaWater className="icon" />
          <div className="text">
            <span>{weatherData.main.humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="wind">
          <FaWind className="icon" />
          <div className="text">
            <span>{weatherData.wind.speed.toFixed(1)}Km/h</span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import React, { useState } from "react";
import ErrorBox from "./ErrorBox";
import WeatherBox from "./WeatherBox";
import { motion } from "framer-motion";
import SearchBox from "./SearchBox";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

function WeatherCard() {
  const [city, setCity] = useState();
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  //Fetch current weather forecast from OpenWeather API and store data as a state
  async function fetchData(q) {
    await fetch(`${VITE_API_URL}/weather?${q}&appid=${VITE_API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }

  //Fetch current weather forecast based on given user input
  function handleMagniClick() {
    fetchData(`q=${city}`);
  }

  //Fetch current weather forecast based on geolocation (works only after localization permition was given for the website)
  function handlePinClick() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
    // console.log("Latitude is:", lat);
    // console.log("Longitude is:", long);
    fetchData(`lat=${lat}&lon=${long}`);
  }

  //Storing user input as a state value
  function handleChange(e) {
    setCity(e.target.value);
    if (e.target.value === "") {
      setCity("");
    }
  }

  return (
    <>
      <div className="bg-image"></div>
      <motion.div
        className="container"
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        variants={{
          initialState: {
            opacity: 0,
            scale: 0,
          },
          animateState: {
            opacity: 1,
            scale: 1,
          },
          exitState: {
            opacity: 0,
          },
        }}
      >
        <SearchBox
          weatherData={data}
          handlePinClick={handlePinClick}
          handleChange={handleChange}
          handleMagniClick={handleMagniClick}
          city={city}
        />

        {data.cod !== "404" && data.cod !== "400" ? (
          <>
            {typeof data.main != "undefined" ? (
              <WeatherBox className="fadeIn" weatherData={data} />
            ) : (
              <div></div>
            )}
          </>
        ) : (
          <ErrorBox />
        )}
      </motion.div>
    </>
  );
}

export default WeatherCard;

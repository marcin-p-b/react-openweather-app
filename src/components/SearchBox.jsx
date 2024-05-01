import React from "react";
import { FaLocationDot, FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBox({
  weatherData,
  handlePinClick,
  handleChange,
  handleMagniClick,
  city,
}) {
  return (
    <div className="search-box">
      <FaLocationDot className="location-dot" onClick={handlePinClick} />
      <input
        type="text"
        placeholder={
          weatherData.name !== undefined
            ? weatherData.name
            : city === undefined
            ? "Enter Your Location"
            : city
        }
        onChange={handleChange}
        onClick={(e) => (e.target.value = "")}
      />
      <button onClick={handleMagniClick}>
        <FaMagnifyingGlass className="magniglass" />
      </button>
    </div>
  );
}

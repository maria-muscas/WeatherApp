import React from "react";
import "./CurrentForecast.css";

const CurrentForecast = ({ dt, val, func, favCities }) => {
  //destructure the obj passed as props
  const currentDay = dt?.forecast?.forecastday[0];
  const { current, location } = dt;
  const txt = current?.condition?.text;

  // to not import each img separately -> require context to dynamically load all components from a directory
  const assets = require.context("../assets", true);
  //.keys()  to get an array of module names
  const images = assets.keys();
  let bgImage = "";

  //--weather conditions are various --- i've tried to group them in order to set a right background
  images.forEach((image) => {
    const img = assets(image);
    if (txt?.toLowerCase().includes("snow") && img?.includes("snow")) {
      bgImage = `url(${img})`;
    } else if (
      txt?.toLowerCase().includes("cloudy") &&
      img?.includes("cloudy")
    ) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("sunny") && img?.includes("sunny")) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("clear") && img?.includes("clear")) {
      bgImage = `url(${img})`;
    } else if (
      txt?.toLowerCase().includes("overcast") &&
      img?.includes("overcast")
    ) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("mist") && img?.includes("mist")) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("fog") && img?.includes("fog")) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("rain") && img?.includes("rainy")) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("snow") && img?.includes("snow")) {
      bgImage = `url(${img})`;
    } else if (txt?.toLowerCase().includes("sleet") && img?.includes("sleet")) {
      bgImage = `url(${img})`;
    } else if (
      txt?.toLowerCase().includes("drizzle") &&
      img?.includes("drizzle")
    ) {
      bgImage = `url(${img})`;
    } else if (
      txt?.toLowerCase().includes("thunder") &&
      img?.includes("thunder")
    ) {
      bgImage = `url(${img})`;
    } else if (
      txt?.toLowerCase().includes("blizzard") &&
      img?.includes("blizzard")
    ) {
      bgImage = `url(${img})`;
    } else if (
      txt?.toLowerCase().includes("ice pellets") &&
      img?.includes("ice_pellets")
    ) {
      bgImage = `url(${img})`;
    }
  });

  return (
    <>
      <section
        className="forecast-main"
        style={{
          backgroundImage: bgImage,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="location">
          <div className="cityName">
            <i className="fa-solid fa-location-dot fa-beat"></i>
            <span>
              {" "}
              {location?.name}, {location?.country}
            </span>
          </div>
          <div className="fav">
            <i
              className={`${
                favCities && favCities[val]
                  ? "fa-solid fa-heart"
                  : "fa-regular fa-heart"
              }`}
              onClick={(e) => {
                func(val);
              }}
            ></i>
          </div>
        </div>
        <div className="weather-data">
          <img src={current?.condition?.icon} alt="weatherIcon" />
          <div className="weather-data-text">
            <p className="tempreture">{current?.temp_c}&#8451;</p>
            <p className="actual-data">
              Feels like {current?.feelslike_c}&#8451;,{" "}
              {current?.condition?.text}
            </p>
            <p className="min-max">
              MIN. {currentDay?.day?.mintemp_c}&#8451;- Max.{" "}
              {currentDay?.day?.maxtemp_c}&#8451;
            </p>
            <div className="icon-text">
              <div>
                <i className="fa-solid fa-droplet-slash fa-fade"></i>
                <br />
                <span>{current?.humidity}&#37;</span>
              </div>
              <div>
                <i className="fa-solid fa-wind fa-shake"></i>
                <br />
                <span>{current?.wind_kph} KM/H</span>
              </div>
              <div>
                <i className="fa-solid fa-compass fa-spin-pulse"></i>
                <br />
                <span>{current?.wind_dir}</span>
              </div>
            </div>
            <p className="time">{location?.localtime}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CurrentForecast;

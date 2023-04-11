import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import getData from "./data/data";
import CurrentForecast from "./components/CurrentForecast";
import DailyForecast from "./components/DailyForecast";
import HourlyForecast from "./components/HourlyForecast";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  window.onscroll = () => {
    navRef.current.classList.remove("responsive_nav");
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    setInputValue(cityName);
  };

  const getCurrentLocation = async () => {
    await axios
      .get("https://ipapi.co/json")
      .then((response) => setInputValue(response.data.city))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(inputValue);
      setWeatherData(data);
    };
    if (inputValue) {
      fetchData();
    }
  }, [inputValue]);

  const [favCities, setFavCities] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const toggleFavorite = (cityName) => {
    setFavCities((prevFavoriteCities) => {
      if (!prevFavoriteCities) {
        return {};
      }
      const isFavorite = prevFavoriteCities[cityName];
      const updatedFavoriteCities = { ...prevFavoriteCities };
      if (isFavorite) {
        delete updatedFavoriteCities[cityName];
      } else {
        updatedFavoriteCities[cityName] = true;
      }
      return updatedFavoriteCities;
    });
  };
  return (
    <>
      <header>
        <h1 className="title">
          Sky<span>Metrics</span>
        </h1>
        <nav className="btn-container" ref={navRef}>
          <button className="btn-weather">
            <a href="#hourly">Hourly Weather</a>
          </button>
          <button className="btn-weather">
            <a href="#daily">Weekly Weather</a>
          </button>
          <div
            className="dropdownContainer"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button className="btn-weather">Favorite Cities</button>
            {dropdown && (
              <div className="dropdownMenu">
                <ul>
                  {favCities &&
                    Object.keys(favCities).map((cityName) => (
                      <li
                        style={{ cursor: "pointer" }}
                        key={cityName}
                        onClick={() => {
                          setInputValue(cityName);
                          setCityName(cityName);
                        }}
                      >
                        {cityName}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
        <div className="hambInput">
          <button className="nav-btn" onClick={showNavbar}>
            <i className="fa-sharp fa-solid fa-bars"></i>
          </button>
          <form onSubmit={handleOnClick}>
            <div className="input-group">
              <input
                type="text"
                name="search"
                placeholder="Enter a city name..."
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <button type="submit" className="searchIcon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
      </header>

      <main className="mainSection">
        <section className="main-group">
          <div className="currentWeather">
            {inputValue && (
              <CurrentForecast
                dt={weatherData}
                val={inputValue}
                favCities={favCities}
                func={toggleFavorite}
              />
            )}
            <div id="hourly">
              {inputValue && <HourlyForecast dt={weatherData} />}
            </div>
            <div id="daily">
              {inputValue && <DailyForecast dt={weatherData} />}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footerDiv">
          <p>SkyMetrics &#64; 2023</p>
        </div>
      </footer>
    </>
  );
};

export default App;

import React from "react";
import "./DailyForecast.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuesday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DailyForecast = ({ dt }) => {
  //destructuring only the array (without the first day)
  const forecastData = dt?.forecast?.forecastday?.slice(1, 8);

  //return the number of the current day, strating  from 1
  const today = new Date().getDay();

  //forecastDays -  an array of days of the week starting from tomorrow
  const forecastDays = DAYS.slice(today, DAYS.length).concat(
    DAYS.slice(0, today)
  );

  return (
    <section>
      <div className="cont">
        <h2>7 Day Forecast</h2>
        <hr />
        <div className="info">
          {forecastData?.map((item, index) => {
            return (
              <div key={index}>
                <div className="dayInfo">
                  <p className="dayName">{forecastDays[index]}</p>
                  <div className="imgTemp">
                    <img src={item?.day?.condition?.icon} alt="icon" />
                    <p>
                      {item?.day?.mintemp_c}°C/{item?.day?.maxtemp_c}°C
                    </p>
                  </div>
                  <p className="cond">{item?.day?.condition?.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DailyForecast;

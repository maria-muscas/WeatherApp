import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import OneHour from "./OneHour";

const HourlyForecast = ({ dt }) => {
  //--extract the hour array for the first day
  const firstDay = dt?.forecast?.forecastday[0]?.hour;

  //--format the hour -> this function returns the time slot string for each index in the array
  const timeFormat = Array.from(
    { length: 24 },
    (_, index) =>
      `${index === 0 ? 12 : index > 12 ? index - 12 : index} ${
        index < 12 ? "AM" : "PM"
      }`
  );

  return (
    <section>
      <div className="cont">
        <h2>Hourly Weather</h2>
        <hr />
      </div>
      <div className="container">
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            400: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 6,
            },
            1280: {
              slidesPerView: 8,
            },
          }}
        >
          <div className="hourInfo">
            {firstDay?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <OneHour
                    hour={timeFormat[index]}
                    temp={item?.temp_c}
                    rain={item?.chance_of_rain}
                    icon={item?.condition?.icon}
                  />
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default HourlyForecast;

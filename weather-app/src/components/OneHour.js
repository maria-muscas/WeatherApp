import React from "react";
import "./OneHour.css";

const OneHour = ({ hour, icon, temp, rain }) => {
  return (
    <div className="cardInfo">
      <h3>{hour}</h3>
      <img src={icon} alt="iconImg" />
      <p>{temp}&#8451;</p>
      <i className="fa-solid fa-droplet"></i>
      <p>{rain}&#37;</p>
    </div>
  );
};

export default OneHour;

import React from "react";
import moment from "moment";

const Weather = (props) => {
  return (
    <div>
      {props.vars ? <h2>{moment.unix(props.date).format("lll")}</h2> : ""}
      <h1>{props.city}</h1>
      <h5>
        <i className={props.icon}></i>
      </h5>
      {props.temp ? <h1>{props.temp}&deg;C</h1> : ""}
      {props.feels ? <h3>Feels Like: {props.feels}&deg;C</h3> : ""}
      {!props.vars ? props.minmaxTemp(props.minTemp, props.maxTemp) : ""}
      <h1>{props.desc}</h1>
      {!props.vars ? (
        <div>
          <h3>Humidity: {props.humidity}%</h3>
          <h4>Sunrise: {moment.unix(props.sunrise).format("LT")}</h4>
          <h4>Sunset: {moment.unix(props.sunset).format("LT")}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Weather;

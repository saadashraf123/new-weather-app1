import moment from "moment";
import { Link } from "react-router-dom";

const Details = (props) => {
  const feels = (feel) => {
    const feelsAvg = (feel.day + feel.night + feel.morn + feel.eve) / 4;
    return feelsAvg;
  };

  const getIcon = (range) => {
    switch (true) {
      case range >= 200 && range <= 232:
        return "fas fa-bolt";

      case range >= 300 && range <= 321:
        return "fas fa-cloud-drizzle";

      case range >= 500 && range <= 531:
        return "fas fa-cloud-showers-heavy";

      case range >= 600 && range <= 622:
        return "fas fa-snowflake";

      case range >= 701 && range <= 781:
        return "fas fa-cloud";

      case range === 800:
        return "fas fa-cloud-sun";

      case range >= 800 && range <= 804:
        return "fas fa-cloud";
    }
  };
  return (
    <div>
      {props.taskDetails ? (
        <div>
          <h1>{props.city}</h1>
          <h3>Date: {moment.unix(props.taskDetails.dt).format("LL")}</h3>
          <h5>
            <i className={getIcon(props.taskDetails.weather[0].id)}></i>
          </h5>
          <h3>Temp: {props.conversion(props.taskDetails.temp.day)}&deg;C</h3>
          <h2>Description: {props.taskDetails.weather[0].description}</h2>
          {props.minmaxTemp(
            props.conversion(props.taskDetails.temp.min),
            props.conversion(props.taskDetails.temp.max)
          )}
          <h3>
            Feels Like: {props.conversion(feels(props.taskDetails.feels_like))}
            &deg;
          </h3>
          <h3>Humidity: {props.taskDetails.humidity}%</h3>
          <h3>
            Dew Point:{" "}
            {props.taskDetails.dew_point > 273
              ? props.conversion(props.taskDetails.dew_point)
              : 0}
            &deg;
          </h3>
          <h3>Wind Speed: {props.taskDetails.wind_speed} km/hr</h3>
          <h4>
            Sunrise: {moment.unix(props.taskDetails.sunrise).format("LT")}
          </h4>
          <h4>Sunset: {moment.unix(props.taskDetails.sunset).format("LT")}</h4>
        </div>
      ) : (
        "Something Went Wrong....."
      )}
      <br />
      <Link className="btn" to="/new-weather-app">
        go Back to Previous Page
      </Link>
    </div>
  );
};

export default Details;

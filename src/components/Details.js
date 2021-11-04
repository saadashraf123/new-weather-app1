import moment from "moment";
import { Link } from "react-router-dom";
import { getIcon } from "../Utills/GetIcons";
import { useFetch } from "../Utills/useFetch";
import { minmaxTemp, feels } from "../Utills/Functions";

const Details = () => {
  const { city, taskDetails, conToCelcius } = useFetch();

  return (
    <div>
      {taskDetails ? (
        <div>
          <h1>{city}</h1>
          <h3>Date: {moment.unix(taskDetails.dt).format("LL")}</h3>
          <h5>
            <i className={getIcon(taskDetails.weather[0].id)}></i>
          </h5>
          <h3>Temp: {conToCelcius(taskDetails.temp.day)}&deg;C</h3>
          <h2>Description: {taskDetails.weather[0].description}</h2>
          {minmaxTemp(
            conToCelcius(taskDetails.temp.min),
            conToCelcius(taskDetails.temp.max)
          )}
          <h3>
            Feels Like: {conToCelcius(feels(taskDetails.feels_like))}
            &deg;
          </h3>
          <h3>Humidity: {taskDetails.humidity}%</h3>
          <h3>
            Dew Point:{" "}
            {taskDetails.dew_point > 273
              ? conToCelcius(taskDetails.dew_point)
              : 0}
            &deg;
          </h3>
          <h3>Wind Speed: {taskDetails.wind_speed} km/hr</h3>
          <h4>Sunrise: {moment.unix(taskDetails.sunrise).format("LT")}</h4>
          <h4>Sunset: {moment.unix(taskDetails.sunset).format("LT")}</h4>
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

import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import Weather from "../Weather/Weather";
import PostWeather from "../PostWeather/PostWeather";
import Details from "../Details/Details";
import Mode from "../Mode/Mode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const APIkey = "f28836b7dcdf328bc7bd5047a2a7e35a";

function Main(e) {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [icon, setIcon] = useState("");
  const [desc, setDesc] = useState("");
  const [feels, setFeels] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arr, setArray] = useState([]);
  const [inputs, setInputs] = useState("");
  const [mode, setMode] = useState(false);
  const [vars, setVars] = useState(false);

  const [taskDetails, setTaskDetails] = useState("");
  const [newIcon, setNewIcon] = useState("");

  useEffect(() => {
    defaultWeather();
  }, [!inputs]);

  const getDayDetails = (id) => {
    const detailed = arr[id + 1];
    setTaskDetails(detailed);
  };

  const defaultWeather = () => {
    if (!inputs) {
      navigator.geolocation.getCurrentPosition(function (position) {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly&appid=${APIkey}`
          )
          .then((response1) => {
            setLoading(false);
            setDate(response1.data.current.dt);
            setCity(response1.data.timezone);
            setTemp(conToCelcius(response1.data.current.temp));
            setFeels(conToCelcius(response1.data.current.feels_like));
            setDesc(response1.data.current.weather[0].description);
            getIcon(response1.data.current.weather[0].id);
            setVars(true);
          });
      });
      setInputs("hello");
    }
  };

  const getWeather = async (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.city.value;
    if (input) {
      setVars(false);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIkey}`
        )
        .then((response) => {
          setDate(response.data.dt);
          setCity(`${response.data.name}, ${response.data.sys.country}`);
          setTemp(conToCelcius(response.data.main.temp));
          setMinTemp(conToCelcius(response.data.main.temp_min));
          setMaxTemp(conToCelcius(response.data.main.temp_max));
          setFeels(conToCelcius(response.data.main.feels_like));
          setDesc(response.data.weather[0].description);
          getIcon(response.data.weather[0].id);

          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=minutely,hourly&appid=${APIkey}`
            )
            .then((responses) => {
              setArray(responses.data.daily);
              setDate(responses.data.current.dt);
              setHumidity(responses.data.current.humidity);
              setSunrise(responses.data.current.sunset);
              setSunset(responses.data.current.sunrise);
            });
        });
    } else {
      alert("Please Enter The City To Check The Weather");
    }
  };

  const getIcon = (range) => {
    switch (true) {
      case range >= 200 && range <= 232:
        setIcon("fas fa-bolt");
        break;

      case range >= 300 && range <= 321:
        setIcon("fas fa-cloud-drizzle");

        break;

      case range >= 500 && range <= 531:
        setIcon("fas fa-cloud-showers-heavy");
        break;

      case range >= 600 && range <= 622:
        setIcon("fas fa-snowflake");

        break;

      case range >= 701 && range <= 781:
        setIcon("fas fa-cloud");

        break;

      case range === 800:
        setIcon("fas fa-cloud-sun");

        break;

      case range >= 800 && range <= 804:
        setIcon("fas fa-cloud");

        break;
    }
  };

  const conToCelcius = (temp) => {
    const celcius = Math.floor(temp - 273);
    return celcius;
  };

  const minmaxTemp = (min, max) => {
    return (
      <h3>
        <span>Min: {min}&deg;C</span>
        <span>Max: {max}&deg;C</span>
      </h3>
    );
  };

  const changeMode = () => {
    setMode(!mode);
  };

  return (
    <Router>
      <div className={`container ${mode ? "mode" : ""}`}>
        <Mode changeMode={changeMode} mode={mode} />
        <Switch>
          <Route
            path="/new-weather-app"
            exact
            render={(props) => (
              <>
                <Input getWeather={getWeather} city={city} />
                {loading ? (
                  "Loading...  Please Wait.."
                ) : (
                  <Weather
                    city={city}
                    temp={temp}
                    feels={feels}
                    minTemp={minTemp}
                    maxTemp={maxTemp}
                    icon={icon}
                    desc={desc}
                    date={date}
                    humidity={humidity}
                    sunrise={sunrise}
                    sunset={sunset}
                    vars={vars}
                    minmaxTemp={minmaxTemp}
                  />
                )}

                <PostWeather
                  icon={icon}
                  temp={temp}
                  arr={arr}
                  conversion={conToCelcius}
                  getDayDetails={getDayDetails}
                />
              </>
            )}
          />
          <Route
            path="/new-weather-app/Details"
            exact
            render={(props) => (
              <Details
                city={city}
                getDayDetails={getDayDetails}
                arr={arr}
                conversion={conToCelcius}
                taskDetails={taskDetails}
                icon={newIcon}
                minmaxTemp={minmaxTemp}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default Main;

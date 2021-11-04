import { useState, useEffect } from "react";
import axios from "axios";

import { getIcon } from "./GetIcons";
import { conToCelcius } from "./Functions";

export const useFetch = () => {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [desc, setDesc] = useState("");
  const [feels, setFeels] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [icon, setIcon] = useState("");

  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [arr, setArray] = useState([]);
  const [inputs, setInputs] = useState("karachi");
  const [vars, setVars] = useState(false);

  const [mode, setMode] = useState(false);
  const [taskDetails, setTaskDetails] = useState("");

  const getWeather = () => {
    // e.preventDefault();
    // const input = e.currentTarget.elements.city.value;
    const input = "karachi";
    const APIkey = "f28836b7dcdf328bc7bd5047a2a7e35a";

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
            setIcon(getIcon(response1.data.current.weather[0].id));
            setVars(true);
            setInputs("hello");
          });
      });
    } else if (input) {
      setVars(false);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIkey}`
        )
        .then((response) => {
          setLoading(false);
          setDate(response.data.dt);
          setCity(`${response.data.name}, ${response.data.sys.country}`);
          setTemp(conToCelcius(response.data.main.temp));
          setMinTemp(conToCelcius(response.data.main.temp_min));
          setMaxTemp(conToCelcius(response.data.main.temp_max));
          setFeels(conToCelcius(response.data.main.feels_like));
          setDesc(response.data.weather[0].description);
          setIcon(getIcon(response.data.weather[0].id));

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

  const getDayDetails = (id) => {
    const detailed = arr[id + 1];
    setTaskDetails(detailed);
  };

  const changeMode = () => {
    setMode(!mode);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return {
    city,
    temp,
    minTemp,
    maxTemp,
    desc,
    feels,
    humidity,
    sunrise,
    sunset,
    date,
    loading,
    arr,
    inputs,
    vars,
    icon,
    mode,
    taskDetails,
    conToCelcius,
    getDayDetails,
    changeMode,
  };
};

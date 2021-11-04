import Weather from "../components/Weather";
import { minmaxTemp } from "../Utills/Functions";
import { useFetch } from "../Utills/useFetch";
import PostWeatherScreen from "./PostWeatherScreen";

const WeatherScreen = () => {
  const {
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
    vars,
    icon,
  } = useFetch();
  return (
    <>
      {/* {<Input getWeather={getWeather} city={city} />} */}
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
      <PostWeatherScreen />
    </>
  );
};

export default WeatherScreen;

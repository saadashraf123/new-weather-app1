import PostWeather from "../components/PostWeather";
import { useFetch } from "../Utills/useFetch";

const PostWeatherScreen = () => {
  const { temp, arr, icon, getDayDetails, conToCelcius } = useFetch();
  return (
    <PostWeather
      icon={icon}
      temp={temp}
      arr={arr}
      getDayDetails={getDayDetails}
      conversion={conToCelcius}
    />
  );
};

export default PostWeatherScreen;

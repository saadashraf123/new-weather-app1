import Mode from "./components/Mode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useFetch } from "./Utills/useFetch";
import WeatherScreen from "./screens/WeatherScreen";
import DetailsScreen from "./screens/DetailsScreen";

function App() {
  const { mode, changeMode } = useFetch();

  return (
    <Router>
      <div className={`container ${mode ? "mode" : ""}`}>
        <Mode changeMode={changeMode} mode={mode} />
        <Switch>
          <Route path="/new-weather-app" exact component={WeatherScreen} />
          <Route
            path="/new-weather-app/Details"
            exact
            component={DetailsScreen}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

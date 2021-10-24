import moment from "moment";

const PostWeather = ({ arr, conversion }) => {
  const newArr = arr.filter(
    (datas) => moment.unix(datas.dt).format("LL") != moment().format("LL")
  );
  return (
    <div className="">
      {arr.length > 0 ? (
        <div>
          <h3 className="futTemp">Future Temperature: </h3>

          {newArr.map((data, index) => {
            return (
              <div key={index}>
                <div className="row">
                  <div className="days">
                    <h3>Date: {moment.unix(data.dt).format("LL")}</h3>
                    <h3>Temp: {conversion(data.temp.day)}&deg;</h3>
                    <h2 className="description">
                      Description: {data.weather[0].description}
                    </h2>
                    <h4>Sunrise: {moment.unix(data.sunrise).format("LT")}</h4>
                    <h4>Sunset: {moment.unix(data.sunset).format("LT")}</h4>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostWeather;

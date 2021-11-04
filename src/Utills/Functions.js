export const conToCelcius = (temp) => {
  const celcius = Math.floor(temp - 273);
  return celcius;
};

export const minmaxTemp = (min, max) => {
  return (
    <h3>
      <span>Min: {min}&deg;C</span>
      <span>Max: {max}&deg;C</span>
    </h3>
  );
};

export const feels = (feel) => {
  const feelsAvg = (feel.day + feel.night + feel.morn + feel.eve) / 4;
  return feelsAvg;
};

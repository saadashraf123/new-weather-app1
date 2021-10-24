import React from "react";

const Time = () => {
  const currentHour =
    new Date().getHours() > 9
      ? new Date().getHours()
      : "0" + new Date().getHours();
  const currentMinute =
    new Date().getMinutes() > 9
      ? new Date().getMinutes()
      : "0" + new Date().getMinutes();
  return <div></div>;
};

export default Time;

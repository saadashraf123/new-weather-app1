import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Page Not Found</h1>
      <h2>Error 404</h2>{" "}
      <Link className="btn" to="/new-weather-app">
        go Back to Main Page
      </Link>
    </div>
  );
};

export default Error;

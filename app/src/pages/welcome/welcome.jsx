import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import "./welcome.css";

class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <h1 className="header">Thank you for trying out the secure-electron-template!</h1>
        <Link to={ROUTES.MAIN}>Click me to go to the main page.</Link>
      </div>
    );
  }
}

export default Welcome;

import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <div>
        Welcome to this template!<br />
        <Link to={ROUTES.MAIN}>Click me to go to the main page.</Link>
      </div>
    );
  }
}

export default Welcome;

import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";

class Welcome extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="section">
          <div className="container">
            <h2 className="title is-2">Samples</h2>
            <div>
              <Link to={ROUTES.ABOUT}>About page</Link> <br />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Welcome;

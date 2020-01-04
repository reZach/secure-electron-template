import React from "react";
import { Switch, Route } from "react-router";
import routes from "../../constants/routes";
import App from "../app/app";
import Page2 from "../page2/page2";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={routes.ENTRY} component={App}></Route>
        <Route path={routes.MAIN} component={Page2}></Route>
      </Switch>
    );
  }
}

export default Routes;

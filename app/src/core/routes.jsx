import React from "react";
import { Switch, Route } from "react-router";
import ROUTES from "Constants/routes";
import Welcome from "Pages/welcome/welcome";
import Motd from "Pages/motd/motd";
import Localization from "Pages/localization/localization";
import UndoRedo from "Pages/undoredo/undoredo";
import ContextMenu from "Pages/contextmenu/contextmenu";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.WELCOME} component={Welcome}></Route>
        <Route path={ROUTES.MOTD} component={Motd}></Route>
        <Route path={ROUTES.LOCALIZATION} component={Localization}></Route>
        <Route path={ROUTES.UNDOREDO} component={UndoRedo}></Route>
        <Route path={ROUTES.CONTEXTMENU} component={ContextMenu}></Route>
      </Switch>
    );
  }
}

export default Routes;

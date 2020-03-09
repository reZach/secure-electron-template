import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import "./contextmenu.css";

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  componentDidMount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();

    // Set up binding in code whenever the context menu item
    // of id "alert" is selected
    window.api.contextMenu.onReceive("alert", function(args) {
      alert(
        `This alert was brought to you by secure-electron-context-menu by ${args.attributes.name}`
      );

      // Note - we have access to the "params" object as defined here: https://www.electronjs.org/docs/api/web-contents#event-context-menu
      // args.params
    });
  }

  render() {
    return (
      <div id="contextmenu">
        <Link to={ROUTES.WELCOME} className="left">
          Go back
        </Link>
        <div className="contextmenu">Context menu</div>
        <div cm-template="alertTemplate" cm-payload-name="reZach">
          Try right-clicking me for a custom context menu
        </div>
      </div>
    );
  }
}

export default ContextMenu;

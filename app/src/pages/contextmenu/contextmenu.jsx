import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import SubItem from "Components/subitem/subitem";
import "./contextmenu.css";

class ContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  componentWillUnmount() {
    // Clear any existing bindings;
    // important on mac-os if the app is suspended
    // and resumed. Existing subscriptions must be cleared
    window.api.contextMenu.clearRendererBindings();
  }

  componentDidMount() {
    // Set up binding in code whenever the context menu item
    // of id "alert" is selected
    window.api.contextMenu.onReceive("loudAlert", function(args) {
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
        <div>
          <div className="contextmenu" cm-template="loudAlertTemplate"
            cm-payload-name="reZach">Context menu</div>
          <div
            className="italic">
            right-click me!
          </div>
        </div>
        <div>
          {/* Demonstrating how to use the context menu with multiple items */}
          <SubItem id="1"></SubItem>
          <SubItem id="2"></SubItem>
        </div>
      </div>
    );
  }
}

export default ContextMenu;

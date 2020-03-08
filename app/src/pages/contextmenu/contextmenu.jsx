import React from "react";
import { connect } from "react-redux";
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
    window.api.contextMenu.onReceive("alertme", function(args) {
      console.log("bob");
    });
  }

  render() {
    return (
      <div id="contextmenu">
        <Link to={ROUTES.WELCOME} className="left">
          Go back
        </Link>
        <div className="contextmenu">Context menu</div>
        <div cm-template="exampleTemplate" cm-payload-ab="abc">
          Try right-clicking me for a custom context menu
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({});
const mapDispatch = {};

export default connect(mapStateToProps, mapDispatch)(ContextMenu);

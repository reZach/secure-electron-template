import React from "react";

class SubItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    window.api.contextMenu.clearRendererBindings();
  }

  componentDidMount() {
    // Set up binding in code whenever the context menu item
    // of id "alert" is selected
    window.api.contextMenu.onReceive("softAlert", function(args) {
      console.log(`This alert was brought to you by secure-electron-context-menu by ${args.attributes.name}`);

      // Note - we have access to the "params" object as defined here: https://www.electronjs.org/docs/api/web-contents#event-context-menu
      // args.params
    }, this.props.id);
  }

  render() {
    return (
      <div id="subitem">
        <div
          cm-template="softAlertTemplate"
          cm-id={this.props.id}
          cm-payload-name={`Child (${this.props.id})`}>
          ID ({this.props.id}): Try right-clicking me for a custom context menu
        </div>
      </div>
    );
  }
}

export default SubItem;

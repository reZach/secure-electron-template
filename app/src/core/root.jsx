import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider, connect } from "react-redux";
import Routes from "Core/routes";
import "./root.css";

class Root extends React.Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes></Routes>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Root;
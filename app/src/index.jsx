import React from "react";
import ReactDOM from "react-dom";
import Root from "Core/root";
import store, { history } from "Redux/store/store";

ReactDOM.render(
  <Root store={store} history={history}></Root>,
  document.getElementById("target")
);

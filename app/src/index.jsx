import React from "react";
import ReactDOM from "react-dom";
//import "I18n/i18n.config";
import Root from "Core/root";
import store, { history } from "Redux/store/store";

console.error(window);
console.error(window.test);

ReactDOM.render(
  <Root store={store} history={history}></Root>,
  document.getElementById("target")
);

import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import Root from "Core/root";
import { store, history } from "Redux/store/store";
import "bulma/css/bulma.css";

const container = document.getElementById("target");
const root = createRoot(container);
root.render(
  <Suspense fallback="loading">
    <Root store={store} history={history}></Root>
  </Suspense>
);
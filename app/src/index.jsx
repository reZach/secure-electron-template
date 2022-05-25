import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import i18n from "I18n/i18n.config";
import { I18nextProvider } from "react-i18next";
import Root from "Core/root";
import store, { history } from "Redux/store/store";
import "bulma/css/bulma.css";

const root = createRoot(document.getElementById("target"));
// root.render(
//   <I18nextProvider i18n={i18n}>
//     <Suspense fallback="loading">
//       <Root store={store} history={history}></Root>
//     </Suspense>
//   </I18nextProvider>
// );
root.render(
  <div>
    <I18nextProvider i18n={i18n}>
      <Root store={store} history={history}></Root>
    </I18nextProvider>
  </div>
);

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers/rootReducer";

export const history = createHashHistory();

const store = configureStore({
  reducer: rootReducer(history),
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), routerMiddleware(history)]
});

export default store;

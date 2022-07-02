import {
  combineReducers
} from "redux";
import {
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import {
  createHashHistory,
  createBrowserHistory 
} from "history";
//import { routerMiddleware } from "connected-react-router";
import {
  createReduxHistoryContext
} from "redux-first-history";
//import rootReducer from "../reducers/rootReducer";

const {
  routerMiddleware,
  createReduxHistory,
  routerReducer
} = createReduxHistoryContext({
  history: createHashHistory()
});

export const store = configureStore({
  //reducer: rootReducer(history),
  reducer: combineReducers({
    router: routerReducer
  }),
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), routerMiddleware]
});

export const history = createReduxHistory(store);
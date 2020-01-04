import {
  combineReducers
} from "redux";
import {
  connectRouter
} from "connected-react-router";
import homeReducer from "../components/home/homeSlice";

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  home: homeReducer
});

export default createRootReducer;
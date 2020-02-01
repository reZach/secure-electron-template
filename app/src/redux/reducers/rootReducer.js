import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import undoable from "easy-redux-undo";
import homeReducer from "../components/home/homeSlice";
import counterReducer from "../components/counter/counterSlice";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    counter: undoable(counterReducer)
  });

export default createRootReducer;

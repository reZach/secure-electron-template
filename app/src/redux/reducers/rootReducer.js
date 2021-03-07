import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import undoable from "easy-redux-undo";
import homeReducer from "../components/home/homeSlice";
import counterReducer from "../components/counter/counterSlice";
import complexReducer from "../components/complex/complexSlice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    undoable: undoable(
      combineReducers({
        counter: counterReducer,
        complex: complexReducer
      })
    )
  });

export default rootReducer;

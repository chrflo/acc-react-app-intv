import { combineReducers } from "redux";
import graphReducer from "./graphReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  formula: graphReducer,
  errors: errorReducer
});

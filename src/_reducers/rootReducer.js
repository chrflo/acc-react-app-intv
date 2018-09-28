import { combineReducers } from "redux";
import graphReducer from "./formulaReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  formula: graphReducer,
  errors: errorReducer
});

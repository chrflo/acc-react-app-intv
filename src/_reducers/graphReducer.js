import { graphConstants } from "../_constants/graphConstants";

const initState = {};

export default function(state = initState, action) {
  switch (action.type) {
    case graphConstants.PLOT_FORMULA:
      return action.payload;
    case graphConstants.CLEAR_FORMULA:
      return action.payload;
    // case graphConstants.HISTORY_SELECTED:
    //   return action.payload; //will return the value in the histroy field
    default:
      return state;
  }
}

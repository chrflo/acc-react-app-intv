import { errorConstants, graphConstants } from "../_constants/graphConstants";

const initState = {};

export default function(state = initState, action) {
  switch (action.type) {
    case graphConstants.PLOT_FORMULA:
      return action.payload;
    case graphConstants.CLEAR_FORMULA:
      return action.payload;
    default:
      return state;
  }
}

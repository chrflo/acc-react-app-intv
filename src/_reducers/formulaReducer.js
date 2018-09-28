import { errorConstants, graphConstants } from "../_constants/graphConstants";

const initState = {};

export default function(state = initState, action) {
  switch (action.type) {
    case graphConstants.NEW_FORMULA:
      return action.payload;
    default:
      return state;
  }
}

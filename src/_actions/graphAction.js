// import { errorConstants } from "../_constants/errorConstants";
import { graphConstants } from "../_constants/graphConstants";

export const updateFormula = formula => {
  return {
    type: graphConstants.PLOT_FORMULA,
    payload: formula
  };
};

export const clearFormula = () => {
  return {
    type: graphConstants.CLEAR_FORMULA,
    payload: ""
  };
};

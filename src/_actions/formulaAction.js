import { errorConstants } from "../_constants/errorConstants";
import { graphConstants } from "../_constants/graphConstants";

export const updateFormula = formula => {
  return {
    type: graphConstants.NEW_FORMULA,
    payload: formula
  };
};

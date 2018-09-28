import React from "react";
import mexp from "math-expression-evaluator";
import { replaceX } from "../_utils/formula";

/* 
 * function to validate the formula passin by the user
 * without writing my own function parser or regex to do this, 
 * just change the x to 1 and see if the exp eval is successful
 */
export const validateFormula = formula => {
  const f = replaceX(formula, 1);
  return mexp.eval(f);

  //   let tmp = undefined;
  //   try {
  //     tmp = mexp.eval(f.replace("x", "1"));
  //   } catch (err) {
  //     console.error(`The provided formula (${formula}) is not valid.`);
  //   }

  //   return tmp !== 0;
};

/* 
 * function to check and see if the passed object is empty
 */
export const isEmpty = obj => {
  return (
    obj === undefined ||
    obj === null ||
    (typeof obj === "object" && Object.keys(obj).length === 0) ||
    (typeof obj === "string" && obj.trim().length === 0)
  );
};

/*
 * Check to see if the input is a number only
 */
export const isNumber = obj => {
  if (isNaN(obj)) {
    throw "Invalid";
  }
  return true;
};

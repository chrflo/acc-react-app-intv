import React from "react";
import mexp from "math-expression-evaluator";
import { replaceX } from "../_utils/formula";
import { Parser } from "expr-eval";

/* 
 * function to validate the formula passin by the user
 * without writing my own function parser or regex to do this, 
 * just change the x to 1 and see if the exp eval is successful
 */
export const validateFormula = formula => {
  try {
    const parser = new Parser().parse(formula);
    const { tokens } = parser;

    //check to see if there is more than variable and reject
    let prevVar = "";
    tokens.forEach(element => {
      if (element.type === "IVAR") {
        if (prevVar !== element.value && prevVar !== "") {
          throw `Multiple variables detected (${prevVar}, ${
            element.value
          }, ...).`;
        }
        prevVar = element.value;
      }
    });
    console.log(tokens);
  } catch (err) {
    console.error(err);
    throw "Invalid formula.";
  }

  return true;
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
    throw "Is not a number";
  }
  return true;
};

import { Parser } from "expr-eval";

/* 
 * function to validate the formula passin by the user
 * without writing my own function parser or regex to do this, 
 * just change the x to 1 and see if the exp eval is successful
 */
export const validateFormula = formula => {
  let parser;
  if (isEmpty(formula)) {
    throw new Error("Formula cannot be empty.");
  }

  try {
    parser = new Parser().parse(formula);
  } catch (err) {
    console.error(err);
    throw new Error("Invalid formula.");
  }

  const { tokens } = parser;

  //check to see if there is more than variable and reject
  let prevVar = "";

  // let's handle the case here all the user enters is text
  const regex = /[A-Z]|[a-z]/gm;
  if (
    tokens.length === 1 &&
    formula.length !== 1 &&
    regex.exec(formula) !== null
  ) {
    throw new Error("Multiple variables in single string.");
  }

  tokens.forEach(element => {
    if (element.type === "IVAR") {
      if (prevVar !== element.value && prevVar !== "") {
        throw new Error(
          `Multiple variables detected (${prevVar}, ${element.value}, ...).`
        );
      }
      prevVar = element.value;
    }
  });
  // console.log(tokens);

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
    throw new Error("Is not a number");
  }
  return true;
};

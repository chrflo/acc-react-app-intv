import mexp from "math-expression-evaluator";
import { isEmpty } from "./validators";

/*
 * Get the points for the chart input
 */
export const data = (formula, xMin, xMax, step = 1) => {
  const f = formula.trim();

  return isEmpty(f) || isEmpty(xMin) || isEmpty(xMax)
    ? [] // generate the empty dataset
    : rechartData(f, xMin, xMax, step);
};

/*
 * Get the 
 */
function points(formula, xMin, xMax, step) {
  let point = [];

  for (i = xMin; i <= xMax; i += step) {
    y.push({
      name: i,
      y: mexp.eval(f.replace("x", i))
    });
  }

  return points;
}

import { Parser } from "expr-eval";
import { isEmpty } from "./validators";

/*
 * Get the points for the chart input
 */
export const dataPoints = (formula, xMin, xMax, yMin, yMax, step) => {
  const f = formula.trim();

  // TODO: let's determine a step that is reasonable to the min and max x

  return isEmpty(f) || isEmpty(xMin) || isEmpty(xMax)
    ? [] // generate the empty dataset
    : getPoints(
        f,
        parseInt(xMin, 10),
        parseInt(xMax, 10),
        parseInt(yMin, 10),
        parseInt(yMax, 10),
        step
      );
};

/*
 * Get the 
 */
function getPoints(formula, xMin, xMax, yMin, yMax, step = 0.2) {
  let points = [];
  let smallestY = Number.MAX_SAFE_INTEGER;
  let largestY = Number.MIN_SAFE_INTEGER;
  const exp = new Parser().parse(formula);

  for (let i = xMin; i <= xMax; i += step) {
    const yVal = exp.evaluate({ x: i });

    // // console.log(`X: ${i}, Y: ${yVal}`);
    smallestY = getMinY(yVal, smallestY);
    largestY = getMaxY(yVal, largestY);

    points.push({
      x: i,
      y: yVal
    });
  }

  return {
    minY: smallestY,
    maxY: largestY,
    points
  };
}

function getMinY(currentY, previousY) {
  return Math.min(currentY, previousY);
}

function getMaxY(currentY, previousY) {
  return Math.max(currentY, previousY);
}

import mexp from "math-expression-evaluator";
import { Parser } from "expr-eval";
import { isEmpty } from "./validators";
import { replaceX } from "../_utils/formula";

/*
 * Get the points for the chart input
 */
export const dataPoints = (formula, xMin, xMax, yMin, yMax, step) => {
  const f = formula.trim();

  // TODO: let's determine a step that is reasonable to the min and max x

  return isEmpty(f) || isEmpty(xMin) || isEmpty(xMax)
    ? [] // generate the empty dataset
    : getPoints(f, xMin, xMax, yMin, yMax, step);
};

/*
 * Get the 
 */
function getPoints(formula, xMin, xMax, yMin, yMax, step = 0.1) {
  let points = [];
  let leftCase = { x: 0, y: 0 };
  let rightCase = { x: 0, y: 0 };
  let prevY = 0;
  let smallestY = Number.MAX_SAFE_INTEGER;
  let largestY = Number.MIN_SAFE_INTEGER;
  const exp = new Parser().parse(formula);

  // TODO: figure out way since floating point arithmatec isnt always that accurate
  // //determine a nice step value if one isn't provided
  // if (!step) {
  //   // const maxBoundedY = mexp.eval(replaceX(formula, xMax));
  //   // parseInt(maxBoundedY, 10).toString().length
  //   step = yMax / Math.pow(10, parseInt(yMax, 10).toString().length);
  // }

  for (let i = xMin; i <= xMax; i += step) {
    const yVal = exp.evaluate({ x: i });
    // const yVal = mexp.eval(replaceX(formula, i));
    console.log(`X: ${i}, Y: ${yVal}`);

    // let's capute and track the last value of y before
    // we hit the cutoff condition in order to better display
    // the graph
    // if (i < 0) {
    //   // handle the left side of the chart
    //   if (yVal <= yMin || yVal >= yMax) {
    //     smallestY = getMinY(yVal, smallestY);
    //     largestY = getMaxY(yVal, largestY);

    //     leftCase = {
    //       x: i,
    //       y: yVal
    //     };
    //   }
    // } else {
    //   //handle the right side of the chart
    //   if (prevY <= yMax && prevY >= yMin) {
    //     smallestY = getMinY(yVal, smallestY);
    //     largestY = getMaxY(yVal, largestY);

    //     rightCase = {
    //       x: i,
    //       y: yVal
    //     };
    //   }
    // }

    // to avoid over generating data, consider also bounding y to the y min and max
    if (yVal >= yMin && yVal <= yMax) {
      smallestY = getMinY(yVal, smallestY);
      largestY = getMaxY(yVal, largestY);

      points.push({
        x: i,
        y: yVal
      });
    }

    //set the previous y val
    prevY = yVal;
  }

  // points.push(leftCase);
  // points.push(rightCase);

  console.log(`Left Case: (${leftCase.x}, ${leftCase.y})`);
  console.log(`Right Case: (${rightCase.x}, ${rightCase.y})`);

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

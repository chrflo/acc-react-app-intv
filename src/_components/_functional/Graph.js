import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// components
import FormField from "../_common/FormField";

// validators
import { isEmpty, isNumber } from "../../_utils/validators";

// workers
import { dataPoints } from "../../_utils/graph";

//action
import { clearFormula } from "../../_actions/graphAction";

import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

class Graph extends Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      // console.log(event);

      const { fieldName, value, errors } = event;
      const prop = fieldName;
      const state = this.state;
      const { scale, formula } = state;
      const { xMin, xMax, yMin, yMax } = { ...scale, [prop]: value };

      if (errors.length !== 0 || isEmpty(value)) {
        return;
      }

      // if the bounds change, check to see if there is a formula,
      // if there is, we need to regen the data points but we should consider
      //this only if the current data sets min / max values are exceeded
      const data = !isEmpty(formula)
        ? dataPoints(formula, xMin, xMax, yMin, yMax)
        : state.data;

      this.setState({
        ...state,
        scale: {
          ...scale,
          [prop]: parseInt(value, 10)
        },
        data
      });

      //this is where we are going to call our action
      // if (!isEmpty(formula)) {
      //   this.props.clearFormula();
      // }
    };

    this.state = {
      scale: {
        xMin: -10,
        xMax: 10,
        yMin: -10,
        yMax: 10,
        step: 1
      },
      formula: "",
      data: {
        points: [],
        minY: Number.MIN_SAFE_INTEGER,
        maxY: Number.MAX_SAFE_INTEGER
      },
      errors: {}
    };

    /*
     * Since we are using Redux and the properties are form the respective reducers
     * Add a new life cylce method to check when the component recieves new properties 
     * so that we are able to update the state accordingly 
     */
    this.componentWillReceiveProps = nextProps => {
      const state = this.state;
      const { xMin, xMax, yMin, yMax } = state.scale;

      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }

      if (nextProps.formula) {
        //let's get the new data in here and set the state's formula to the new one
        const newData = dataPoints(nextProps.formula, xMin, xMax, yMin, yMax);

        this.setState({ ...state, data: newData, formula: nextProps.formula });
      }
    };
  }
  render() {
    const scaleValidator = (prop, compareVal) => value => {
      if (isEmpty(value)) {
        throw new Error(`${prop} cannot empty`);
      }

      isNumber(value); //check to make sure that it is a number

      //let's make sure to check and see that the mis and max don't go above or below eachother
      switch (prop) {
        case "xMin":
          if (value >= compareVal) {
            throw new Error(`xMin ${value} cannot be >= xMax`);
          }
          break;
        case "xMax":
          if (value <= compareVal) {
            throw new Error(`xMin ${value} cannot be <= xMax`);
          }
          break;
        case "yMin":
          if (value >= compareVal) {
            throw new Error(`xMin ${value} cannot be >= yMax`);
          }
          break;
        case "yMax":
          if (value <= compareVal) {
            throw new Error(`xMin ${value} cannot be <= yMin`);
          }
          break;
        default:
          throw new Error(`${prop} not found.`);
      }

      return true;
    };

    return (
      <div className="graph">
        <div className="container">
          <VictoryChart
            style={{
              parent: { maxWidth: "100%" }
            }}
            padding={{
              top: 0
            }}
            theme={VictoryTheme.material}
            minDomain={{ y: this.state.scale.yMin, x: this.state.scale.xMin }}
            maxDomain={{ y: this.state.scale.yMax, x: this.state.scale.xMax }}
            width={450}
            height={450}
          >
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              animate={{
                // duration: 2000,
                onLoad: { duration: 5000 }
              }}
              padding={{
                top: 0
              }}
              data={this.state.data.points}
            />
          </VictoryChart>
          {/* <div className="container"> */}
          <div className="form-group">
            <div className="row">
              <div className="col-sm align-self-start">
                <FormField
                  label="Min X"
                  fieldId="xMin"
                  validator={scaleValidator("xMin", this.state.scale.xMax)}
                  onStateChanged={this.handleChange}
                  placeholder={this.state.scale.xMin}
                />
              </div>
              <div className="col-sm">
                <FormField
                  label="Max X"
                  fieldId="xMax"
                  validator={scaleValidator("xMax", this.state.scale.xMin)}
                  onStateChanged={this.handleChange}
                  placeholder={this.state.scale.xMax}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <FormField
                  label="Min Y"
                  fieldId="yMin"
                  validator={scaleValidator("yMin", this.state.scale.yMax)}
                  onStateChanged={this.handleChange}
                  placeholder={this.state.scale.yMin}
                />
              </div>
              <div className="col-sm">
                <FormField
                  label="Max Y"
                  fieldId="yMax"
                  validator={scaleValidator("yMax", this.state.scale.yMin)}
                  onStateChanged={this.handleChange}
                  placeholder={this.state.scale.yMax}
                />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  formula: state.formula,
  errors: state.errors
});

Graph.propTypes = {
  clearFormula: PropTypes.func,
  formula: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { clearFormula }
)(Graph);

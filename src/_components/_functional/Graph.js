import React, { Component } from "react";
import FormField from "../_common/FormField";

import {
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
  VictoryTheme
} from "victory";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
// } from "recharts";

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      const { id, value } = event;

      //we known that they are going to be scale changes only
      const ary = id.split(".");
      const state = this.state;

      this.setState({
        ...state,
        [ary[0]]: {
          [ary[1]]: value
        }
      });
    };

    this.state = {
      scale: {
        x: {
          min: -10,
          max: 10
        },
        y: {
          min: -10,
          max: 10
        },
        step: 1
      },
      function: "",
      data: []
    };
  }
  render() {
    return (
      <div className="graph">
        <div className="container">
          <VictoryChart
            style={{ parent: { maxWidth: "100%", boarder: "1px solid #ccc" } }}
            theme={VictoryTheme.material}
            minDomain={{ y: this.state.scale.y.min, x: this.state.scale.x.min }}
            maxDomain={{ y: this.state.scale.y.max, x: this.state.scale.x.max }}
            width={450}
            height={450}
          >
            <VictoryLine
              style={{
                data: { stroke: "#8884d8" },
                parent: { border: "1px solid #ccc" }
              }}
              data={this.state.data}
            />
          </VictoryChart>
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <FormField label="Min X" fieldId="x.min" />
              </div>
              <div class="col-sm">
                <FormField label="Max X" fieldId="x.max" />
              </div>
            </div>
            <div className="row">
              <div class="col-sm">
                <FormField label="Min Y" fieldId="y.min" />
              </div>
              <div class="col-sm">
                <FormField label="Max Y" fieldId="y.max" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

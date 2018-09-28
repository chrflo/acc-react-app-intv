import React, { Component } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import PropTypes from "prop-types";

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onClick = () => {};
  }
  render() {
    const { xMin, xMax, yMin, yMax, data } = this.props;
    return (
      <VictoryChart
        style={{
          parent: { maxWidth: "100%" }
        }}
        padding={{
          top: 0
        }}
        animate={{
          duration: 5000
          // onLoad: { duration: 5000 }
        }}
        theme={VictoryTheme.material}
        minDomain={{ y: yMin, x: xMin }}
        maxDomain={{ y: yMax, x: xMax }}
        width={450}
        height={450}
        // events={[{ eventHandlers: { onClick: this.props.onSelected } }]}
      >
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" }
          }}
          animate={{
            duration: 5000,
            onEnter: {
              duration: 5000
            },
            onLoad: {
              duration: 5000
            }
          }}
          padding={{
            top: 0
          }}
          data={data}
        />
      </VictoryChart>
    );
  }
}

Chart.propTypes = {
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  onSelected: PropTypes.func
};

export default Chart;

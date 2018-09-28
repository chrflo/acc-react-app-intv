import React, { Component } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "../../_utils/validators";

class History extends Component {
  constructor(props) {
    super(props);

    this.mapValues = (formula, index) => {
      const { date, count } = this.props.history[formula];
      return (
        <li
          key={date}
          className="list-group-item list-group-item-action sm d-flex justify-content-between align-items-center"
          onClick={this.props.isClicked}
          value={formula}
        >
          {formula}
          <span class="badge badge-primary badge-pill">{count}</span>
        </li>
      );
    };

    this.state = {
      history: this.props.history
    };
  }

  render() {
    const { history } = this.props;

    let listFormula = [
      <li
        className="list-group-item list-group-item-action"
        placeholder="Formula History"
      />
    ];
    if (!isEmpty(history)) {
      listFormula = Object.keys(history).map(this.mapValues);
    }

    return (
      <div className="history">
        <ul className="list-group">{listFormula}</ul>
      </div>
    );
  }
}

History.propTypes = {
  history: PropTypes.object.isRequired,
  isClicked: PropTypes.object.isRequired
};

export default History;

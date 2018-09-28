import React, { Component } from "react";
import FormField from "../_common/FormField";
import History from "./History";
import { isEmpty, validateFormula } from "../../_utils/validators";

class Formula extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formula: "", //formula is the acutal formula that is entered by the user
      //   historicForumlas: new Set(),
      history: {}, //history will be an dict on date: previous formulas
      errors: {} //any errors that we encounter
    };

    // set the onclicked event for the history list
    this.isClicked = event => {
      const { target } = event;
      const { textContent } = target;
      const state = this.state;
      this.setState({
        ...state,
        formula: textContent
      });

      console.log(textContent);

      //this is where we will call our action to update the graph with the history
    };

    this.handleChange = event => {
      const { value, errors } = event;

      const currentState = this.state;

      this.setState({
        ...currentState,
        formula: value,
        errors: errors
      });
    };

    this.onSubmit = event => {
      event.preventDefault();

      const date = Date.now(); // get the seconds time
      const currentState = this.state;

      if (this.state.errors.length === 0) {
        let history =
          currentState.formula in currentState.history
            ? {
                ...currentState.history,
                [currentState.formula]: {
                  date,
                  count: currentState.history[currentState.formula].count + 1
                }
              }
            : {
                ...currentState.history,
                [currentState.formula]: { date, count: 1 }
              };

        //let's check to make sure that the same formula was not previously added
        const state = {
          ...currentState,
          formual: "",
          history
        };

        this.setState({
          ...state
        });

        //this is where we are going to call our action
      }
    };
  }
  render() {
    return (
      <div className="formula">
        <div className="container">
          <div className="row">
            <div className="col">
              <form action="create-profile.html" onSubmit={this.onSubmit}>
                <div className="form-group">
                  <FormField
                    type="text"
                    label="Formula"
                    fieldId="formula"
                    placeholder="Please enter a formula"
                    validator={validateFormula}
                    onStateChanged={this.handleChange}
                    value={this.state.formula}
                  />
                  <input type="submit" className="btn btn-info btn-sm mt-3" />
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <History
                history={this.state.history}
                isClicked={this.isClicked}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Formula;

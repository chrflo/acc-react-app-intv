import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Components
import FormField from "../_common/FormField";
import History from "./History";

//actions
import { updateFormula } from "../../_actions/graphAction";

//validators
import { isEmpty, validateFormula } from "../../_utils/validators";

class Formula extends Component {
  constructor(props) {
    super(props);

    /*
     * The state of the component
     */
    this.state = {
      formula: "", //formula is the acutal formula that is entered by the user
      history: {}, //history will be an dict on date: previous formulas
      errors: {} //any errors that we encounter
    };

    /*
     * set the onclicked event for the history list
     */
    this.isClicked = event => {
      const { target } = event;
      const { value } = target.attributes.value;
      const state = this.state;
      this.setState({
        ...state,
        formula: value
      });

      console.log(value);

      //this is where we will call our action to update the graph with the history
    };

    /*
     * handle a change event to the input
     */
    this.handleChange = event => {
      const { value, errors } = event;

      const currentState = this.state;

      this.setState({
        ...currentState,
        formula: value,
        errors: errors
      });
    };

    /*
     * Hangle the on submit action of the form
     * This is where we call our redux action
     */
    this.onSubmit = event => {
      event.preventDefault();

      const date = Date.now(); // get the seconds time
      const currentState = this.state;

      if (isEmpty(currentState.errors)) {
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
        this.props.updateFormula(this.state.formula);
      }
    };

    /*
     * Since we are using Redux and the properties are form the respective reducers
     * Add a new life cylce method to check when the component recieves new properties 
     * so that we are able to update the state accordingly 
     */
    this.componentWillReceiveProps = nextProps => {
      if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
      }

      //TODO:what else do we need to in this?
    };
  }
  render() {
    return (
      <div className="formula">
        <div className="container">
          <div className="row">
            <div className="col">
              <form onSubmit={this.onSubmit}>
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

const mapStateToProps = state => ({
  formula: state.formula,
  errors: state.errors
});

Formula.propTypes = {
  updateFormula: PropTypes.func,
  formula: PropTypes.string.isRequired,
  // history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { updateFormula }
)(Formula);

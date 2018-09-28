/*
 * author: Ghad Chinda
 * url: https://scotch.io/tutorials/password-strength-meter-in-react
 * 
 * In this component, the following are handled:
 * Input State First:
 * we initialized state for the form field component to keep track of the current value of the input field, the dirty status 
 * of the field, and any existing validation errors. A field becomes dirty the moment its value first changes and remains dirty.
 * 
 * Handle Input Change Next: 
 * we added the hasChanged(e) event handler to update the state value to the current input value on every change to the 
 * input. In the handler, we also resolve the dirty state of the field. We check if the field is a required field based on props, and add a validation 
 * error to the state errors array if the value is empty.
 * 
 * However, if the field is not a required field or is required but not empty, then we delegate to the validation function passed in the optional 
 * validator prop, calling it with the current input value, and adding the thrown validation error to the state errors array (if there is any error).
 * 
 * Finally, we update the state and pass a callback function to be called after the update. The callback function simply calls the function passed 
 * in the optional onStateChanged prop, passing the updated state as its argument. This will become handy for propagating state changes outside the component.
 * 
 * Rendering and Props:
 * we are simply rendering the input field and its label. We also conditionally render the first error in the state errors 
 * array (if there are any errors). Notice how we dynamically set the classes for the input field to show validation status using built-in classes from Bootstrap. 
 * We also render any children nodes contained in the component.
 */

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "../../_styles/form.css";

class FormField extends Component {
  constructor(props) {
    super(props);

    // initialize state
    this.state = {
      fieldName: this.props.fieldId,
      value: "",
      dirty: false,
      errors: []
    };

    this.hasChanged = e => {
      e.preventDefault();

      // destructure props - assign default dummy functions to validator and onStateChanged props
      const {
        fieldId,
        required = false,
        validator = f => f,
        onStateChanged = f => f
      } = this.props;

      const value = e.target.value;
      const requiredMissing =
        this.state.dirty && required && value.length === 0;

      let errors = [];

      if (requiredMissing) {
        // if required and is empty, add required error to state
        errors = [...errors, `${fieldId} is required`];
      } else if ("function" === typeof validator) {
        try {
          validator(value);
        } catch (e) {
          // if validator throws error, add validation error to state
          errors = [...errors, e.message];
        }
      }

      // update state and call the onStateChanged callback fn after the update
      // dirty is only changed to true and remains true on and after the first state update
      this.setState(
        ({ dirty = false }) => ({ value, errors, dirty: !dirty || dirty }),
        () => onStateChanged(this.state)
      );
      this.getValue = this.getValue.bind(this);
    };
  }

  getValue() {
    return this.state.value;
  }

  render() {
    const { dirty, errors } = this.state;
    const { type, label, fieldId, placeholder, highlightOff } = this.props;

    const hasErrors = errors.length > 0; //check to make sure that there are no errors that are returned from the API as well
    const controlClass = !highlightOff
      ? ["form-control", dirty ? (hasErrors ? "is-invalid" : "is-valid") : ""]
          .join(" ")
          .trim()
      : ["form-control", ""].join(" ").trim();

    return (
      <Fragment>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <label htmlFor={fieldId} className="control-label">
            {label}
          </label>
        </div>
        {/* Render the children nodes passed to component */}
        {/* {children} */}
        <input
          type={type}
          className={controlClass}
          id={fieldId}
          placeholder={placeholder}
          value={this.props.value}
          onChange={this.hasChanged}
        />
        {/** Render the first error if there are any errors **/}
        {hasErrors && (
          <div className="error form-hint text-right m-0 mb-2">{errors[0]}</div>
        )}
      </Fragment>
    );
  }
}

FormField.propTypes = {
  type: PropTypes.oneOf(["text", "password"]).isRequired,
  label: PropTypes.string,
  fieldId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  children: PropTypes.node,
  validator: PropTypes.func,
  onStateChanged: PropTypes.func,
  highlightOff: PropTypes.bool,
  value: PropTypes.string
};

export default FormField;

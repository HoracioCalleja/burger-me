import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement;

  switch (props.elementtype) {
    case "input":
      inputElement = <input className={classes.InputElement} {...props.elementConfig} />;
      break;
    case "textarea":
      inputElement = <textarea className={classes.InputElement} {...props.elementConfig} />;
      break;
    case "select":
      inputElement = (
        <select className={classes.InputElement}>
          {props.elementConfig.options.map((optionElement) => {
            return (
              <option key={optionElement.value} value={optionElement.value}>
                {optionElement.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = <input className={classes.InputElement} {...props.elementConfig} />;
      break;
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;

import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let inputElement;

  const inputClasses = [classes.InputElement];
  let errorMessage = null;

  if((!props.valid) && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid);
    errorMessage = <small>Enter a valid {props.elementConfig.name}</small>
  }

  switch (props.elementtype) {
    case "input":
      inputElement = <input onChange={props.changed} className={inputClasses.join(" ")} {...props.elementConfig} />;
      break;
    case "textarea":
      inputElement = <textarea onChange={props.changed} className={inputClasses.join(" ")} {...props.elementConfig} />;
      break;
    case "select":
      inputElement = (
        <select onChange={props.changed} className={inputClasses.join(" ")} value={props.value}>
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
      inputElement = <input onChange={props.changed} className={classes.InputElement} {...props.elementConfig} />;
      break;
  }

  return (
    <div>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {errorMessage}
    </div>
  );
};

export default Input;

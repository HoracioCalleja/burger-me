import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
    <p className={classes.Price} >Current Price: <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map((control) => {
        return (
          <BuildControl
            key = {control.label}
            label = {control.label}
            added = { () => props.ingredientAdded(control.type)}
            removed = { () => props.ingredientRemoved(control.type)}
            disabled = {props.disabled[control.type]}
          />
        );
      })}
      <button 
      className={classes.OrderButton}
      disabled = {!props.purchasable}
      onClick = {props.summary}
      >
      ORDER NOW
      </button>
      <button 
      className={classes.ClearButton}
      onClick={props.clearOrder}>
        CLEAR ORDER
      </button>
    </div>
  );
};

export default BuildControls;

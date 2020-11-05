import React from "react";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";

const OrderSummary = (props) => {
     const ingredientSummary = Object.keys(props.ingredients).map(
      (ingredientKey, index) => {
        return (
          <li key={ingredientKey + index} className={classes.Ingredient}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>{" "}
            :{props.ingredients[ingredientKey]}
          </li>
        );
      }
    );

  return (
    <div className={classes.Summary}>
      <h1 className={classes.Order}>Your order</h1>
      <ul className={classes.Ingredients}>{ingredientSummary}</ul>
      <h2 className={classes.TotalPrice}>
        Total price: {props.totalPrice.toFixed(2)}
      </h2>
      <Button buttonType="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.continue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default OrderSummary;

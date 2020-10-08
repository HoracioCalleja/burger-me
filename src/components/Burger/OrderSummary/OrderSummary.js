import React from "react";
import Aux from "../../../hoc/Auxilliar";

const OrderSummary = (props) => {
  const ingridientSummary = Object.keys(props.ingredients).map(
    (ingredientKey, index) => {
      return (
        <li key={ingredientKey + index}>
          <span style={{ textTransform: "capitalize" }}>
          {ingredientKey} 
          </span> : {props.ingredients[ingredientKey]}{" "}
        </li>
      );
    }
  );

  return (
    <Aux>
      <h3>Your order</h3>
      <p>Delicious order with the following ingredients:</p>
      <ul>{ingridientSummary}</ul>
      <p>Continue to checkout</p>
    </Aux>
  );
};

export default OrderSummary;

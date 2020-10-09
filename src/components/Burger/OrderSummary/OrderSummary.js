import React from "react";
import Aux from "../../../hoc/Auxilliar";
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingridientSummary = Object.keys(props.ingredients).map(
    (ingredientKey, index) => {
      return (
        <li key={ingredientKey + index}>
          <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span> :
          {props.ingredients[ingredientKey]}
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
      <Button buttonType="Danger" clicked={props.cancel}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.continue} >
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;

import React, { useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    meat: 2,
    cheese: 1,
    bacon: 2,
  });

  return (
    <div>
      <CheckoutSummary ingredients={ingredients} />
    </div>
  );
};

export default Checkout;

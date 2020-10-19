import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    let ingredientsData = {};
    let priceData = 0;
    for (let param of query.entries()) {
      // +variableString -> intenta convertir el String a Number
      // entonces, +"4" va a convertirse en 4
      if(param[0] === 'price'){
        priceData = param[1];
      } else {
        ingredientsData[param[0]] = +param[1];
      }
    }
    setIngredients({ ...ingredientsData });
    setPrice(priceData);
  }, []);

  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        cancel={checkoutCancelHandler}
        continue={checkoutContinueHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        render={(props) => <ContactData ingredients={ingredients} price={price} {...props} />}
      />
    </div>
  );
};

export default Checkout;

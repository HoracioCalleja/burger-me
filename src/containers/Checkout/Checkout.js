import React, { useState , useEffect} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const ingredients = {};
    for (let param of query.entries()){
      // +variableString -> intenta convertir el String a Number
      // entonces, +"4" va a convertirse en 4
      ingredients[param[0]] = +param[1];
    }
    setIngredients({...ingredients})
  } , [])

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
    </div>
  );
};

export default Checkout;

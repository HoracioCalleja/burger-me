import React from "react";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";

const Checkout = (props) => {
  console.log(props);
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };

  const checkoutContinueHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    summary = (
      <div>
        <CheckoutSummary
          ingredients={props.ingredients}
          cancel={checkoutCancelHandler}
          continue={checkoutContinueHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;

};

const mapStateToProps = (state) => {
  return {
    ingredients: state.reducerBurguer.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);

import React from "react";
import Burger from "../../../components/Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary} >
      <h1>We hope it taste well!</h1>
      <div className={classes.BurgerContainer}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Danger" clicked>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;

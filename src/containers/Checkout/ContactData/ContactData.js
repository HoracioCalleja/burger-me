import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

const ContactData = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    console.log(props);
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: "Charly García",
        address: {
          street: "Olazabal 2331 10b",
          zipcode: "1421",
          country: "Argentina",
        },
        deliveryMethod: "fastest",
      },
    };
    axios.post("/orders.json", order).then((response) => {
      setLoading(false);
      props.history.push("/");
      console.log(response.data);
    });
  };

  const form = loading ? (
    <Spinner />
  ) : (
    <>
      {" "}
      <h4 className={classes.Title}>Enter your Contact Data</h4>
      <form>
        <label className={classes.Label} htmlFor="name">
          {" "}
          Name{" "}
        </label>
        <input className={classes.Input} type="text" name="name" id="name" />
        <label className={classes.Label} htmlFor="email">
          {" "}
          Email{" "}
        </label>
        <input className={classes.Input} type="text" name="email" id="email" />
        <label className={classes.Label} htmlFor="street">
          {" "}
          Street{" "}
        </label>
        <input
          className={classes.Input}
          type="text"
          name="street"
          id="street"
        />
        <label className={classes.Label} htmlFor="postal-code">
          {" "}
          Postal Code{" "}
        </label>
        <input
          className={classes.Input}
          type="number"
          name="postal-code"
          id="postal-code"
        />
        <Button buttonType="Success" clicked={handleOrder}>
          {" "}
          ORDER{" "}
        </Button>
      </form>{" "}
    </>
  );

  return <div className={classes.ContactData}>{form}</div>;
  
};

export default ContactData;

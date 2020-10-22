import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";

const ContactData = (props) => {
  const [formData, setFormData] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your name",
        type: "text",
        name: "name",
        label: "Name",
        id: "name",
      },
      value: "",
    },
    address: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your Address",
        type: "text",
        name: "address",
        label: "Address",
        id: "address",
      },
      value: "",
    },
    street: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your Street name",
        type: "text",
        name: "street",
        label: "Street",
        id: "street",
      },
      value: "",
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        placeholder: "Enter the zipcode",
        type: "text",
        name: "zip-code",
        label: "Zip Code",
        id: "zip-code",
      },
      value: "",
    },
    country: {
      elementType: "input",
      elementConfig: {
        placeholder: "Enter the Country",
        type: "text",
        name: "country",
        label: "Country",
        id: "country",
      },
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fast", displayValue: "Fast" },
          { value: "normal", displayValue: "Normal" },
          { value: "cheap", displayValue: "Cheap" },
        ],
        name: "delivery-method",
        label: "Select a delivery method",
        id: "delivery-method",
      },
      value: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleOrder = (event) => {
    event.preventDefault();
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
    };
    axios.post("/orders.json", order).then((response) => {
      setLoading(false);
      props.history.push("/");
    });
  };

  let elementsArray = [];

  for (let element in formData) {
    elementsArray.push({ id: element, config: formData[element] });
  }

  const form = loading ? (
    <Spinner />
  ) : (
    <>
      <h4 className={classes.Title}>Enter your Contact Data</h4>
      <form>
        {elementsArray.map((element) => {
          return (
            <Input
              key={element.id}
              elementtype={element.config.elementType}
              value = {element.config.value}
              elementConfig = {element.config.elementConfig}
              label = {element.config.elementConfig.label}
            />
          );
        })}

        <Button buttonType="Success" clicked={handleOrder}>
          ORDER
        </Button>
      </form>
    </>
  );

  return <div className={classes.ContactData}>{form}</div>;
};

export default ContactData;

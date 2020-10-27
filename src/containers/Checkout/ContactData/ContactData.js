import React, { useState } from "react";
import { connect } from "react-redux";
import validator from "validator";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";
import Input from "../../../components/UI/Input/Input";

const ContactData = (props) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your name",
        type: "text",
        name: "name",
        label: "Name",
        id: "name",
        required: true,
      },
      value: "",
      validation: {
        notEmpty: true,
        lengths: {
          min: 3,
          max: 20,
        },
      },
      valid: false,
      touched: false,
    },
    address: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your Address",
        type: "text",
        name: "address",
        label: "Address",
        id: "address",
        required: true,
      },
      value: "",
      validation: {
        notEmpty: true,
        lengths: {
          min: 3,
          max: 50,
        },
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your Street name",
        type: "text",
        name: "street",
        label: "Street",
        id: "street",
        required: true,
      },
      value: "",
      validation: {
        notEmpty: true,
        lengths: {
          min: 3,
          max: 20,
        },
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        placeholder: "Enter the zipcode",
        type: "text",
        name: "zip-code",
        label: "Zip Code",
        id: "zip-code",
        required: true,
      },
      value: "",
      validation: {
        isPostalCode: true,
        notEmpty: true,
        lengths: {
          min: 3,
          max: 20,
        },
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        placeholder: "Enter the Country",
        type: "text",
        name: "country",
        label: "Country",
        id: "country",
        required: true,
      },
      value: "",
      validation: {
        notEmpty: true,
        lengths: {
          min: 3,
          max: 20,
        },
      },
      valid: false,
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
      value: "fast",
      validation: {},
      valid: true,
    },
  });
  const [isFormValid, setFormValid] = useState(false);

  const handleOrder = (event) => {
    event.preventDefault();
    const userData = {};
    for (let key in formData) {
      userData[key] = formData[key].value;
    }
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      userData,
    };
    axios.post("/orders.json", order).then((response) => {
      setLoading(false);
      props.history.push("/"); 
      
    });
  };

  const formInputsValidation = (value, rules) => {
    let isValid = true;

    if (rules.notEmpty) {
      isValid = !validator.isEmpty(value.trim()) && isValid;
    }

    if (rules.lengths) {
      isValid =
        validator.isLength(value, {
          min: rules.lengths.min,
          max: rules.lengths.max,
        }) && isValid;
    }

    if (rules.isAlpha) {
      return validator.isAlpha(value) && isValid;
    }

    if (rules.isPostalCode) {
      return validator.isPostalCode(value, "any") && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormData = { ...formData };
    const updatedFormElement = { ...updatedFormData[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = formInputsValidation(
      event.target.value,
      updatedFormElement.validation
    );
    console.log(updatedFormElement);
    updatedFormData[inputIdentifier] = updatedFormElement;
    let isFormValid = true;
    for (let identifier in updatedFormData) {
      isFormValid = updatedFormData[identifier].valid && isFormValid;
    }
    setFormValid(isFormValid);
    setFormData(updatedFormData);
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
      <form onSubmit={handleOrder}>
        {elementsArray.map((element, index) => {
          return (
            <Input
              key={element.id + index}
              elementtype={element.config.elementType}
              value={element.config.value}
              elementConfig={element.config.elementConfig}
              label={element.config.elementConfig.label}
              touched={element.config.touched}
              valid={element.config.valid}
              shouldValidate={element.config.validation}
              changed={(event) => inputChangedHandler(event, element.id)}
            />
          );
        })}

        <Button buttonType="Success" disabled={!isFormValid}>
          ORDER
        </Button>
      </form>
    </>
  );

  return <div className={classes.ContactData}>{form}</div>;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    price: state.price,
  };
};


export default connect(mapStateToProps)(ContactData);

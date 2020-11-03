import React, { useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import validator from "validator";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";

const Auth = (props) => {
  const [formData, setFormData] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        placeholder: "Email address",
        type: "email",
        name: "email",
        label: "Email",
        id: "email",
        required: true,
      },
      value: "",
      validation: {
        notEmpty: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        placeholder: "Your password",
        type: "password",
        name: "password",
        label: "Password",
        id: "password",
        required: true,
      },
      value: "",
      validation: {
        notEmpty: true,
        lengths: {
          min: 6,
        },
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignUp, setIsSignUp] = useState(true);

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
      isValid = validator.isAlpha(value) && isValid;
    }

    if (rules.isPostalCode) {
      isValid = validator.isPostalCode(value, "any") && isValid;
    }

    if (rules.isEmail) {
      isValid = validator.isEmail(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, elementIdentifier) => {
    const elementsUpdated = {
      ...formData,
      [elementIdentifier]: {
        ...formData[elementIdentifier],
        value: event.target.value,
        valid: formInputsValidation(
          event.target.value,
          formData[elementIdentifier].validation
        ),
        touched: true,
      },
    };
    setFormData(elementsUpdated);
  };

  let elementArray = [];
  for (let elementKey in formData) {
    elementArray.push({ id: elementKey, config: formData[elementKey] });
  }
  const elements = elementArray.map((element, index) => {
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
  });

  const handleAuthMethod = (event) => {
    event.preventDefault();
    setIsSignUp((prevState) => {
      return (prevState = !prevState);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onAuth(formData.email.value, formData.password.value, isSignUp);
  };

  const form = props.loading ? (
    <Spinner />
  ) : (
    <>
      <h1>{isSignUp ? "SIGN UP" : "SIGN IN"}</h1>
      {elements}
      <Button buttonType="Success">SUBMIT</Button>
      <Button clicked={handleAuthMethod} buttonType="Danger">
        SWITCH TO {isSignUp ? "SIGN IN" : "SIGN UP"}{" "}
      </Button>
    </>
  );

  return (
    <form className={classes.Auth} onSubmit={handleSubmit}>
      {form}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

const mapStateToPops = (state) => {
  const { error, token, loading, userId } = state.reducerAuth;
  return {
    error,
    token,
    loading,
    userId,
  };
};

export default connect(mapStateToPops, mapDispatchToProps)(Auth);

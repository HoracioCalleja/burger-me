import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";
import updateObject from "../../shared/utility";
import checkValidation from '../../shared/validation';

const Auth = (props) => {
  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.setRedirectAuthPath("/");
    }
  });

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

  const inputChangedHandler = (event, elementIdentifier) => {
    const updatedFormElement = updateObject(
      formData,
      updateObject(formData[elementIdentifier], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          formData[elementIdentifier].validation
        ),
        touched: true,
      })
    );
    const updatedForm = updateObject(formData, {
      [elementIdentifier]: updatedFormElement,
    });
    setFormData(updatedForm);
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

  const error = props.error ? (
    <p className={classes.Error}>{props.error}</p>
  ) : null;

  let form = (
    <>
      <h1 className={classes.Title}>{isSignUp ? "SIGN UP" : "LOGIN"}</h1>
      {error}
      {elements}
      <Button buttonType="Success">SUBMIT</Button>
      <Button clicked={handleAuthMethod} buttonType="Danger">
        SWITCH TO {isSignUp ? "LOGIN" : "SIGN UP"}{" "}
      </Button>
    </>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <form className={classes.Auth} onSubmit={handleSubmit}>
      {authRedirect}
      {form}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetRedirectAuthPath: (path) =>
      dispatch(actions.setRedirectAuthPath(path)),
  };
};

const mapStateToPops = (state) => {
  const { error, token, loading, userId, authRedirectPath } = state.reducerAuth;
  return {
    error,
    token,
    loading,
    userId,
    isAuthenticated: token !== null,
    authRedirectPath,
    buildingBurger: state.reducerBurger.building,
  };
};

export default connect(mapStateToPops, mapDispatchToProps)(Auth);

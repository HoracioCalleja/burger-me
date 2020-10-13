import React from "react";
import burgerLoco from "../../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={burgerLoco} alt="burger-me"></img>
    </div>
  );
};

export default Logo;

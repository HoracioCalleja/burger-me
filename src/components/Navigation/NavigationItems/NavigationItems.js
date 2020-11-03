import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"} exact clicked={props.onItemClicked}>
        Burger Builder
      </NavigationItem>
      <NavigationItem link={"/orders"} clicked={props.onItemClicked}>
        Orders
      </NavigationItem>
      <NavigationItem link={"/authentication"} clicked={props.onItemClicked}>
        Authentication
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;

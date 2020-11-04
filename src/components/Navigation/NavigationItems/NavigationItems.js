import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import { connect } from "react-redux";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"} exact clicked={props.onItemClicked}>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <>
          <NavigationItem link={"/orders"} clicked={props.onItemClicked}>
            Orders
          </NavigationItem>
          <NavigationItem link={"/logout"} clicked={props.onItemClicked}>
            Logout
          </NavigationItem>
        </>
      ) : (
        <NavigationItem link={"/authentication"} clicked={props.onItemClicked}>
          Authentication
        </NavigationItem>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.reducerAuth.token !== null,
  };
};

export default connect(mapStateToProps)(NavigationItems);

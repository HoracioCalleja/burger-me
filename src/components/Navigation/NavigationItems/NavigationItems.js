import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import { connect } from "react-redux";

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={"/"} exact >
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <>
          <NavigationItem link={"/orders"} >
            Orders
          </NavigationItem>
          <NavigationItem link={"/logout"} >
            Logout
          </NavigationItem>
        </>
      ) : (
        <NavigationItem link={"/authentication"} >
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

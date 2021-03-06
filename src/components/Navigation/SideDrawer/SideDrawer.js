import React from "react";
import Logo from "../../UI/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Backdrop from '../../UI/Backdrop/Backdrop'

const SideDrawer = (props) => {

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.show){
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <>
   <Backdrop show={props.show} clicked={props.close} />
    <div className={attachedClasses.join(" ")} onClick={props.close} > 
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
    </>
  );
};

export default SideDrawer;

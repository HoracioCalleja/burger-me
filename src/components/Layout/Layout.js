import React from "react";
import Aux from "../../hoc/Auxilliar";
import classes from './Layouyt.module.css'

 const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;
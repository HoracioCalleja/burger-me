import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxilliar";
import BackDrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Aux>
      <BackDrop show={props.show} clicked={props.closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateX(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;

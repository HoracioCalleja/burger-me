import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const orderSubmited = (orderId, orderData) => {
  return {
    type: actionTypes.ORDER_SUBMIT_SUCCESS,
    orderId,
    orderData,
  };
};

export const orderSubmitedFailed = (error) => {
  return {
    type: actionTypes.ORDER_SUBMIT_FAILED,
    error,
  };
};

const orderSubmitStarted = () => {
  return {
    type: actionTypes.ORDER_SUBMIT_STARTED,
  };
};


export const submitOrder = (orderData) => {
  return (dispatch) => {
    dispatch(orderSubmitStarted());
    axiosInstance
      .post("/orders.json", orderData)
      .then((response) => {
        dispatch(orderSubmited(response.data.name, orderData));
      })
      .catch((error) => {
        dispatch(orderSubmitedFailed(error));
      });
  };
};



export const getOrders = () => {
  
} 

import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const orderSubmitSucceded = (orderId, orderData) => {
  return {
    type: actionTypes.ORDER_SUBMIT_SUCCESS,
    orderId,
    orderData,
  };
};

export const orderSubmitedFailed = (error) => {
  return {
    type: actionTypes.ORDER_SUBMIT_FAIL,
    error,
  };
};

const orderSubmitStarted = () => {
  return {
    type: actionTypes.ORDER_SUBMIT_START,
  };
};

export const submitOrder = (orderData, token) => {
  return (dispatch) => {
    dispatch(orderSubmitStarted());
    axiosInstance
      .post("orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log("Response at post...", response);
        dispatch(orderSubmitSucceded(response.data.name, orderData));
      })
      .catch((error) => {
        console.log(error);
        dispatch(orderSubmitedFailed(error));
      });
  };
};

export const orderInit = () => {
  return {
    type: actionTypes.ORDER_INIT,
  };
};

const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axiosInstance
      .get("orders.json?auth=" + token)
      .then((res) => {
        const orders = [];
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch((e) => {
        dispatch(fetchOrdersFail());
      });
  };
};

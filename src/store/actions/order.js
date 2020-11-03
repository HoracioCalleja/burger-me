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

export const submitOrder = (orderData) => {
  return (dispatch) => {
    dispatch(orderSubmitStarted());
    axiosInstance
      .post("orders.json", orderData)
      .then((response) => {
        console.log('Response at post...', response)
        dispatch(orderSubmitSucceded(response.data.name, orderData));
      })
      .catch((error) => {
        console.log(error)
        dispatch(orderSubmitedFailed(error));
      });
  };
};

export const orderInit = () => {
  return {
    type: actionTypes.ORDER_INIT,
  };
};

const fetchOrdersSucceded = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

const fetchOrdersStarted = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

const fetchOrdersFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStarted());
    axiosInstance
      .get("orders.json")
      .then((res) => {
        const orders = [];
        for (let key in res.data) {
          orders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSucceded(orders));
      })
      .catch((e) => {
        fetchOrdersFailed();
      });
  };
};

import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_INIT:
      return orderInit(state, action);
    case actionTypes.ORDER_SUBMIT_SUCCESS:
      return orderSubmitSucceded(state, action);
    case actionTypes.ORDER_SUBMIT_FAIL:
      return orderSubmitFailed(state, action);
    case actionTypes.ORDER_SUBMIT_START:
      return orderSubmitStarted(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStarted(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSucceded(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFailed(state, action);
    default:
      return state;
  }
};

const orderSubmitSucceded = (state, action) => {
  const newOrder = { ...action.orderData, id: action.orderId };
  const updatedAttributes = {
    orders: state.orders.concat(newOrder),
    purchased: true,
    loading: false,
  };
  return updateObject(state, updatedAttributes);
};

const orderInit = (state, action) => {
  return updateObject(state, { purchased: false });
};

const orderSubmitFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

const orderSubmitStarted = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersStarted = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSucceded = (state, action) => {
  const updatedAttributes = {
    orders: action.orders,
    loading: false,
  };
  return updateObject(state, updatedAttributes);
};

const fetchOrdersFailed = (state, action) => {
  return updateObject(state, { loading: false });
};

export default reducer;

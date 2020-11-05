import * as actionTypes from "../actions/actionTypes";
import updateObject from "../../utility";

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
      return orderSubmitSuccess(state, action);
    case actionTypes.ORDER_SUBMIT_FAIL:
      return orderSubmitFail(state, action);
    case actionTypes.ORDER_SUBMIT_START:
      return orderSubmitStart(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

const orderSubmitSuccess = (state, action) => {
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

const orderSubmitFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const orderSubmitStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
  const updatedAttributes = {
    orders: action.orders,
    loading: false,
  };
  return updateObject(state, updatedAttributes);
};

const fetchOrdersFail= (state, action) => {
  return updateObject(state, { loading: false });
};

export default reducer;

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_INIT: {
      return {
        ...state,
        purchased: false,
      };
    }
    case actionTypes.ORDER_SUBMIT_SUCCEEDED: {
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        purchased: true,
        loading: false,
      };
    }
    case actionTypes.ORDER_SUBMIT_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case actionTypes.ORDER_SUBMIT_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_ORDERS_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.FETCH_ORDERS_SUCCEDED: {
      return {
        ...state,
        orders : action.orders,
        loading: false,
      };
    }
    case actionTypes.FETCH_ORDERS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;

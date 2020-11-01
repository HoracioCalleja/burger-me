import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_SUBMIT_SUCCESS: {
      const newOrder = { ...action.orderData, id: action.orderId };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    }
    case actionTypes.ORDER_SUBMIT_FAILED: {
      return {};
    }
    case actionTypes.ORDER_SUBMIT_STARTED: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;

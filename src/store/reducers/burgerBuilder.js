import * as actionTypes from "../actions/actionTypes";

const INITIAL_PRICE = 4;
const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  bacon: 1,
  meat: 1.2,
};

const initialState = {
  ingredients: null,
  price: INITIAL_PRICE,
  error: false,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...action.ingredients,
        },
        price: INITIAL_PRICE,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: action.isLoading,
      };
    default:
      return state;
  }
};

export default reducer;

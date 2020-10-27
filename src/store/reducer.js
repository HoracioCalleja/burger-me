import * as actionTypes from "./actions";

const initialState = {
  ingredients: { meat: 0, salad: 0, bacon: 0, cheese: 0 },
  price: 4,
};

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  bacon: 1,
  meat: 1.2,
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
        price : state.price + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        price : state.price - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.CLEAR_ORDER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;

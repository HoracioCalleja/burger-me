import * as actionTypes from "./actions";

const initialState = {
  ingredients: { meat: 0, salad: 0, bacon: 0, cheese: 0 },
  price: 4,
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
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
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

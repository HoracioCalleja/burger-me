import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

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
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAIL:
      return setIngredientsFailed(state, action);
    case actionTypes.LOADING:
      return loading(state, action);
    default:
      return state;
  }
};

const addIngredient = (state, action) => {
  const ingredientAdded = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, ingredientAdded);
  const updatedAttributes = {
    ingredients: updatedIngredients,
    price: state.price + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedAttributes);
};

const removeIngredient = (state, action) => {
  const ingredientRemoved = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredients = updateObject(state.ingredients, ingredientRemoved);
  const updatedAttributes = {
    ingredients: updatedIngredients,
    price: state.price - INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedAttributes);
};

const setIngredients = (state, action) => {
  const updatedAttributes = {
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      bacon: action.ingredients.bacon,
      meat: action.ingredients.meat,
    },
    price: INITIAL_PRICE,
    loading: false,
  };
  return updateObject(state, updatedAttributes);
};

const setIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true, loading: false });
};

const loading = (state, action) => {
  return updateObject(state, { loading: true });
};

export default reducer;

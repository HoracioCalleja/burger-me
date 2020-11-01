import * as actionTypes from "./actionTypes";
import axiosInstance from "../../axios-orders";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName,
  };
};

export const clearOrder = () => {
  initIngredients();
};

const setIngredients = (ingredients) => {

  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    dispatch(loading(true));
    axiosInstance
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
        dispatch(loading(false));
      })
      .catch((error) => {
        dispatch(loading(true));
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const loading = (isLoading) => {
  return {
    type: actionTypes.LOADING,
    isLoading,
  };
};

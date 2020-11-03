import * as actionTypes from "../actions/actionTypes";
import updateObject from "../utility";

const initialState = {
  token: null,
  error: null,
  userId: null,
  loading: false,
};

const authStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const authSucces = (state, action) => {
  return updateObject(state, {
    token: action.tokenId,
    userId: action.userId,
    loading: false,
    error: null,
  });
};

const authFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const logout = (state, action) => {
  return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: {
      return authStart(state, action);
    }
    case actionTypes.AUTH_SUCCESS: {
      return authSucces(state, action);
    }
    case actionTypes.AUTH_FAIL: {
      return authFail(state, action);
    }
    case actionTypes.LOGOUT: {
      return logout(state, action);
    }
    default:
      return state;
  }
};

export default reducer;

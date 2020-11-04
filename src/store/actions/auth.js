import * as actionTypes from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

const authSuccess = (tokenId, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    tokenId,
    userId,
  };
};

const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

const willLogOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  console.log(email, password, isSignUp);
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3EK8qH_CW49dQUS7r1sznH02rZn8ShnI`;
    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3EK8qH_CW49dQUS7r1sznH02rZn8ShnI`;
    }
    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data);
        const { idToken, localId, expiresIn } = response.data;
        dispatch(authSuccess(idToken, localId));
        dispatch(willLogOut(expiresIn));
      })
      .catch((error) => {
        let { code, message } = error.response.data.error;
        let errorMessage = `Error ${code} - ${message}`;
        dispatch(authFail(errorMessage));
      });
  };
};

export const setRedirectAuthPath = (path) => {
  return {
    type : actionTypes.SET_REDIRECT_AUTH_PATH,
    path,
  }
}

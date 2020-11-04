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
  removeLocalStorageTokens();
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
        const { idToken, localId, expiresIn } = response.data;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        setLocalStorageTokens(idToken, localId, expirationDate);
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
    type: actionTypes.SET_REDIRECT_AUTH_PATH,
    path,
  };
};

export const checkTokens = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        console.log('logginout')
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSuccess(token, userId));
        dispatch(willLogOut(expiresIn));
      }
    }
  };
};

const setLocalStorageTokens = (token, localId, expirationDate) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", localId);
  localStorage.setItem("expirationDate", expirationDate);
};

const removeLocalStorageTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
};

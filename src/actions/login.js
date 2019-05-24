import {
  USER_LOGIN,
  USER_SIGN_OUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE
} from "../constants";

export const userLogin = accessToken => ({
  type: USER_LOGIN,
  accessToken
});

export const successfulLogin = () => ({ type: USER_LOGIN_SUCCESS });

export const failedLogin = () => ({ type: USER_LOGIN_FAILURE });

export const userLogout = () => ({ type: USER_SIGN_OUT });

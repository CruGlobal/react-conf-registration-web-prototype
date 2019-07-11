import {
  USER_LOGIN,
  USER_SIGN_OUT,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  SET_CRS_TOKEN
} from "../constants";

import APIController from "../Controllers/apicontroller";

const API = new APIController();

export const userLogin = accessToken => {
  return dispatch => {
    loginUser(dispatch, accessToken);
  };
};

const loginUser = async (dispatch, accessToken) => {
  try {
    API.getUser(`${API.BASE_URL}${API.PROFILE_SEARCH}`, accessToken)
      .then(res => res.json())
      .then(response => {
        if (response.error) {
          dispatch({
            type: USER_LOGIN_FAILURE,
            profile: {}
          });
        } else {
          dispatch({
            type: USER_LOGIN,
            profile: response
          });
        }
      });
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      profile: {}
    });
  }
  dispatch({
    type: SET_CRS_TOKEN,
    crsToken: accessToken
  });
};

export const successfulLogin = () => ({ type: USER_LOGIN_SUCCESS });

export const failedLogin = () => ({ type: USER_LOGIN_FAILURE });

export const userLogout = () => ({ type: USER_SIGN_OUT });

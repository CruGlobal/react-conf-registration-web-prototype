import {
  USER_LOGIN_SUCCESS,
  APPLICATION_INIT,
  CRS_TOKEN,
  USER_LOGIN,
  USER_LOGIN_FAILURE,
  SET_USER_PROFILE,
  USER_SIGN_OUT,
  SET_CRS_TOKEN
} from "../constants";

const initialState = {
  crsToken: "",
  loginState: false,
  profile: {}
};

const authenticationReducer = (
  state = initialState,
  { type, crsToken, profile }
) => {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        profile: profile
      };
    case SET_CRS_TOKEN:
      return {
        ...state,
        crsToken: crsToken
      };

    case APPLICATION_INIT:
      return {
        ...state,
        crsToken: localStorage.getItem(CRS_TOKEN) || state.crsToken
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginState: true
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loginState: false
      };

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: profile
      };

    case USER_SIGN_OUT:
      localStorage.removeItem("crsToken");
      return {
        ...state,
        profile: {},
        crsToken: "",
        loginState: false
      };
    default:
      return state;
  }
};

export default authenticationReducer;

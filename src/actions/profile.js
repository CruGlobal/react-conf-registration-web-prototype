import { SET_USER_PROFILE, AUTH_USER_PROFILE } from "../constants";

export const setProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
});

export const authProfile = profile => ({
  type: AUTH_USER_PROFILE,
  profile
});

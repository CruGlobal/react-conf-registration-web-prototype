import { SET_USER_PROFILE } from "../constants";

export const setProfile = profile => ({
  type: SET_USER_PROFILE,
  profile
});

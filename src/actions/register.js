import { IS_LOADING, GET_CURRENT_CONFERENCE } from "../constants";
import APIController from "../Controllers/apicontroller";

const API = new APIController();

export const selectConference = (authToken, confID) => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    setCurrentConference(dispatch, confID, authToken);
  };
};

const setCurrentConference = async (dispatch, confID, authToken) => {
  try {
    API.getSelectedConference(
      `${API.BASE_URL}${API.SELECTED_CONFERENCE}${confID}`,
      authToken
    )
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: GET_CURRENT_CONFERENCE,
          selectedConference: response,
          isLoading: false
        });
      });
  } catch (err) {
    dispatch({
      type: GET_CURRENT_CONFERENCE,
      conferences: []
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

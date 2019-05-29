import { CONFERENCE_SEARCH, IS_LOADING } from "../constants";

import APIController from "../Controllers/apicontroller";

const API = new APIController();

export const conferenceSearch = searchQuery => {
  return dispatch => {
    dispatch({
      type: IS_LOADING,
      isLoading: true
    });
    setConferences(dispatch, searchQuery);
  };
};

const setConferences = async (dispatch, searchQuery) => {
  try {
    API.getConferences(
      `${API.BASE_URL}${API.CONFERENCE_SEARCH_NAME}${searchQuery}`
    )
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: CONFERENCE_SEARCH,
          conferences: response,
          isLoading: false
        });
      });
  } catch (err) {
    dispatch({
      type: CONFERENCE_SEARCH,
      conferences: []
    });
  }
  dispatch({
    type: IS_LOADING,
    isLoading: true
  });
};

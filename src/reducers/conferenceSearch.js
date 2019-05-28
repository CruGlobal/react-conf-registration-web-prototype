import { CONFERENCE_SEARCH, IS_LOADING } from "../constants";

const initialState = {
  conferences: [],
  selectedConference: [],
  isLoading: false
};

const conferenceReducer = (
  state = initialState,
  { type, conferences, isLoading }
) => {
  switch (type) {
    case CONFERENCE_SEARCH:
      return {
        ...state,
        conferences: conferences,
        isLoading: isLoading
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: isLoading
      };
    default:
      return {
        ...state
      };
  }
};

export default conferenceReducer;

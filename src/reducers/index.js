import { combineReducers } from "redux";
import authenticationReducer from "./authentication";
import conferenceReducer from "./conference";

const rootReducer = combineReducers({
  authenticationReducer,
  conferenceReducer
});

export default rootReducer;

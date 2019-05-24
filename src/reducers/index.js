import { combineReducers } from "redux";
import authenticationReducer from "./authentication";

const rootReducer = combineReducers({
  authenticationReducer
});

export default rootReducer;

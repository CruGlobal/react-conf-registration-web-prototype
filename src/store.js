import { createStore as createReduxStore } from "redux";
import rootReducer from "./reducers";

export const createStore = (initialState = {}) => {
  const store = createReduxStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

import {
  createStore as createReduxStore,
  compose,
  applyMiddleware
} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export const createStore = (initialState = {}) => {
  const store = createReduxStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),

      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
  return store;
};

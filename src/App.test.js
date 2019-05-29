import React from "react";
import App from "./App";
import { render } from "react-testing-library";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
it("renders without crashing", () => {
  const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

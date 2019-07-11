import React from "react";
import App from "./App";
import { render } from "react-testing-library";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
it("renders without crashing", () => {
  const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
});

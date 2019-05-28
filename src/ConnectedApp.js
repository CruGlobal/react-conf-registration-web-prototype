import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "./store";
import App from "./App";

class ConnectedApp extends Component {
  constructor(props) {
    super(props);

    this.store = createStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default ConnectedApp;

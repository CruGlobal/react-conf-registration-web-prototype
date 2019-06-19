import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "./store";
import App from "./App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
class ConnectedApp extends Component {
  constructor(props) {
    super(props);

    this.customHistory = createBrowserHistory();
    this.store = createStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <Router history={this.customHistory}>
          <App />
        </Router>
      </Provider>
    );
  }
}

export default ConnectedApp;

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@fontsource/roboto";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";
import reducer from "./reducer";
import GlobalSpinnerContext from "./global";

const storewith = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider
    store={storewith(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,

  document.getElementById("root")
);

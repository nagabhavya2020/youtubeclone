import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import {applyMiddleware, compose} from 'redux'
import {createStore} from 'redux'
import {thunk} from "redux-thunk"
import Reducers from "./Reducers"
import { SocketContextProvider } from "./Pages/Auth/Socket";

const store= createStore(Reducers,compose(applyMiddleware(thunk)))

// const root = createRoot(document.getElementById("root"));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <SocketContextProvider>

      <App />
      </SocketContextProvider>
    </React.StrictMode>
  </Provider>,
    document.getElementById("root")

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
import { Router } from "@reach/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <h1 className="heading">React Redux- APP</h1>
        <Router>
          <HomePage path="/" />
          <ProductDetails path="productdetails/:id" />
        </Router>

        <div className="footer">
          <div className="flex items-center">
            <p className="pr-2">Created By </p>
            <FontAwesomeIcon icon={faPenAlt} className="pen-icon" />
          </div>
          <p>PRIYANKA NISHAD</p>
        </div> */}

        <HomePage path="/" />
      </div>
    </Provider>
  );
}

export default App;

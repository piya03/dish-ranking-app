import React from "react";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
import Logout from "./CommonComponent/Logout";
import { activeuser } from "./reducers";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Logout />

        <HomePage path="/" />
      </div>
    </Provider>
  );
}

export default App;

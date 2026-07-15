import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import App from "./App";
import { store } from "./redux/store";

import "./styles/global.css";
import "./styles/variables.css";
import "./styles/theme.css";
import "./styles/layout.css";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
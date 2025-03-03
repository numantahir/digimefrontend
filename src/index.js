import React from "react";
import ReactDOM from "react-dom/client"; // Use createRoot instead of render
import App from "./App";
import "./assets/css/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

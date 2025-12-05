// FILE: src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import "./index.css"; //styles

// Create React root and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App /> {/* Main App component */}
  </React.StrictMode>
);

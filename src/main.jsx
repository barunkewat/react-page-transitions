import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import {
  BrowserRouter as Router,
  Route, 
  Routes,
  useLocation,
} from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
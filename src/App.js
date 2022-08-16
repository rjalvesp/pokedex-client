import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { BaseRoutes } from "./App.routes";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {BaseRoutes.map((route, index) => (
            <Route key={`main-router-${index}`} {...route} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

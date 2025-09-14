import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Cursor from "./components/ui/Cursor.jsx";
import Home from "./components/HomePage.jsx";
import Projects from "./components/Projects.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Cursor />
    <HashRouter>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </App>
    </HashRouter>
  </React.StrictMode>
);
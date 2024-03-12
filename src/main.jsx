import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/scss/main.scss";
import { ThemeProvider } from "./context/Theme";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <GlobalProvider>
          <Routes>
            <Route exact path="/*" element={<App />} />
          </Routes>
        </GlobalProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

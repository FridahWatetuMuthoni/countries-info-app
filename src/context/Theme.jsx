import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  //Getting the system set theme
  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme:dark)");
    const currentTheme = darkMediaQuery.matches ? "dark" : "light";
    setTheme(currentTheme);
    localStorage.setItem("theme", currentTheme);
    darkMediaQuery.addEventListener("change", (e) => {
      const theme = e.matches ? "dark" : "light";
      setTheme(theme);
      localStorage.setItem("theme", theme);
    });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const name = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", name);
    setTheme(name);
  };

  const data = {
    theme,
    toggleTheme,
  };
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export { ThemeProvider, ThemeContext };

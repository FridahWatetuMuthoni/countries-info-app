import { useContext } from "react";
import { ThemeContext } from "../context/Theme";

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;

import "./Navbar.scss";
import { FaSun, FaMoon } from "react-icons/fa";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="navigation">
      <h1>Where in the world?</h1>
      <section>
        {theme === "dark" ? (
          <section className="mode-icons">
            <FaSun onClick={toggleTheme} />
            <p>Dark Mode</p>
          </section>
        ) : (
          <section className="mode-icons">
            <FaMoon onClick={toggleTheme} />
            <p>Light Mode</p>
          </section>
        )}
      </section>
    </nav>
  );
}

export default Navbar;

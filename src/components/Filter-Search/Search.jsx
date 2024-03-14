import { FaSearch } from "react-icons/fa";
import useGlobalContext from "../../hooks/useGlobalContext";
import { useEffect, useState } from "react";

function Search() {
  const { setSearch, countries } = useGlobalContext();
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (input.trim() !== "") {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [input, countries]);

  const handleSearch = (e) => {
    setInput(e.target.value);
    if (e.target.value.trim() !== "") {
      setShowDropDown(true);
    }
  };

  const handleClick = (name) => {
    setSearch(name);
    setShowDropDown(false);
  };

  const renderDropDown = () => {
    return (
      <ul className={`dropdown-menu ${showDropDown ? "show" : "hide"}`}>
        {filteredCountries.map((result) => {
          return (
            <li
              className="dropdown-item"
              key={result.name.common}
              onClick={() => handleClick(result.name.common)}
            >
              {result.name.common}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className="search-content">
      <section className="input-field">
        <FaSearch className="search" />
        <input
          className="input"
          type="text"
          placeholder="Search for a country..."
          value={input}
          onChange={handleSearch}
        />
      </section>
      <section>{filteredCountries.length > 0 && renderDropDown()}</section>
    </section>
  );
}

export default Search;

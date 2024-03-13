import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <section className="input-field">
      <FaSearch className="search" />
      <input
        className="input"
        type="text"
        placeholder="Search for a country..."
      />
    </section>
  );
}

export default Search;

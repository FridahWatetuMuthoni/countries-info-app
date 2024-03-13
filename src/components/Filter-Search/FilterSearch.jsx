import "./styles.scss";
import Filter from "./Filter";
import Search from "./Search";

function FilterSearch() {
  return (
    <section className="filter-search">
      <Search />
      <Filter />
    </section>
  );
}

export default FilterSearch;

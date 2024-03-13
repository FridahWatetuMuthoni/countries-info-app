function Filter() {
  const regions = ["Africa", "Europe", "Asia", "Oceania", "Americas"];
  return (
    <section>
      <select name="region" id="region" className="select">
        {regions.map((region) => {
          return (
            <option className="option" value={region} key={region}>
              {region}
            </option>
          );
        })}
      </select>
    </section>
  );
}

export default Filter;

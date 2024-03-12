import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        let url;
        if (search) {
          url = `https://restcountries.com/v3.1/name/${search}`;
        } else {
          url = "https://restcountries.com/v3.1/all";
        }

        const response = await axios.get(url);
        const data = response.data;

        if (data && data.length > 0 && isMounted) {
          setCountries(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setErrMsg(error.message);
        setLoading(false);
      }
    };

    fetchData();

    return () => (isMounted = false);
  }, [search]);

  const data = {
    countries,
    search,
    setSearch,
    loading,
    errMsg,
  };

  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node,
};

export { GlobalContext, GlobalProvider };

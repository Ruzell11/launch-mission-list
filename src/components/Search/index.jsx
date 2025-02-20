import React, { useState, useEffect } from "react";
import "./search.scss";
import { useLaunchContext } from "../../store";

const Search = () => {
  const { launchesMissionData, setFilteredLaunchesData,  } = useLaunchContext();
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");

  useEffect(() => {
   
    if (query) {
      const filteredResults = launchesMissionData.filter((item) =>
        item.mission_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLaunchesData(filteredResults);
    } else {
      setFilteredLaunchesData(launchesMissionData);
    }
  }, [query, launchesMissionData, setFilteredLaunchesData]);

  const onChangeFilterData = (stringFilter) => {
    setQuery(stringFilter);
    localStorage.setItem("searchQuery", stringFilter);

    if (stringFilter === "") {
      setFilteredLaunchesData(launchesMissionData);
      return;
    }

    const filteredResults = launchesMissionData.filter((item) =>
      item.mission_name.toLowerCase().includes(stringFilter.toLowerCase())
    );

    setFilteredLaunchesData(filteredResults);
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onChangeFilterData(e.target.value)}
      />
    </div>
  );
};

export default Search;

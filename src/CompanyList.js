import React from "react";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";

const CompanyList = ({ companies, keyword, setKeyword }) => {
  const handleChange = (e) => {
    setKeyword(() => e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="searchBar"
          placeholder="Search for a company"
          name="searchBar"
          type="text"
          value={keyword}
          onChange={handleChange}
        />
      </form>
      <ul>
        {companies.map((c) => (
          <CompanyCard company={c} key={c.handle} />
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;

import React from "react";
import { useHistory } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ company }) => {
  const history = useHistory();
  const handleClick = (e) => {
    history.push(`/companies/${company.handle}`);
  };
  return (
    <div className="CompanyCard" onClick={handleClick}>
      <div className="CompanyCard-name">{company.name}</div>
      <div className="CompanyCard-description">{company.description}</div>
      <p>Size: {company.numEmployees} employees</p>
      {company.logoUrl ? (
        <img src={company.logoUrl} alt="company logo" />
      ) : (
        <img src="/logos/default.png" alt="company logo" />
      )}
    </div>
  );
};

export default CompanyCard;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api";
import Job from "./Job";
import "./CompanyDetail.css";

const CompanyDetail = () => {
  // Get handle from url:
  const { handle } = useParams();
  // set up state to hold company info
  const [company, setCompany] = useState(null);

  // fetch company info from api with useEffect
  useEffect(() => {
    async function getCompany() {
      let res = await JoblyApi.getCompany(handle);

      setCompany(res);
    }

    getCompany();
  }, [handle]);

  return (
    <div className="CompanyDetail">
      {!company ? (
        <span>Loading....</span>
      ) : (
        <>
          <h1>{company.name}</h1>
          <p className="CompanyDetail-description">{company.description}</p>
          <p>Size: {company.numEmployees} employees</p>
          {company.logoUrl ? (
            <img src={company.logoUrl} alt="company logo" />
          ) : (
            <img src="/logos/default.png" alt="company logo" />
          )}
        </>
      )}
      <h2>Jobs:</h2>
      <ul>
        {company ? (
          company.jobs.map((j) => <Job job={j} key={j.id} />)
        ) : (
          <span>Loading...</span>
        )}
      </ul>
    </div>
  );
};

export default CompanyDetail;

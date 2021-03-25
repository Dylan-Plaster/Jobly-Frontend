import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

import "./Job.css";

const Job = ({ job }) => {
  const { apply, currUser } = useContext(UserContext);

  return currUser ? (
    <div className="Job">
      <h3 className="Job-title ml-3">{job.title}</h3>
      <h5 className="Job-company">
        <Link to={`/companies/${job.companyHandle}`}>{job.companyName}</Link>
      </h5>
      <span className="Job-salary">Salary: ${job.salary}</span>
      <span className="Job-equity">equity: {job.equity ? job.equity : 0}</span>

      {currUser.applications.includes(job.id) ? (
        <button className="btn btn-success mr-3">Applied!</button>
      ) : (
        <button
          className="btn btn-primary mr-3"
          onClick={() => {
            console.log(currUser.username, job.id);
            apply(currUser.username, job.id);
          }}
        >
          Apply
        </button>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Job;

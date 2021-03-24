import React from "react";
import Job from "./Job";

const JobList = ({ jobs }) => {
  return (
    <div>
      <h1>Jobs:</h1>
      <ul>
        {jobs.map((j) => (
          <Job job={j} key={j.id} />
        ))}
      </ul>
    </div>
  );
};

export default JobList;

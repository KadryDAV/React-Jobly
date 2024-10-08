import React from "react";
import JobCard from "./JobCard";

/** Show list of job cards.
 *
 * Used by both Jobs and CompanyInfo to list jobs.
 *
 * Jobs -> JobCards -> JobCard
 * CompanyInfo -> JobCards -> JobCard
 *
 */

const JobCards = ({ jobs }) => {
  //console.debug("JobCards", "jobs=", jobs);

  return (
    <div className="JobCards">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
        />
      ))}
    </div>
  );
};

export default JobCards;

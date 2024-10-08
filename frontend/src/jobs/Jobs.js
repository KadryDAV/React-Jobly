import React, { useState, useEffect } from "react";

import JoblyApi from "../common/api";
import Search from "../forms/Search";
import JobCards from "./JobCards";
import Spinner from "../common/Spinner";

/** Show list of all jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * Jobs -> JobCards -> JobCard
 *
 * Routed at /jobs
 */

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.debug("Jobs useEffect getJobsOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads jobs. */
  async function search(title) {
    let result = await JoblyApi.getJobs(title);
    setJobs(result);
    setIsLoading(false);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="Jobs col-md-8 offset-md-2">
      <Search search={search} />
      {jobs.length ? (
        <JobCards jobs={jobs} />
      ) : (
        <p className="message">
          There are no openings at this time. Please check back later!
        </p>
      )}
    </div>
  );
};

export default Jobs;

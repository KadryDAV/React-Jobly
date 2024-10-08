import React, { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import JobCard from "./JobCard";
import JoblyApi from "../common/api";
import Spinner from "../common/Spinner";

/** Shows list of jobs that currentUser has applied to
 *
 * Routes -> Profile -> Applications
 *
 */

const Applications = () => {
  const { currentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState(currentUser.applications);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      let appData = [];
      await currentUser.applications.map((id) => {
        return appData.push(JoblyApi.getJobsByID(id));
      });
      let jobsArr = await Promise.all(appData);
      setJobs(jobsArr);
      setIsLoading(false);
    }
    getCompany();
  }, [currentUser.applications]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {jobs.length ? (
        jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
          />
        ))
      ) : (
        <p>
          You have not applied to any jobs yet! <a href="/jobs">Find some</a>
        </p>
      )}
    </div>
  );
};

export default Applications;

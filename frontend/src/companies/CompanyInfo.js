import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import JoblyApi from "../common/api";
import JobCards from "../jobs/JobCards";
import Spinner from "../common/Spinner";

/** Show details on a company
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyInfo -> JobCards
 */

const CompanyInfo = () => {
  const { handle } = useParams();
  console.debug("CompanyInfo", "handle=", handle);

  const [company, setCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      let result = await JoblyApi.getCompany(handle);
      setCompany(result);
      setIsLoading(false);
    }
    getCompany();
  }, [handle]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="CompanyInfo col-md-8 offset-md-2">
      <h2>
        {company.name}
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt="company logo"
            className="float-right ml-5"
            style={{ width: "4em" }}
          />
        ) : null}
      </h2>
      <p>{company.description}</p>
      <JobCards jobs={company.jobs} />
    </div>
  );
};

export default CompanyInfo;

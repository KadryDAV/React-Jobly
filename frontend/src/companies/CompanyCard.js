import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle } from "reactstrap";
import "./CompanyCard.css";

/** Show simple information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * Companies -> CompanyCard
 */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard">
      <Card className="CompanyCard mb-3">
        <CardBody>
          <CardTitle>
            {name}
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="company logo"
                className="float-right ml-5"
                style={{ width: "5em" }}
              />
            ) : null}
          </CardTitle>
          <p>{description}</p>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CompanyCard;

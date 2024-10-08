import React, { useState } from "react";
import { Input, Button } from "reactstrap";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `search` function prop that runs in a parent to do the
 * searching.
 *
 * { Companies, JobList } -> Search
 */

const Search = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /** Update form fields */
  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  /** Tell parent to filter */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // take care of accidentally trying to search for just spaces
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div className="Search mb-4">
      <form onSubmit={handleSubmit}>
        <Input
          className="form-control"
          name="searchTerm"
          type="search"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit" color="warning" className="mt-3">
          Search
        </Button>
      </form>
    </div>
  );
};

export default Search;

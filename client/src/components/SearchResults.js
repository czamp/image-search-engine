import React from "react";

const SearchResults = ({ searchResults }) => (
  <section className="section">
    <div className="container">
      <div className={"tile is-ancestor"}>
        <div className="tile is-parent">
          {searchResults.map(result => (
            <div className={"tile is-child"}>

            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default SearchResults;

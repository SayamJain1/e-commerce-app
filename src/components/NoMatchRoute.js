import React from "react";
import { Link } from "react-router-dom";

function NoMatchRoute() {
  return (
    <div>
      <h3>No Route Match.</h3>
      <Link to="/">
        <button
          style={{
            border: "1px solid black",
            marginBottom: "5px",
            marginLeft: "5px",
          }}
          className="--btn"
        >
          &larr; go back.
        </button>
      </Link>
    </div>
  );
}

export default NoMatchRoute;

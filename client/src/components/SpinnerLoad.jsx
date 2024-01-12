import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "../css/css-components/spinner.css";

// SpinnerLoad component for showing a loading indicator
const SpinnerLoad = () => {
  return (
    <Spinner
      className="spin-btn"
      size="sm"
      as="span"
      animation="border"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default SpinnerLoad;

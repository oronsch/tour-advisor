import React from "react";
/**
 * NotFound component - Displays when a user navigates to a route that doesn't exist.
 */
const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Image to indicate the page is not found */}
      <img
        src="/images/page-not-found.jpg"
        alt="Page Not Found"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

export default NotFound;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  // State to keep track of the countdown
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    // Setting up an interval to decrement the countdown
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    // When countdown reaches zero, navigate to the login page
    if (count === 0) navigate("/login");

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div style={{ marginTop: "100px" }}>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;

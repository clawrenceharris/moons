import React from "react";
import "./NotFound.css";

const NotFound = ({ message }: { message?: string }) => {
  return (
    <div className="not-found-container">
      <h1>404 - Not Found</h1>
      <p>{message || "Sorry, the page you are looking for does not exist."}</p>
    </div>
  );
};

export default NotFound;

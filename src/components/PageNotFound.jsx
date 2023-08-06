import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div class="container mt-3">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center">Page Not Found</h1>
          <p class="text-center">
            The page you are looking for does not exist.
          </p>
          <div
            href="/"
            class="btn btn-primary btn-lg mt-5 mx-auto col-4 d-block"
            onClick={() => navigate("/")}
          >
            Go Home
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

import React from "react";

const loading = () => {
  return (
    <div className="container py-5 ">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="nh-loading-content vh-100 d-flex justify-content-center align-items-center ">
            <div className="lds-spinner">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;

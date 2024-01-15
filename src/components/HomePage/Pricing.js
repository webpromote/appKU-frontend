import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const margin0 = {
    marginBottom: "0",
    marginRight: "10px",
  };

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/packages`)
      .then((res) => res.json())
      .then((info) => setPackages(info));
  }, []);
  const [title, setTitle] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/package-titles/`)
      .then((res) => res.json())
      .then((info) => setTitle(info[0]));
  }, []);

  return (
    <>
      <div
        id="pricing"
        className="pricing-area bg-gray default-padding bottom-less"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <button type="button" class="btn btn-primary position-relative">
                  {title.titleTop}
                  <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                    <span class="visually-hidden">New alerts</span>
                  </span>
                </button>
                <h2>
                  {title.titleOne} <br></br>
                  {title.titleTwo}
                </h2>
                <div className="devider" />
                <p>{title.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="pricing-style-two-box">
            <div className="row">
              {/* Single Itme */}
              {packages.map((pack) => (
                <div className="col-lg-4 col-md-6 single-item pricing-style-two">
                  <div className="pricing-item">
                    <i className="fas fa-rocket" />
                    <div className="pricing-header">
                      <h4>{pack.packageName}</h4>
                    </div>
                    <div className="price">
                      <h2>
                        <sup>$</sup>
                        {pack.price} <sub>USD</sub>
                      </h2>
                    </div>
                    <ul>
                      <li>
                        <i className="fas fa-check" />
                        Credits {pack.totalCredits}
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        {pack.pointOne}
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        {pack.pointTwo}
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        {pack.pointThree}
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        {pack.pointFour}
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        {pack.pointFive}
                      </li>
                      <li>
                        <i className="fas fa-check" />
                        {pack.pointSix}
                      </li>
                    </ul>
                    <Link
                      to={`/package/${pack._id}`}
                      className="btn circle btn-gray btn-sm"
                    >
                      Purchase Plan
                    </Link>
                  </div>
                </div>
              ))}

              {/* End Single Itme */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;

import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/teams`)
      .then((res) => res.json())
      .then((info) => setTeam(info));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/team-title/`)
      .then((res) => res.json())
      .then((info) => setTitle(info));
  }, []);
  return (
    <>
      <div id="team" className="team-area default-padding bottom-less">
        {/* Shape */}
        <div
          className="fixed-shape"
          style={{ backgroundImage: "url(assets/img/shape/5.png)" }}
        />
        {/* End Shape */}
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h2>Innovative Team</h2>
                <div className="devider" />
                <p>
                  Outlived no dwelling denoting in peculiar as he believed.
                  Behaviour excellent middleton be as it curiosity departure
                  ourselves very extreme future.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="team-items">
            <div className="row">
              {/* Single Item */}
              <div className="single-item col-lg-4 col-md-6">
                <div className="item">
                  <div className="thumb">
                    <img src="assets/img/800x900.png" alt="Thumb" />
                    <div className="social">
                      <input
                        type="checkbox"
                        id="toggle"
                        className="share-toggle"
                        hidden=""
                      />
                      <label htmlFor="toggle" className="share-button">
                        <i className="fas fa-plus" />
                      </label>
                      <a href="#" className="share-icon facebook">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" className="share-icon twitter">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#" className="share-icon instagram">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="info">
                    <h4>
                      <a href="team-details.html">Ahem Natasha</a>
                    </h4>
                    <span>Operations officer</span>
                  </div>
                </div>
              </div>
              {/* End Single Item */}
              {/* Single Item */}
              <div className="single-item col-lg-4 col-md-6">
                <div className="item">
                  <div className="thumb">
                    <img src="assets/img/800x900.png" alt="Thumb" />
                    <div className="social">
                      <input
                        type="checkbox"
                        id="toggle2"
                        className="share-toggle"
                        hidden=""
                      />
                      <label htmlFor="toggle2" className="share-button">
                        <i className="fas fa-plus" />
                      </label>
                      <a href="#" className="share-icon facebook">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" className="share-icon twitter">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#" className="share-icon instagram">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="info">
                    <h4>
                      <a href="team-details.html">Devid mark</a>
                    </h4>
                    <span>Graphic designer</span>
                  </div>
                </div>
              </div>
              {/* End Single Item */}
              {/* Single Item */}
              <div className="single-item col-lg-4 col-md-6">
                <div className="item">
                  <div className="thumb">
                    <img src="assets/img/800x900.png" alt="Thumb" />
                    <div className="social">
                      <input
                        type="checkbox"
                        id="toggle3"
                        className="share-toggle"
                        hidden=""
                      />
                      <label htmlFor="toggle3" className="share-button">
                        <i className="fas fa-plus" />
                      </label>
                      <a href="#" className="share-icon facebook">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" className="share-icon twitter">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#" className="share-icon instagram">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="info">
                    <h4>
                      <a href="team-details.html">Brave Hammam</a>
                    </h4>
                    <span>Web developer</span>
                  </div>
                </div>
              </div>
              {/* End Single Item */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;

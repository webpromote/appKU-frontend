import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import auth from "../firebase.init";
import { TypeAnimation } from "react-type-animation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Banner.css";
import { Button, Modal } from "react-bootstrap";

const Banner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [banner, setBanner] = useState([]);
  const [leads, setLeads] = useState([]);

  const [searchLocation, setSearchLocation] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [copiedContent, setCopiedContent] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Filter function for search
    const filteredData = leads.filter((item) => {
      return (
        item.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        item.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    });
    setFilteredLeads(filteredData);
  }, [searchLocation, searchTitle, leads]);

  useEffect(() => {
    fetch(`http://localhost:5000/banner/`)
      .then((res) => res.json())
      .then((info) => setBanner(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/all-leads/`)
      .then((res) => res.json())
      .then((info) => setLeads(info));
  }, []);

  const handleLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  // Update searchTitle state on Title input change
  const handleTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const copyToClipboard = (content) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success("Copied", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      })
      .catch((err) => {
        toast.error("Copy failed! Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
        console.error("Copy failed: ", err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="banner-area bg-top text-capitalized text-center top-pad-80 auto-height">
        {/* Shape */}
        <div
          className="banner-shape"
          style={{ backgroundImage: "url(assets/img/shape/2.png)" }}
        />
        {/* End Shape */}
        <div className="container">
          <div className="content-box">
            {banner.map((e) => (
              <div className="row align-center">
                <div className="info">
                  <button
                    type="button"
                    className="btn btn-primary position-relative"
                  >
                    {e.bannerToptext}
                    <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  </button>

                  <h2 className="wow fadeInRight" data-wow-defaul="300ms">
                    {e.bannerHeadingText1}
                    <strong>{e.bannerHeadingText2}</strong>
                    <span className="arlo_tm_animation_text_word">
                      <TypeAnimation
                        sequence={[
                          e.typingHeading1,
                          1000,
                          e.typingHeading2,
                          1000,
                          e.typingHeading3,
                          1000,
                        ]}
                        wrapper="span"
                        speed={50}
                        repeat={Infinity}
                      />
                    </span>
                  </h2>
                  <p className="wow fadeInLeft" data-wow-delay="500ms">
                    {e.bannertext}
                  </p>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          placeholder="Location"
                          className="form-control"
                          name="position"
                          value={searchLocation}
                          onChange={handleLocationChange}
                        />
                      </div>
                      <div className="vr"></div>
                      <div className="col-md-5">
                        <input
                          type="text"
                          placeholder="Title"
                          className="form-control"
                          name="location"
                          value={searchTitle}
                          onChange={handleTitleChange}
                        />
                      </div>
                    </div>
                  </form>
                  {(searchLocation || searchTitle) && (
                    <div className="container mt-5">
                      <table className="table table-bordered table-striped bg-white">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Email</th>
                            <th>Website</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredLeads.slice(0, 5).map((lead) => (
                            <tr key={lead._id}>
                              <td>{lead.personName}</td>
                              <td>{lead.title}</td>
                              <td>{lead.personEmail}</td>
                              <td>{lead.website}</td>

                              <div className="copy-icon">
                                <i
                                  className="fas fa-copy"
                                  onClick={() => {
                                    const contentToCopy = `${lead.personEmail}\t${lead.personName}\t${lead.title}\t${lead.website}\t${lead.location}`;
                                    setCopiedContent(contentToCopy);
                                    copyToClipboard(contentToCopy);
                                  }}
                                ></i>
                              </div>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="button wow fadeInDown" data-wow-delay="700ms">
                    <a
                      href="#"
                      className="popup-youtube video-btn"
                      onClick={handleShow}
                    >
                      <i className="fas fa-play" />
                      Watch Promo
                    </a>
                  </div>
                  {banner.map((e) => (
                    <Modal show={show} onHide={handleClose} centered size="lg">
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Watch Promo <i className="fas fa-play" />
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <iframe
                          width="100%"
                          height="600"
                          src={`${e.youtube}`}
                          frameBorder="0"
                          allowFullScreen
                          title="YouTube Video"
                        ></iframe>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  ))}
                </div>
                <div className="col-lg-12">
                  <div className="thumb-inner">
                    <img
                      className="wow fadeInRight bannerIMG"
                      data-wow-delay="900ms"
                      src={e.bannerImage}
                      alt="Thumb"
                    />
                    <img
                      className="wow fadeInLeft"
                      data-wow-delay="1100ms"
                      src={e.bannerImageTwo}
                      alt="Thumb"
                    />
                    <div
                      className="shape-circle wow fadeInLeft"
                      data-wow-delay="1500ms"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

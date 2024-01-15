import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState({});
  const [footer, setFooter] = useState({});
  const [social, setSocial] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-links`)
      .then((res) => res.json())
      .then((info) => setFooter(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/footer-social`)
      .then((res) => res.json())
      .then((info) => setSocial(info[0]));
  }, []);

  const [contact, setContact] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info[0]));
  }, []);

  return (
    <>
      <footer className="bg-dark text-light">
        <div className="container">
          <div className="f-items default-padding">
            <div className="row">
              <div className="col-lg-4 col-md-6 item">
                <div className="f-item about">
                  <img src={logo.logo} alt="Logo" />
                  <p>{footer.FooterAbout}</p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 item">
                <div className="f-item link">
                  <h4 className="widget-title">Quick LInk</h4>
                  <ul>
                    <li>
                      <Link to="/">
                        <i className="fas fa-angle-right" /> Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about-us">
                        <i className="fas fa-angle-right" /> About us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact-us">
                        <i className="fas fa-angle-right" /> Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 item">
                <div className="f-item contact-widget">
                  <h4 className="widget-title">Contact Info</h4>
                  <div className="address">
                    <ul>
                      <li>
                        <div className="icon">
                          <i className="fas fa-home" />
                        </div>
                        <div className="content">
                          <strong>Address:</strong>
                          {contact.address}
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-envelope" />
                        </div>
                        <div className="content">
                          <strong>Email:</strong>
                          <a href={`mailto:${contact.email}`}>
                            {contact.email}
                          </a>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-phone" />
                        </div>
                        <div className="content">
                          <strong>Phone:</strong>

                          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <p>{footer.CopyRight}</p>
              </div>
              <div className="col-lg-6 text-end link">
                <ul>
                  <li>
                    <Link to="/terms-condition">Terms</Link>
                  </li>
                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Bottom */}
      </footer>
    </>
  );
};

export default Footer;

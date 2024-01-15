import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [contact, setContact] = useState({});
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const navigate = useNavigate();

  const notifySuccess = () => {
    toast.success("Message sent successfully!");
  };
  useEffect(() => {
    fetch(`http://localhost:5000/contact/`)
      .then((res) => res.json())
      .then((info) => setContact(info[0]));
  }, []);

  const UserContactMessage = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    const subject = event.target.subject.value;
    const date = event.target.date.value;
    const messageStatus = event.target.messageStatus.value;

    const contact = {
      name,
      email,
      message,
      subject,
      date,
      messageStatus,
    };

    const url = `http://localhost:5000/add-contact-message`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((result) => {
        notifySuccess();
        navigate("/message-sent-success");
      });
  };

  // Function to get the current date in yyyy-MM-dd format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <ToastContainer />

      <>
        <div
          className="breadcrumb-area shadow dark bg-cover text-center text-light mt-5"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <h1>Contact Us</h1>
                <ul className="breadcrumb">
                  <li>
                    <Link to="/">
                      <i className="fas fa-home" /> Home
                    </Link>
                  </li>
                  <li>Contact</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="contact" className="contact-area default-padding">
          <div className="container">
            <div className="contact-content">
              <div className="shape">
                <img
                  src="assets/img/illustration/contact.png"
                  alt="illustration"
                />
              </div>
              <div className="row">
                <div className="col-lg-4 info">
                  <div className="content">
                    <ul>
                      <li>
                        <div className="icon">
                          <i className="fas fa-envelope-open-text" />
                        </div>
                        <div className="info">
                          <h5>Our Email</h5>
                          <a href={`mailto:${contact.email}`}>
                            {contact.email}
                          </a>
                          <br />
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fas fa-map-marker-alt" />
                        </div>
                        <div className="info">
                          <h5>Address</h5>
                          <p>{contact.address}</p>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i class="fas fa-phone"></i>
                        </div>
                        <div className="info">
                          <h5>Phone</h5>
                          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-8 contact-form-box">
                  <div className="form-box">
                    <h2>
                      {contact.titleOne}
                      <br></br>
                      {contact.titleTwo}
                    </h2>

                    <form
                      className="contact-form"
                      onSubmit={UserContactMessage}
                    >
                      <input
                        type="date"
                        hidden
                        className="form-control"
                        name="date"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                      />

                      <input
                        hidden
                        type="text"
                        className="form-control"
                        name="messageStatus"
                        value="UnRead"
                      />

                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input
                              required
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder="Name *"
                            />
                            <span className="alert-error" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              required
                              type="email"
                              className="form-control"
                              name="email"
                              placeholder="Email *"
                            />

                            <span className="alert-error" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <input
                              required
                              type="text"
                              className="form-control"
                              name="subject"
                              placeholder="subject *"
                            />
                            <span className="alert-error" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group comments">
                            <textarea
                              className="form-control"
                              name="message"
                              placeholder="Tell Us *"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <input
                            className="btn circle btn-theme-effect btn-sm bg-info"
                            type="submit"
                            value="Send Message"
                          ></input>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ContactPage;

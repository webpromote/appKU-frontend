import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./LeadsForUserDashboard.css";

const LeadsForUserDashboard = () => {
  const [user] = useAuthState(auth);
  const [leads, setLeads] = useState([]);
  const [profile, setProfile] = useState([]);
  const [myLeads, setMyLeads] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(25);

  useEffect(() => {
    const filteredData = leads.filter((item) => {
      return (
        item.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        item.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        item.industry.toLowerCase().includes(searchIndustry.toLowerCase())
      );
    });
    setFilteredLeads(filteredData);
  }, [searchLocation, searchTitle, leads, searchIndustry]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Shah-Limon/canvaProjectImage/main/LeadData/leads-file.json');
        const data = await response.json();
        
        // Shuffle the leads array using Fisher-Yates algorithm
        const shuffledLeads = shuffleArray(data);

        setLeads(shuffledLeads);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
 
  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => setMyLeads(info));
  }, []);

  const handleLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };
  const handleindustryChange = (event) => {
    setSearchIndustry(event.target.value);
  };

  const handleTitleChange = (event) => {
    setSearchTitle(event.target.value);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const handleAddMyLead = (event, lead) => {
    event.preventDefault();

    const personEmail = lead.personEmail;
    const personName = lead.personName;
    const title = lead.title;
    const website = lead.website;
    const location = lead.location;
    const leadAdded = user?.email;
    const industry = lead.industry;
    const credit = lead.credit;

    const order = {
      personEmail,
      personName,
      title,
      website,
      location,
      leadAdded,
      industry,
      credit,
    };
    fetch("http://localhost:5000/add-my-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((result) => {
        const userProfileIndex = profile.findIndex(
          (p) => p.userEmail === user?.email
        );

        if (userProfileIndex !== -1) {
          const updatedProfile = [...profile];
          updatedProfile[userProfileIndex] = {
            ...updatedProfile[userProfileIndex],
            userPoint: (
              parseInt(updatedProfile[userProfileIndex].userPoint) - 1
            ).toString(),
          };
          setProfile(updatedProfile);

          const userId = updatedProfile[userProfileIndex]._id;
          const url = `http://localhost:5000/update-credit/${userId}`;
          fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userPoint: updatedProfile[userProfileIndex].userPoint,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("User profile updated successfully");
              setMyLeads((prevMyLeads) => [...prevMyLeads, lead]);
              setFilteredLeads((prevFilteredLeads) =>
                prevFilteredLeads.filter(
                  (filteredLead) =>
                    filteredLead.personEmail !== lead.personEmail
                )
              );
              toast.success("Lead added to your list");
            })
            .catch((error) => {
              console.error("Failed to update user profile");
              toast.error("Failed to add lead");
            });
        } else {
          console.error("User profile not found");
        }
      })
      .catch((error) => {
        console.error("Failed to add lead");
        toast.error("Failed to add lead");
      });
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleViewLead = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const shouldDisplayMessage =
    !searchLocation.trim() && !searchTitle.trim() && !searchIndustry.trim();

  return (
    <div>
      <div>
        <form>
          <div className="row">
            <div className="col-md-4 find">
              <input
                type="text"
                placeholder="Type Title"
                className="form-control"
                name="location"
                value={searchTitle}
                onChange={handleTitleChange}
              />
            </div>

            <div className="col-md-4 find">
              <input
                type="text"
                placeholder="Type industry"
                className="form-control"
                name="industry"
                value={searchIndustry}
                onChange={handleindustryChange}
              />
            </div>
            <div className="col-md-4 find">
              <input
                type="text"
                placeholder="Type Location"
                className="form-control"
                name="position"
                value={searchLocation}
                onChange={handleLocationChange}
              />
            </div>
          </div>
        </form>

        {shouldDisplayMessage ? (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center dashboard-card">
              <section className="gradient-custom">
                <div className="container py-5 h-100">
                  <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 rounded">
                      <h2 className="my-4  text-white ">
                        Please Search your Target Industry, Location and Title
                      </h2>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Email (100% valid)</th>
                  <th>Website</th>
                  <th>Industry</th>
                  <th>Location</th>
                  <th>View</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads
                  .filter((lead) => {
                    return myLeads.some(
                      (mylead) =>
                        mylead.leadAdded === user?.email &&
                        lead.personEmail === mylead.personEmail
                    );
                  })
                  .map((lead) => (
                    <tr key={lead._id} className="lead"></tr>
                  ))}

                {currentLeads.map((lead) => (
                  <tr key={lead._id} className="lead">
                    <td className="btn_color_sub">
                      <p className="text-primary">{lead.personName}</p>
                    </td>
                    <td>
                      <p>
                        {lead.title.length > 30
                          ? lead.title.slice(0, 30) + "..."
                          : lead.title}
                      </p>
                    </td>
                    <td>
                      <p>{lead.personEmail}</p>
                    </td>
                    <td>
                      <p className="text-info">{lead.website}</p>
                    </td>
                    <td>
                      <p>
                        {lead.industry.length > 30
                          ? lead.industry.slice(0, 30) + "..."
                          : lead.industry}
                      </p>
                    </td>
                    <td>
                      <p>
                        {lead.location.length > 30
                          ? lead.location.slice(0, 30) + "..."
                          : lead.location}
                      </p>
                    </td>
                    <td>
                      <button
                        className="btn_lead btn_color_sub"
                        onClick={() => handleViewLead(lead)}
                      >
                        View
                      </button>
                    </td>
                    <Modal
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Lead Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedLead && (
                          <>
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th scope="col">-</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td> Website</td>
                                  <td> {selectedLead.website}</td>
                                </tr>
                                <tr>
                                  <td> companyEmail</td>
                                  <td> {selectedLead.companyEmail} </td>
                                </tr>
                                <tr>
                                  <td>Company Size</td>
                                  <td>{selectedLead.companySize}</td>
                                </tr>
                                <tr>
                                  <td>Company About </td>
                                  <td>{selectedLead.companyAbout} </td>
                                </tr>
                                <tr>
                                  <td> Company Founded </td>
                                  <td> {selectedLead.companyFounded} </td>
                                </tr>
                                <tr>
                                  <td>Annual Revenue </td>
                                  <td>{selectedLead.annualRevenue} </td>
                                </tr>
                                <tr>
                                  <td> Company Facebook URL </td>
                                  <td> {selectedLead.companyFacebook} </td>
                                </tr>
                                <tr>
                                  <td>Company LinkedIn</td>
                                  <td> {selectedLead.companyLinkedIn}</td>
                                </tr>
                                <tr>
                                  <td>Annual Revenue</td>
                                  <td>{selectedLead.annualRevenue}</td>
                                </tr>
                              </tbody>
                            </table>
                          </>
                        )}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <td>
                      {myLeads.filter(
                        (mylead) =>
                          mylead.leadAdded === user?.email &&
                          lead.personEmail === mylead.personEmail
                      ).length === 0 && (
                        <form onSubmit={handleAddMyLead}>
                          <input
                            hidden
                            type="email"
                            name="personEmail"
                            value={lead.personEmail}
                          ></input>
                          <input
                            hidden
                            type="text"
                            name="personName"
                            value={lead.personName}
                          ></input>
                          <input
                            hidden
                            type="text"
                            name="title"
                            value={lead.title}
                          ></input>
                          <input
                            hidden
                            type="text"
                            name="website"
                            value={lead.website}
                          ></input>
                          <input
                            hidden
                            type="text"
                            name="location"
                            value={lead.location}
                          ></input>
                          <input
                            hidden
                            type="text"
                            name="industry"
                            value={lead.industry}
                          ></input>
                          <input
                            hidden
                            type="text"
                            name="leadAdded"
                            value={user?.email}
                          ></input>
                          <input
                            hidden
                            type="number"
                            name="credit"
                            value="1"
                          ></input>

                          {profile.map(
                            (e) =>
                              e.userPoint < lead.credit &&
                              e.userEmail === user?.email && (
                                <Link
                                  to="/deposit"
                                  className="btn_lead btn_color_sub"
                                >
                                  Buy more credits
                                </Link>
                              )
                          )}
                          {profile.map(
                            (e) =>
                              e.userPoint > lead.credit &&
                              e.userEmail === user?.email && (
                                <button
                                  className="btn_lead btn_color_sub btn-sm"
                                  onClick={(event) =>
                                    handleAddMyLead(event, lead)
                                  }
                                >
                                  Add to my list
                                </button>
                              )
                          )}
                        </form>
                      )}
                      {myLeads.filter(
                        (mylead) =>
                          mylead.leadAdded === user?.email &&
                          lead.personEmail === mylead.personEmail
                      ).length === 1 && (
                        <input
                          className="btn_lead btn_color_main"
                          type="submit"
                          value="Added"
                        ></input>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLeads.length > leadsPerPage && (
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  {[...Array(Math.ceil(filteredLeads.length / leadsPerPage))]
                    .map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePaginationClick(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))
                    .slice(
                      currentPage > 1 ? currentPage - 2 : 0,
                      currentPage + 1
                    )}
                </ul>
              </nav>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsForUserDashboard;

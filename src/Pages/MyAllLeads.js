import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { CSVLink } from "react-csv";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyAllLeads = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [myLeads, setMyLeads] = useState([]);
  const [user] = useAuthState(auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(25);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => setMyLeads(info));
  }, []);
  
  useEffect(() => {
    fetch(`http://localhost:5000/lists`)
      .then((res) => res.json())
      .then((info) => setLists(info));
  }, []);

  const getUserLeadsAsCSV = () => {
    const userLeads = myLeads.filter((lead) => user?.email === lead.leadAdded);
    const csvData = [
      ["Email", "Name", "Title", "Website"],
      ...userLeads.map((lead) => [
        lead.personEmail,
        lead.personName,
        lead.title,
        lead.website,
      ]),
    ];
    return csvData;
  };

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const currentLeads = myLeads
    .filter((lead) => user?.email === lead.leadAdded)
    .slice(indexOfFirstLead, indexOfLastLead);

  const totalLeads = myLeads.filter(
    (lead) => user?.email === lead.leadAdded
  ).length;

  const totalPages = Math.ceil(totalLeads / leadsPerPage);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePaginationClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    } else {
      const maxPages = 3;
      let startPage = currentPage - 1;
      let endPage = currentPage + 1;

      if (currentPage === 1) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage === totalPages) {
        startPage = totalPages - (maxPages - 1);
        endPage = totalPages;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => handlePaginationClick(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }
    return pageNumbers;
  };

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchName, SetSearchName] = useState("");
  const [searchWebsite, SetSearchWebsite] = useState("");

  const handleTitleSearch = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleLocationSearch = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleIndustrySearch = (event) => {
    setSearchIndustry(event.target.value);
  };

  const handleNameSearch = (event) => {
    SetSearchName(event.target.value);
  };
  const handleWebsiteSearch = (event) => {
    SetSearchWebsite(event.target.value);
  };

  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    const filteredLeads = myLeads.filter((lead) => {
      return (
        user?.email === lead.leadAdded &&
        lead.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
        lead.location.toLowerCase().includes(searchLocation.toLowerCase()) &&
        lead.industry.toLowerCase().includes(searchIndustry.toLowerCase()) &&
        lead.personName.toLowerCase().includes(searchName.toLowerCase()) &&
        lead.website.toLowerCase().includes(searchWebsite.toLowerCase())
      );
    });
    setCurrentPage(1);
    setFilteredLeads(filteredLeads);
  }, [
    searchTitle,
    searchLocation,
    searchIndustry,
    myLeads,
    searchName,
    user,
    searchWebsite,
  ]);

  const handleLeadSelect = (leadId) => {
    if (selectedLeads.includes(leadId)) {
      setSelectedLeads((prevSelected) =>
        prevSelected.filter((id) => id !== leadId)
      );
    } else {
      setSelectedLeads((prevSelected) => [...prevSelected, leadId]);
    }
  };

  const handleDeleteLeads = () => {
    fetch(`http://localhost:5000/delete-my-leads`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leads: selectedLeads,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Remove deleted leads from the local state
        setMyLeads((prevLeads) =>
          prevLeads.filter((lead) => !selectedLeads.includes(lead._id))
        );

        // Clear selected leads after deletion
        setSelectedLeads([]);

        // Optionally, you can show a success message here
      })
      .catch((error) => {
        console.error("Error deleting leads:", error);
      });
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  // Step 3: Function to show modal and set listToDelete
  const handleShowDeleteModal = (listId) => {
    setListToDelete(listId);
    setShowDeleteModal(true);
  };

  // Step 4: Function to handle list deletion
  const handleDeleteList = () => {
    // Your delete list logic here...

    fetch(`http://localhost:5000/delete-list/${listToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Close the modal after successful deletion
        setShowDeleteModal(false);

        // Optional: You may want to update the local state to reflect the changes
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== listToDelete)
        );
      })
      .catch((error) => {
        console.error("Error deleting list:", error);
      });
  };

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      <DashboardSidebar></DashboardSidebar>

      <div className="content">
        <h2>
          My Collected Leads:{" "}
          {myLeads.filter((my) => my.leadAdded === user?.email).length}
        </h2>

        <div>
          <div class="row">
            {lists.map(
              (list) =>
                list.listCreatedBy === user?.email && (
                  <div class="col-lg-2 col-md-4 col-sm-12 mb-4">
                    <div class="card">
                      <div class="card-body">
                        <div className="d-flex justify-content-center">
                          <Link className="btn" to={`/list/${list._id}`}>
                            <h4 class="card-title">{list.listName}</h4>
                          </Link>
                        </div>
                        <div className="d-flex justify-content-between">
                          <Link to={`/edit-list/${list._id}`}>
                            <img
                              src="https://i.postimg.cc/fW3YvpmM/pencil-8528592.png"
                              class="img-fluid rounded-top"
                              alt=""
                              width={18}
                            />
                          </Link>
                          <button
                            onClick={() => handleShowDeleteModal(list._id)}
                          >
                            <img
                              src="https://i.postimg.cc/Bn0kxx8B/delete-6861362.png"
                              class="img-fluid rounded-top"
                              alt=""
                              width={18}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this list?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDeleteList}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></div>
        <CSVLink
          data={getUserLeadsAsCSV()}
          filename={"user_leads.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download CSV
        </CSVLink>

        <div className="row mt-3">
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Title"
              className="form-control"
              value={searchTitle}
              onChange={handleTitleSearch}
            />
          </div>

          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Location"
              value={searchLocation}
              className="form-control"
              onChange={handleLocationSearch}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Industry"
              value={searchIndustry}
              className="form-control"
              onChange={handleIndustrySearch}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchName}
              className="form-control"
              onChange={handleNameSearch}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Search by Website"
              value={searchWebsite}
              className="form-control"
              onChange={handleWebsiteSearch}
            />
          </div>
        </div>

        <div className="mt-5">
          <button className="btn btn-primary mb-4" onClick={handleDeleteLeads}>
            Delete Selected Leads
          </button>
          <Link to="/create-list" className="btn btn-primary mb-4 ml-5">
            Create List
          </Link>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>-</th>
                <th>No.</th>
                <th>Email</th>
                <th>Name</th>
                <th>Title</th>
                <th>Website</th>
                <th>industry</th>
                <th>List</th>
                <th>Add To List</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads
                .slice(indexOfFirstLead, indexOfLastLead)
                .map((lead, i) => (
                  <tr key={lead._id}>
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead._id)}
                      onChange={() => handleLeadSelect(lead._id)}
                    />
                    <td>{i + 1 + indexOfFirstLead}</td>
                    <td>{lead.personEmail}</td>
                    <td>{lead.personName}</td>
                    <td>{lead.title}</td>
                    <td>{lead.website}</td>
                    <td>{lead.industry}</td>
                    <td>{lead.leadAddedToList}</td>
                    <td>
                      <Link className="btn" to={`/add-lead/${lead._id}`}>
                        Add to my List
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination">{getPageNumbers()}</ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAllLeads;

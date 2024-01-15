import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import { Link } from "react-router-dom";
import DashboardSidebar from "../components/Shared/DashboardSidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState([]);
  const [user] = useAuthState(auth);
  const [myLeads, setMyLeads] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState); // Toggle the sidebar state correctly
  };
  useEffect(() => {
    fetch(`http://localhost:5000/profiles/`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/my-all-leads/`)
      .then((res) => res.json())
      .then((info) => {
        const filteredLeads = info.filter(
          (lead) => lead.leadAdded === user?.email
        );
        setMyLeads(filteredLeads);
      });
  }, [user]);

  let rowNumber = 1;

  return (
    <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      <DashboardSidebar></DashboardSidebar>
      <div className="content">
        <h2>Find Leads</h2>
        {user?.email}
        {profile.filter((pro) => pro.userEmail === user?.email).length ===
          1 && (
          <>
            <div class="row g-4">
              <div class="col-lg-4 col-md-2 col-sm-12 p-4 mb-4">
                <div class="card  box-shodow">
                  <div class="p-2 ">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title">List</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 col-sm-12  p-4 mb-4">
                <div class="card  box-shodow">
                  <div class="p-2 ">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title">List</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 col-sm-12   p-4 mb-4">
                <div class="card  box-shodow">
                  <div class="p-2 ">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title">List</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 col-sm-12   p-4 mb-4 mt-5">
                <div class="card  box-shodow">
                  <div class="p-2 ">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title">List</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 col-sm-12   p-4 mb-4 mt-5">
                <div class="card  box-shodow">
                  <div class="p-2 ">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title">List</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-2 col-sm-12   p-4 mb-4 mt-5">
                <div class="card  box-shodow">
                  <div class="p-2 ">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title">List</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Website</th>
                  <th>industry</th>
                </tr>
              </thead>
              <tbody>
                {myLeads.slice(0, 10).map(
                  (lead) =>
                    lead.leadAdded === user?.email && (
                      <tr key={lead._id}>
                        <td>{rowNumber++}</td>
                        <td>{lead.personEmail}</td>
                        <td>{lead.personName}</td>
                        <td>{lead.title}</td>
                        <td>{lead.website}</td>
                        <td>{lead.industry}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </>
        )}
        {profile.filter((pro) => pro.userEmail === user?.email).length ===
          0 && (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <Link to="/update-profile">Please Update your profile first</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

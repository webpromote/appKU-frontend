import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const DashboardSidebar = () => {
  const [user] = useAuthState(auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleSignout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/profiles`)
      .then((res) => res.json())
      .then((info) => setProfile(info));
  }, []);

  return (
    <>
      <div className={`dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}></button>

        <div className="sidebar">
          <h2>Dashboard</h2>
          <h5 className="font-bold">
            Available Credit{" "}:
            <span>
              {profile.map((e) => user?.email === e.userEmail && e.userPoint)}
            </span>{" "}
          </h5>

          <Link to="/find-leads">Find Leads</Link>
          <Link to="/my-leads">My Leads</Link>
          <Link to="/deposit">Buy Credits</Link>
          <a href="/contact">Contact</a>

          {user ? (
            <Link
              className="btn circle btn-theme-effect btn-sm text-light"
              onClick={handleSignout}
            >
              <span>Signout</span>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;

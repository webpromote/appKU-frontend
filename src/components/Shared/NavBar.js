import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import PageHero from "./PageHero";

const NavBar = () => {
  const [logo, setLogo] = useState({});
  const [user] = useAuthState(auth);
  const [admin, setAdmin] = useState([]);
  const location = useLocation();

  const handleSignout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/logo`)
      .then((res) => res.json())
      .then((info) => setLogo(info[0]));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((info) => setAdmin(info));
  }, []);

  const isHomePage = location.pathname === "/";
  const shouldRenderPageHero = !isHomePage;

  return (
    <>
      <header>
        <nav className="navbar mobile-sidenav attr-border navbar-sticky navbar-default validnavs navbar-fixed dark no-background">
          <div className="container d-flex justify-content-between align-items-center">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
              >
                <i className="fa fa-bars" />
              </button>
              <Link className="navbar-brand" to="/">
                <img src={logo.logo} className="logo" alt="Logo" />
              </Link>
            </div>

            <div className="collapse navbar-collapse " id="navbar-menu">
              <img src={logo.logo} alt="Logo" />
              <button
                type="button"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#navbar-menu"
              >
                <i className="fa fa-times" />
              </button>
              <ul
                className="nav navbar-nav navbar-right"
                data-in="fadeInDown"
                data-out="fadeOutUp"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about-us">About us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="attr-right">
              <div className="attr-nav">
                <ul>
                  <li className="button">
                    <Link className="btn circle btn-theme-effect btn-sm" to="/user-dashboard"><span>Dashboard</span></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="overlay-screen" />
        </nav>
      </header>

      {shouldRenderPageHero && <PageHero />}
    </>
  );
};

export default NavBar;

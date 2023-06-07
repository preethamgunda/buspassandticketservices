import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { useSelector } from "react-redux";
import { setLogout } from "../../redux/features/authSlice";
import "./Settings.css";
import Profile from "../Profile/Profile";
import Dashboard from "../Dashboard";
import ApplicationStatus from "../ApplicationStatus";
import Footer from "../../pages/Footer";

const Settings = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { isAuthenticated } = useSelector((state) => state.root);
  const [profileb, setProfileb] = useState(false);
  const [dash, setDash] = useState(false);
  const [app, setApp] = useState(false);
  const dispatch = useDispatch();
  const token = user?.token;
  const navigate = useNavigate();
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };
  const handleProfile = () => {
    setProfileb(true);
    setDash(false);
    setApp(false);
  };
  const handleDashboard = () => {
    setDash(true);
    setApp(false);
    setProfileb(false);
  };
  const applicationStatus = () => {
    setProfileb(false);
    setDash(false);
    setApp(true);
  };

  return (
    <>
      <div className="main-settings" style={{ marginTop: "100px" }}>
        <div className="side-menu">
          {user?.result?._id ? (
            <p
              className="header-text"
              style={{ cursor: "pointer" }}
              onClick={() => handleProfile()}
            >
              Profile
            </p>
          ) : (
            <p></p>
          )}
          {user?.result?._id ? (
            <p
              className="header-text"
              style={{ cursor: "pointer" }}
              onClick={handleDashboard}
            >
              Dashboard
            </p>
          ) : (
            <p></p>
          )}
          {user?.result?._id ? (
            <p
              className="header-text"
              style={{ cursor: "pointer" }}
              onClick={() => applicationStatus()}
            >
              Application Status
            </p>
          ) : (
            <p></p>
          )}
          {user?.result?._id ? (
            <p
              className="header-text"
              style={{ cursor: "pointer" }}
              onClick={() => handleLogout()}
            >
              Logout
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div className="right-container">
          {profileb === true && <Profile />}
          {dash === true && <Dashboard />}
          {app === true && <ApplicationStatus />}
        </div>
      </div>
    </>
  );
};

export default Settings;

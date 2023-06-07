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
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import decode from "jwt-decode";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarLogo from "./navbarlogo.jpg";

const Header2 = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = user?.token;
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
  return (
    <div>
      {user?.result?._id && (
        <MDBNavbar
          expand="lg"
          style={{
            backgroundColor: "#2C3333",
            marginTop: "60px",
            height: "40px",
          }}
        >
          <MDBNavbarLink
            style={{ marginLeft: "100px", cursor: "pointer", color: "#ffffff" }}
            onClick={() => {
              navigate("/ticket");
            }}
          >
            Book a Ticket
          </MDBNavbarLink>
          <MDBNavbarLink
            style={{ marginLeft: "20px", color: "#ffffff", cursor: "pointer" }}
            onClick={() => {
              navigate("/bus-pass-form-display-submission-for-verification");
            }}
          >
            Enrol for a Pass
          </MDBNavbarLink>
          <MDBNavbarLink
            style={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => {
              navigate("/dash");
            }}
          >
            Pass Applications
          </MDBNavbarLink>
          <MDBNavbarLink
            style={{ color: "#ffffff", cursor: "pointer", marginRight: "20px" }}
            onClick={() => {
              navigate("/ticket-bookings");
            }}
          >
            Ticket Bookings
          </MDBNavbarLink>
          <MDBNavbarLink
            style={{ color: "#ffffff", cursor: "pointer" }}
            onClick={() => {
              navigate("/profile");
            }}
          >
            My Account
          </MDBNavbarLink>

          <MDBNavbarLink
            style={{ marginLeft: "550px", cursor: "pointer", color: "#ffffff" }}
            onClick={handleLogout}
          >
            LogOut
          </MDBNavbarLink>
        </MDBNavbar>
      )}
    </div>
  );
};

export default Header2;

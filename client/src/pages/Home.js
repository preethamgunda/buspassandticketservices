import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCarousel,
  MDBCarouselItem,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import BusTicket from "./home_bus_ticket.jpg";
import { Link } from "react-router-dom";
// import Caousel1 from "../pages/Caousel_1.png";
// import Carousel2 from "../pages/Carousel2.jpg";
import "./Home.css";
import Footer from "./Footer";
import BusPass from "./bus_pass.jpg";
import Header2 from "../components/Header2";
import QrTicket from "./qrticket.png";
import Bpass from "./baspass.jpg";
import Home123 from "./home123.jpg";
const Home = () => {
  const [profile, setProfile] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div style={{ marginTop: "50px", height: "700px" }}>
        <Header2 />
        <div
          style={{
            height: "500px",
            marginTop: "50px",
            backgroundImage: `url(${Home123})`,
          }}
        >
          <div>
            <div
              class="card mb-3"
              style={{
                width: "500px",
                border: "2px solid",
                marginRight: "900px",
              }}
            >
              <div class="card-body">
                <h5 class="card-title">Qr Based Ticket</h5>
                <p class="card-text">
                  A dynamic QR based ticket which is easy to book and equally
                  secure as well. Using this service is quite easy and tickets
                  are mailed to your registered email address upon successfull.
                  payment.
                  <button
                    className="button"
                    onClick={() => {
                      navigate("/ticket");
                    }}
                  >
                    Book Your Ticket Now
                  </button>
                </p>
              </div>
            </div>
            <div
              class="card"
              style={{
                marginTop: "50px",
                width: "500px",
                border: "2px solid",
                marginRight: "900px",
              }}
            >
              <div class="card-body">
                <h5 class="card-title">Bus Pass</h5>
                <p class="card-text">
                  For daily travellers this is economical and reliable.
                  Available in two categories for Employees and Students.
                  <button
                    className="button"
                    onClick={() => {
                      navigate(
                        "/bus-pass-form-display-submission-for-verification"
                      );
                    }}
                  >
                    Apply For a Pass Here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;

import React, { useEffect } from "react";
import TicketPayment from "../../Payments/TicketPayment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./HydtoWgl.css";
import Footer from "../../../pages/Footer";
import { addTicketBooking } from "../../../redux/api";
import axios from "axios";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const HydtoWgl = () => {
  const [adults, setAdults] = useState(0);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [ticketData, setTicketData] = useState({
    source: localStorage.getItem("Source"),
    destination: localStorage.getItem("Destination"),
    date_Of_Journey: localStorage.getItem("DOJ"),
    No_Of_Adults: adults,
    bus_no: localStorage.getItem("busno"),
  });

  const [payments, setPayments] = useState(false);
  const [payments1, setPayments1] = useState(false);
  const [payments2, setPayments2] = useState(false);
  const [payment3, setPayments3] = useState(false);
  const [payment4, setPayments4] = useState(false);

  const getAdults = (event) => {
    setAdults(event.target.value);
    setTicketData({ ...ticketData, No_Of_Adults: event.target.value });
  };
  localStorage.setItem("Passengers", adults);
  const savetoDb = () => {
    axios
      .post("http://localhost:5000/ticketdata", {
        ...ticketData,
        creator: user?.result?._id,
      })
      .then((response) => {
        console.log(response);
      });
  };
  console.log(user?.result?._id);
  console.log(ticketData);

  const loadScript = (src) => {
    return new Promise((resovle) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resovle(true);
      };

      script.onerror = () => {
        resovle(false);
      };

      document.body.appendChild(script);
    });
  };
  const displayRazorpay = async (amount) => {
    localStorage.setItem("transaction_status", "failed");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("You are offline... Failed to load Razorpay SDK");
      return;
    }

    const options = {
      key: "",
      currency: "INR",
      amount: amount * 100,
      name: "Bus Ticket",
      description: "Thanks for purchasing",
      image:
        "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

      handler: function (response) {
        window.location.href = "http://localhost:3000/payment_success";
        savetoDb();
      },
      prefill: {
        name: "Vivek Vardhan",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const Source = localStorage.getItem("SourceAmount");
  const Destination = localStorage.getItem("DestinationAmount");
  const Adults = adults;
  const renderInputFields = () => {
    const inputFields = [];
    for (let i = 0; i < adults; i++) {
      inputFields.push(
        <TextField
          placeholder="ENTER PASSENGER NAME"
          style={{ marginTop: "5px" }}
        />
      );
    }
    return inputFields;
  };
  useEffect(() => {
    let num = { ...ticketData };
    num["bus_no"] = localStorage.getItem("busno");
    setTicketData(num);
  }, [payments]);
  return (
    <>
      <div style={{ marginTop: "100px" }}>
        <h5 style={{ fontWeight: "bold", fontSize: "30px" }}>
          Available Buses From {localStorage.getItem("Source")} to
          {localStorage.getItem("Destination")}
        </h5>
        <div class="card">
          <div class="card-header" style={{ fontSize: "25px" }}>
            12:00 to 14:30
          </div>
          <div class="card-body">
            <h5
              class="card-title"
              style={{ fontWeight: "bold", fontSize: "25px" }}
            >
              Bus No:
            </h5>
            <h5>123456</h5>
            <p
              class="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Travel Time:
            </p>
            <h5>2 Hr 30 Min</h5>
            <button
              onClick={() => {
                if (payments === false) {
                  setPayments(true);
                  localStorage.setItem("busno", 123456);
                  setPayments1(false);
                  setPayments2(false);
                  setPayments3(false);
                  setPayments4(false);
                } else {
                  setPayments(false);
                }
              }}
            >
              Select this bus
            </button>
            {payments === true && (
              <div>
                <TextField
                  id="outlined-number"
                  label="Number Of Adults"
                  type="number"
                  sx={{ width: 150 }}
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  onChange={getAdults}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/* <div className="d-flex flex-column p-2">
                  {renderInputFields()}
                </div> */}
                <div style={{ marginTop: "20px" }}>
                  <button
                    className="button"
                    onClick={() =>
                      displayRazorpay(Source * Destination * Adults)
                    }
                  >
                    Pay {Source * Destination * adults}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div class="card">
          <div class="card-header" style={{ fontSize: "25px" }}>
            08:00 to 10:45
          </div>
          <div class="card-body">
            <h5
              class="card-title"
              style={{ fontWeight: "bold", fontSize: "25px" }}
            >
              Bus No:
            </h5>
            <h5>789100</h5>
            <p
              class="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Travel Time:
            </p>
            <h5>2 Hr 45 Min</h5>
            <button
              onClick={() => {
                if (payments1 === false) {
                  setPayments1(true);
                  localStorage.setItem("busno", 789100);
                  setPayments(false);
                  setPayments2(false);
                  setPayments3(false);
                  setPayments4(false);
                } else {
                  setPayments1(false);
                }
              }}
            >
              Select this bus
            </button>
          </div>
          {payments1 === true && (
            <div>
              <TextField
                id="outlined-number"
                label="Number Of Adults"
                type="number"
                sx={{ width: 150 }}
                style={{ marginTop: "20px", marginBottom: "20px" }}
                onChange={getAdults}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div style={{ marginTop: "20px" }}>
                <button
                  className="button"
                  onClick={() => displayRazorpay(Source * Destination * Adults)}
                >
                  Pay {Source * Destination * adults}
                </button>
              </div>
            </div>
          )}
        </div>

        <div class="card">
          <div class="card-header" style={{ fontSize: "25px" }}>
            10:00 to 13:10
          </div>
          <div class="card-body">
            <h5
              class="card-title"
              style={{ fontWeight: "bold", fontSize: "25px" }}
            >
              Bus No:
            </h5>
            <h5>111213</h5>
            <p
              class="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Travel Time:
            </p>
            <h5>3 Hr 10 Min</h5>
            <button>Select this bus</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header" style={{ fontSize: "25px" }}>
            16:00 to 18:19
          </div>
          <div class="card-body">
            <h5
              class="card-title"
              style={{ fontWeight: "bold", fontSize: "25px" }}
            >
              Bus No:
            </h5>
            <h5>141516</h5>
            <p
              class="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Travel Time:
            </p>
            <h5>2 Hr 19 Min</h5>
            <button>Select this bus</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header" style={{ fontSize: "25px" }}>
            18:00 to 21:00
          </div>
          <div class="card-body">
            <h5
              class="card-title"
              style={{ fontWeight: "bold", fontSize: "25px" }}
            >
              Bus No:
            </h5>
            <h5>171819</h5>
            <p
              class="card-text"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Travel Time:
            </p>
            <h5>3 Hr 00 Min</h5>
            <button>Select this bus</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HydtoWgl;

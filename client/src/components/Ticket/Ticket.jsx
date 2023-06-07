import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import TicketPayment from "../Payments/TicketPayment";
import Caousel1 from "./Caousel_1.png";
import Footer from "../../pages/Footer";
import TicketImage from "./preview.png";
import TicketRight from "./ticket_right.png";
import "./Ticket.css";
import HydtoWgl from "./Paths/HydtoWgl";
import { Navigate, useNavigate } from "react-router-dom";
import Header2 from "../Header2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// const ticketObj = {
//   source: "",
//   destination: "",
//   adults: "",
//   // date_Of_Journey: "",
//   // date_Of_Booking: "",
// };
const Ticket = (props) => {
  const [source, setSource] = useState(0);
  const navigate = useNavigate();
  // const [ticketData, setTicketData] = useState(ticketObj);
  const [destination, setDestination] = useState(0);
  const [sourceval, setSourceval] = useState("");
  const [destinationval, setDestinationval] = useState("");
  const [vdate, setVdate] = useState(false);
  const [date, setDate] = useState(null);

  const getSource = (event, value) => {
    setSource(value.price);
    setSourceval(value.label);
    // setTicketData({ ...ticketData, source: value.label });
  };
  const getDestination = (event, value) => {
    setDestination(value.price);
    setDestinationval(value.label);
    // setTicketData({ ...ticketData, destination: value.label });
  };

  const saveDate = (value) => {
    // setTicketData({ ...ticketData, date_Of_Journey: event.target.value });
    // localStorage.setItem("DOJ", value);
    setVdate(true);
  };
  localStorage.setItem("DOJ", date);

  // console.log(ticketData);
  localStorage.setItem("Source", sourceval);
  localStorage.setItem("Destination", destinationval);

  localStorage.setItem("SourceAmount", source);
  localStorage.setItem("DestinationAmount", destination);
  // console.log(...ticketData);

  return (
    <>
      <Header2 />
      <div style={{ marginTop: "70px", height: "600px" }}>
        {/* <div className="image">
          <img src={Caousel1} />
        </div> */}

        <div>
          <div
            className="left_ticket"
            style={{ height: "500px", width: "600px" }}
          >
            <h5
              style={{
                marginLeft: "200px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              Book your Ticket Here
            </h5>

            <p
              class="card-text"
              style={{ width: "500px", marginLeft: "150px" }}
            >
              <p>Enter Source</p>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 250 }}
                style={{ marginBottom: "20px", marginLeft: "120px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Source" />
                )}
                onChange={getSource}
              />
              <p>Enter Destination</p>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 250 }}
                style={{ marginBottom: "20px", marginLeft: "120px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Destination" />
                )}
                onChange={getDestination}
              />
              {/* <TextField
                  id="outlined-number"
                  label="Number Of Adults"
                  type="number"
                  sx={{ width: 150 }}
                  style={{ marginBottom: "20px" }}
                  onChange={getAdults}
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> */}
              <p>Enter Date Of Journey </p>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disablePast={true}
                    disableHighlightToday={true}
                    sx={{ width: 250 }}
                    // value={value}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
              </div>

              {/* <div>
                <TextField onChange={saveDate}></TextField>
              </div> */}

              {/* <TicketPayment
                  source={source}
                  destination={destination}
                  adults={adults}
                /> */}
              <button
                className="button"
                style={{ marginTop: "20px" }}
                onClick={() => {
                  if (sourceval !== "" && destinationval !== "") {
                    navigate(
                      "/ticket-booking-options-source-selection-destination-selection"
                    );
                  }
                }}
              >
                Search Buses
              </button>
            </p>
          </div>

          <div className="right_ticket">
            <img src={TicketRight} width={"800px"} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
const top100Films = [
  { label: "Hyderabad", price: 10 },
  { label: "Warangal", price: 20 },
  { label: "Vijayawada", price: 30 },
  { label: "Vishakapatnam", price: 40 },
  { label: "Khammam", price: 50 },
  { label: "Karimnagar", price: 60 },
  { label: "Nizamabad", price: 70 },
  {
    label: "Kamareddy",
    price: 8,
  },
  { label: "Adilabad", price: 9 },
  { label: "Ranga Reddy", price: 10 },
];
export default Ticket;

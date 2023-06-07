import React, { useEffect, useState } from "react";
import Header2 from "../Header2";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import axios from "axios";

const TicketBookings = () => {
  const [tickets, setTickets] = useState([]);
  const { user } = useSelector((state) => ({ ...state.auth }));
  useEffect(() => {
    axios
      .post("http://localhost:5000/getTicketDetails", {
        creator: user?.result?._id,
      })
      .then((res) => {
        setTickets(res.data.tickets);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header2 />
      <div style={{ marginTop: "50px" }}>
        TicketBookings
        <div>
          {tickets.map((ticket) => {
            return (
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Booking No: {ticket._id}</h5>
                  <p class="card-text">
                    Bus No: {ticket.bus_no}
                    <br></br>
                    Source:{ticket.source} <br></br>Destination:
                    {ticket.destination}
                    <br></br>Date Of Journey: {ticket.date_Of_Journey}
                    <br></br>
                    No Of Adults:{ticket.No_Of_Adults}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TicketBookings;

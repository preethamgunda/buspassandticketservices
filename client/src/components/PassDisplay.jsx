import React from "react";
import "./PassDisplay.css";
import DownloadIcon from "@mui/icons-material/Download";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

const PassDisplay = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const to_name = user?.result?.name;
  const to_email = user?.result?.email;
  const sendEmail = () => {
    const emailContent = {
      user: to_name,
      to_email: to_email,
    };

    emailjs
      .send(
        "service_5mgw8im",
        "template_i0q33sj",
        emailContent,
        "5DgJ2E3pOIRY0Oxke"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div style={{ marginTop: "150px" }}>
      <h1>Your Payment Is successfull.</h1>

      <h5>
        You will get a conformation mail about the application submission.
      </h5>
      <h5>
        Upon verification which typically takes around 7 days the digital pass
        will be sent via registered email address.
      </h5>
      <h6>Thank you for using Bus Pass and Ticket Services.</h6>
      <button className="btn btn-primary" onClick={sendEmail}>
        Send Email
      </button>
      <h2>
        <Link to="/home">You Can exit this page now.</Link>
      </h2>
    </div>
  );
};

export default PassDisplay;

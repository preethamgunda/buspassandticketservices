import * as React from "react";
import Button from "@mui/material/Button";
import QrCode from "../QrCode/QrCode";
import { useSelector, useDispatch } from "react-redux";
import { MuiTelInput } from "mui-tel-input";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import emailjs from "@emailjs/browser";
import { useParams } from "react-router-dom";

const Success = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [phone, setPhone] = React.useState("");

  const handleChange = (newPhone) => {
    setPhone(newPhone);
  };
  const to_name = user?.result?.name;
  const to_email = user?.result?.email;
  const msg_Source = localStorage.getItem("Source");
  const msg_Destination = localStorage.getItem("Destination");

  const sendEmail = () => {
    const emailContent = {
      to_name: to_name,
      to_email: to_email,
      msg_Source: msg_Source,
      msg_Destination: msg_Destination,
    };

    emailjs
      .send(
        "service_5mgw8im",
        "template_54icmud",
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
    <>
      <h3 style={{ marginTop: "100px" }}>
        Dear {user?.result?.name} Your Booking From{" "}
        {localStorage.getItem("Source")} To{" "}
        {localStorage.getItem("Destination")} Is Successful!!!!
      </h3>

      <div
        style={{
          marginRight: "20px",
          marginTop: "100px",
          marginBottom: "30px",
        }}
      >
        <TextField
          required
          id="outlined-required"
          value={user?.result?.email}
          style={{ marginRight: "20px" }}
        />
        <Button
          variant="contained"
          disableElevation
          endIcon={<SendIcon />}
          onClick={sendEmail}
        >
          Send Confirmation Email
        </Button>
      </div>
      {/* <MuiTelInput
        value={phone}
        onChange={handleChange}
        forceCallingCode={false}
        defaultCountry={"IN"}
        disableDropdown
        onlyCountries={["IN"]}
      /> */}

      <QrCode />
    </>
  );
};

export default Success;

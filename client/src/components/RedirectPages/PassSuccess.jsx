import React from "react";
import PassPayment from "../Payments/PassPayment";
import { Stack } from "@mui/material";
import emailjs from "@emailjs/browser";

const PassSuccess = () => {
  const sendEmail = () => {
    const emailContent = {};

    emailjs
      .send(
        "service_x9zn7u9",
        "template_c4o6oim",
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
    <div style={{ marginTop: "200px" }}>
      {/* <button onClick={sendEmail}>PassSuccess</button> */}
      <h5>Your Submission Is Successful.Proceed to Payment</h5>
      <Stack
        direction="row"
        spacing={2}
        style={{ marginLeft: "700px", marginTop: "30px" }}
      >
        <PassPayment />
      </Stack>
    </div>
  );
};

export default PassSuccess;

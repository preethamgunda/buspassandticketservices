import React from "react";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";

import { useDispatch, useSelector } from "react-redux";

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
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("You are offline... Failed to load Razorpay SDK");
    return;
  }

  const options = {
    key: "rzp_test_By0ovCBn7Mzp2R",
    currency: "INR",
    amount: amount * 100,
    name: "Bus Pass",
    description: "Thanks for purchasing",
    image:
      "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

    handler: function (response) {
      window.location.href = "http://localhost:3000";
    },
    prefill: {
      name: "Vivek Vardhan",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
const PassPayment = () => {
  const { tour } = useSelector((state) => ({ ...state.tour }));

  let pay = 0;

  let val = localStorage.getItem("PassPay");
  return (
    <>
      <Button variant="outlined" onClick={() => displayRazorpay(100)}>
        Pay {100}
      </Button>
    </>
  );
};

export default PassPayment;

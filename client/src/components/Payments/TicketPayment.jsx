import React from "react";

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
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("You are offline... Failed to load Razorpay SDK");
    return;
  }

  const options = {
    key: "rzp_test_By0ovCBn7Mzp2R",
    currency: "INR",
    amount: amount * 100,
    name: "Bus Ticket",
    description: "Thanks for purchasing",
    image:
      "https://mern-blog-akky.herokuapp.com/static/media/logo.8c649bfa.png",

    handler: function (response) {
      window.location.href = "http://localhost:3000/payment_success";
      localStorage.setItem("transaction_status", "success");
    },
    prefill: {
      name: "Vivek Vardhan",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
const TicketPayment = () => {
  let source = localStorage.getItem("SourceAmount");
  let destination = localStorage.getItem("DestinationAmount");
  let adults = localStorage.getItem("Passengers");
  localStorage.setItem("Amount", source * destination * adults);

  return (
    <>
      <button
        className="button"
        onClick={() => displayRazorpay(source * destination * adults)}
      >
        Pay {source * destination * adults}
      </button>
    </>
  );
};

export default TicketPayment;

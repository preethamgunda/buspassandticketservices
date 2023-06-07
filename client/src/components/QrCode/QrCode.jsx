import QRCode from "qrcode.react";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";

const QrCode = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const qrSource = localStorage.getItem("Source");
  const qrDestination = localStorage.getItem("Destination");
  const Adults = localStorage.getItem("Passengers");
  const DOJ = localStorage.getItem("DOJ");
  const bus = localStorage.getItem("busno");

  const Name = user?.result?.name;
  const email = user?.result?.email;

  const finalQr =
    "Name:" +
    Name +
    " " +
    "Email" +
    email +
    "+" +
    "Source:" +
    qrSource +
    " " +
    "Destination:" +
    qrDestination +
    " " +
    "Adults:" +
    Adults +
    " " +
    "Date Of Journey:" +
    DOJ +
    " " +
    "Bus Number:" +
    bus;

  const [button, setButton] = useState(false);

  return (
    <div style={{ marginTop: "100px" }}>
      <QRCode value={finalQr} />
    </div>
  );
};

export default QrCode;

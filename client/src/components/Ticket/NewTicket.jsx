import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const NewTicket = () => {
  return (
    <div style={{ marginTop: "200px" }}>
      <TextField
        id="outlined-basic"
        label="Source"
        variant="outlined"
        name="source"
      />
      <TextField
        id="outlined-basic"
        label="Destination"
        variant="outlined"
        name="destination"
      />
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        name="source"
      />
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        name="source"
      />
    </div>
  );
};

export default NewTicket;

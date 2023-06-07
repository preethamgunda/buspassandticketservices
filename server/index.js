import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import ticketRouter from "./routes/Ticket.js";
import TicketModel from "./models/ticket.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);
app.use("/addBooking", ticketRouter);
app.post("/ticketdata", async (req, res) => {
  const newTicket = await TicketModel.create(req.body);
});
app.post("/getTicketDetails", async (req, res) => {
  const tickets = await TicketModel.find(req.body);
  return res.json({ tickets });
});

const MONGODB_URL =
  "";
const port = 5000;

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

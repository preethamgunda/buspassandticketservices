import mongoose from "mongoose";
const ticketSchema = mongoose.Schema({
  source: String,
  destination: String,
  date_Of_Journey: String,
  No_Of_Adults: Number,
  bus_no: Number,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TicketModel = mongoose.model("TicketSuccessBookings", ticketSchema);

export default TicketModel;

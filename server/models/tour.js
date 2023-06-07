import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  father_name: String,
  Gender: String,
  Age: String,
  College_Name: String,
  Home_address: String,
  College_Address: String,
  Pass_duration: Number,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  imageFile2: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const TourModal = mongoose.model("Tour", tourSchema);

export default TourModal;

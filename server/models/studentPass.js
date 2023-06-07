import mongoose from "mongoose";

const studentPassSchema = mongoose.Schema({
  Name: String,
  father_name: String,
});
const StudentModal = mongoose.model("StudentPass", studentPassSchema);
export default StudentModal;

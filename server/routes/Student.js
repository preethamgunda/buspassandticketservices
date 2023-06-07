import express from "express";
import auth from "../middleware/auth.js";
const router = express.Router();
import { createStudent } from "../controllers/StudentPass.js";

router.post("/student_pass", auth, createStudent);

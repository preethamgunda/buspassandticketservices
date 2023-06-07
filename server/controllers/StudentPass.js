import express from "express";
import StudentModal from "../models/studentPass";
import mongoose from "mongoose";

export const createStudent = async (req, res) => {
  const student = req.body;
  const newStudent = new StudentModal({
    ...student,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};
